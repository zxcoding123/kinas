<script>
    import { onMount, onDestroy } from 'svelte';
    import { Renderer, Program, Triangle, Mesh } from 'ogl';

    let {
        speed = 2.5,
        rayColor1 = '#EAB308',
        rayColor2 = '#96c8ff',
        intensity = 2,
        spread = 2,
        origin = 'top-right',
        tilt = 0,
        saturation = 1.5,
        blend = 0.75,
        falloff = 1.6,
        opacity = 1.0,
        class: className = '',
        // Fired once, after the shader has actually painted its first frame. Lets the
        // parent hold the layer hidden until there is something real to reveal, rather
        // than fading in a blank canvas while the context is still warming up.
        onReady = () => {}
    } = $props();

    const hexToRgb = (hex) => {
        const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
    };

    const originToFlip = (o) => {
        switch (o) {
            case 'top-left':
                return [1, 0];
            case 'bottom-right':
                return [0, 1];
            case 'bottom-left':
                return [1, 1];
            default:
                return [0, 0];
        }
    };

    let containerEl = $state();
    let isVisible = $state(false);
    let observer;

    let uniforms = null;
    let renderer = null;
    let mesh = null;
    let animationId = null;
    let cleanupFn = null;
    // Deliberately not reset by cleanupFn — scrolling the hero out of view tears the
    // context down and rebuilds it, and the parent shouldn't be re-notified for that.
    let hasNotifiedReady = false;

    const vert = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

    const frag = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float iSpeed;
uniform vec3 iRayColor1;
uniform vec3 iRayColor2;
uniform float iIntensity;
uniform float iSpread;
uniform float iFlipX;
uniform float iFlipY;
uniform float iTilt;
uniform float iSaturation;
uniform float iBlend;
uniform float iFalloff;
uniform float iOpacity;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
  return clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0) *
    clamp((iResolution.x - length(sourceToCoord)) / iResolution.x, 0.5, 1.0);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  if (iFlipX > 0.5) fragCoord.x = iResolution.x - fragCoord.x;
  if (iFlipY > 0.5) fragCoord.y = iResolution.y - fragCoord.y;

  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 rayPos = vec2(iResolution.x * 1.1, -0.5 * iResolution.y);

  float tiltRad = iTilt * 3.14159265 / 180.0;
  float cs = cos(tiltRad);
  float sn = sin(tiltRad);
  vec2 rel = coord - rayPos;
  vec2 tiltedCoord = vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs) + rayPos;

  float halfSpread = iSpread * 0.275;
  vec2 rayRefDir1 = normalize(vec2(cos(0.785398 + halfSpread), sin(0.785398 + halfSpread)));
  vec2 rayRefDir2 = normalize(vec2(cos(0.785398 - halfSpread), sin(0.785398 - halfSpread)));

  vec4 rays1 = vec4(iRayColor1, 1.0) * rayStrength(rayPos, rayRefDir1, tiltedCoord, 36.2214, 21.11349, iSpeed);
  vec4 rays2 = vec4(iRayColor2, 1.0) * rayStrength(rayPos, rayRefDir2, tiltedCoord, 22.3991, 18.0234, iSpeed * 0.2);

  vec4 color = rays1 * (1.0 - iBlend) * 0.9 + rays2 * iBlend * 0.9;

  float distanceToLight = length(fragCoord.xy - vec2(rayPos.x, iResolution.y - rayPos.y)) / iResolution.y;
  float brightness = iIntensity * 0.4 / pow(max(distanceToLight, 0.001), iFalloff);
  color.rgb *= brightness;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, iSaturation);

  color.a = max(color.r, max(color.g, color.b)) * iOpacity;
  gl_FragColor = color;
}`;

    function initializeWebGL() {
        if (!containerEl) return;

        const gl_renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true
        });
        renderer = gl_renderer;

        const gl = gl_renderer.gl;
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';

        while (containerEl.firstChild) {
            containerEl.removeChild(containerEl.firstChild);
        }
        containerEl.appendChild(gl.canvas);

        const [flipX, flipY] = originToFlip(origin);
        uniforms = {
            iTime: { value: 0 },
            iResolution: { value: [1, 1] },
            iSpeed: { value: speed },
            iRayColor1: { value: hexToRgb(rayColor1) },
            iRayColor2: { value: hexToRgb(rayColor2) },
            iIntensity: { value: intensity },
            iSpread: { value: spread },
            iFlipX: { value: flipX },
            iFlipY: { value: flipY },
            iTilt: { value: tilt },
            iSaturation: { value: saturation },
            iBlend: { value: blend },
            iFalloff: { value: falloff },
            iOpacity: { value: opacity }
        };

        const geometry = new Triangle(gl);
        const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
        mesh = new Mesh(gl, { geometry, program });

        const updateSize = () => {
            if (!containerEl || !renderer) return;
            renderer.dpr = Math.min(window.devicePixelRatio, 2);
            const { clientWidth: w, clientHeight: h } = containerEl;
            renderer.setSize(w, h);
            uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr];
        };

        const loop = (t) => {
            if (!renderer || !uniforms || !mesh) return;
            uniforms.iTime.value = t * 0.001;
            try {
                renderer.render({ scene: mesh });
                animationId = requestAnimationFrame(loop);
            } catch (e) {
                return;
            }
            if (!hasNotifiedReady) {
                hasNotifiedReady = true;
                onReady();
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();
        animationId = requestAnimationFrame(loop);

        cleanupFn = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            window.removeEventListener('resize', updateSize);
            if (renderer) {
                try {
                    const loseCtx = renderer.gl.getExtension('WEBGL_lose_context');
                    if (loseCtx) loseCtx.loseContext();
                    const canvas = renderer.gl.canvas;
                    if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
                } catch (e) {}
            }
            renderer = null;
            uniforms = null;
            mesh = null;
        };
    }

    onMount(() => {
        if (typeof IntersectionObserver === 'undefined') {
            isVisible = true;
            return;
        }

        observer = new IntersectionObserver(
            (entries) => {
                isVisible = entries[0].isIntersecting;
            },
            { threshold: 0.1 }
        );
        observer.observe(containerEl);

        return () => observer.disconnect();
    });

    $effect(() => {
        if (isVisible && containerEl && !renderer) {
            initializeWebGL();
        } else if (!isVisible && cleanupFn) {
            cleanupFn();
            cleanupFn = null;
        }
    });

    // Push live prop changes into the running shader without a full re-init
    $effect(() => {
        if (!uniforms) return;
        uniforms.iSpeed.value = speed;
        uniforms.iRayColor1.value = hexToRgb(rayColor1);
        uniforms.iRayColor2.value = hexToRgb(rayColor2);
        uniforms.iIntensity.value = intensity;
        uniforms.iSpread.value = spread;
        const [flipX, flipY] = originToFlip(origin);
        uniforms.iFlipX.value = flipX;
        uniforms.iFlipY.value = flipY;
        uniforms.iTilt.value = tilt;
        uniforms.iSaturation.value = saturation;
        uniforms.iBlend.value = blend;
        uniforms.iFalloff.value = falloff;
        uniforms.iOpacity.value = opacity;
    });

    onDestroy(() => {
        if (cleanupFn) {
            cleanupFn();
            cleanupFn = null;
        }
    });
</script>

<div bind:this={containerEl} class="side-rays-container {className}"></div>

<style>
    .side-rays-container {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .side-rays-container :global(canvas) {
        display: block;
    }
</style>

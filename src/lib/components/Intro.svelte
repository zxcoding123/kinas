<script>
    import { onMount } from 'svelte';
    import SideRays from './SideRays.svelte';
    import { navLinks, navIndex } from '$lib/nav.js';

    const text = 'QUINAS';
    let showCursor = $state(false);
    let showContent = $state(false);
    let mobileNavOpen = $state(false);
    let heroEl = $state();
    let pastIntro = $state(false);
    let isDesktop = $state(false);
    let cursorPopped = $state(false);
    let isHoveringLink = $state(false);
    let pageLoaded = $state(false);
    let raysReady = $state(false);

    // The ray layer only reveals once the page has genuinely settled: all subresources
    // done (window load), the hero copy released, and the shader's first frame painted.
    const raysVisible = $derived(pageLoaded && showContent && raysReady);

    // Real mouse coordinates
    let mouse = { x: -100, y: -100 };
    // Rendered cursor coordinates that lag behind
    let cursor = $state({ x: -100, y: -100 });

    // Floating pill while the hero is in view; docks into the full-width bar once it's scrolled past
    const navClass = $derived(
        pastIntro
            ? 'top-0 w-full h-20 rounded-none border-b bg-black/80 backdrop-blur-md px-8 md:px-16'
            : 'top-4 sm:top-6 w-[92%] sm:w-3/4 h-16 rounded-2xl border bg-black/70 backdrop-blur-xl px-5 md:px-8 shadow-[0_10px_40px_rgba(0,0,0,0.45)]'
    );

    onMount(() => {
        // The circular follower cursor only makes sense on devices driven by a real
        // mouse/trackpad — skip it entirely on touch devices (no pointer:fine).
        isDesktop = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches;

        const timer = setTimeout(() => {
            showContent = true;
            if (isDesktop) showCursor = true;
        }, 1550);

        // `load` has already fired by the time a client-side navigation mounts this,
        // so check readyState first rather than waiting for an event that never comes.
        const onLoad = () => (pageLoaded = true);
        if (document.readyState === 'complete') {
            pageLoaded = true;
        } else {
            window.addEventListener('load', onLoad, { once: true });
        }

        /** @type {ReturnType<typeof setTimeout> | undefined} */
        let popTimer;
        /** @type {number | undefined} */
        let frameId;
        /** @type {((e: MouseEvent) => void) | undefined} */
        let handleMouseMove;

        if (isDesktop) {
            document.documentElement.classList.add('custom-cursor-active');

            // Release the entrance animation's grip on `scale` once it's done, so hover
            // states can drive `scale` afterwards without fighting the animation's
            // forwards-filled value.
            popTimer = setTimeout(() => {
                cursorPopped = true;
            }, 400);

            const interactiveSelector = 'a, button, [role="button"], input, textarea, select, summary';

            handleMouseMove = (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                const target = /** @type {HTMLElement | null} */ (e.target);
                isHoveringLink = !!target?.closest?.(interactiveSelector);
            };

            const updateCursor = () => {
                const speed = 0.35;
                cursor.x += (mouse.x - cursor.x) * speed;
                cursor.y += (mouse.y - cursor.y) * speed;
                frameId = requestAnimationFrame(updateCursor);
            };

            window.addEventListener('mousemove', handleMouseMove);
            frameId = requestAnimationFrame(updateCursor);
        }

        /** @type {IntersectionObserver | undefined} */
        let io;
        if (typeof IntersectionObserver !== 'undefined' && heroEl) {
            io = new IntersectionObserver(
                ([entry]) => {
                    pastIntro = !entry.isIntersecting;
                },
                { rootMargin: '-96px 0px 0px 0px', threshold: 0 }
            );
            io.observe(heroEl);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', onLoad);
            if (popTimer) clearTimeout(popTimer);
            if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
            if (frameId) cancelAnimationFrame(frameId);
            if (io) io.disconnect();
            document.documentElement.classList.remove('custom-cursor-active');
        };
    });
</script>

<!-- Structural Header (Fades in with content; docks from a floating pill into the full-width bar once the hero scrolls out of view) -->
<header
    class="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between border-zinc-900 transition-[width,height,top,border-radius,background-color,padding,box-shadow,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none {navClass}"
    class:opacity-100={showContent}
    class:opacity-0={!showContent}
>
    <!-- Logo / Brand Signature -->
    <div class="flex items-center gap-3">
        <div class="relative w-5 h-5 flex items-center justify-center">
            <!-- 5-Dot Matrix Geometric Favicon Node -->
            <div class="w-1 h-1 bg-white absolute top-0 left-0"></div>
            <div class="w-1 h-1 bg-white absolute top-0 right-0"></div>
            <div class="w-1 h-1 bg-white absolute bottom-0 left-0"></div>
            <div class="w-1 h-1 bg-white absolute bottom-0 right-0"></div>
            <div class="w-1 h-1 bg-white absolute"></div>
        </div>
        <span class="font-mono text-xs tracking-[0.3em] text-white font-bold">QUINAS</span>
    </div>

    <!-- Minimalist Navigation Layout. The full seven-section list only clears the
         floating pill from lg up; below that it lives in the drawer. Labels drop the
         `NN.` index here (the footer sitemap keeps it) purely to buy the width. -->
    <nav class="hidden lg:flex items-center gap-4 xl:gap-7 font-mono text-[10px] tracking-wider xl:tracking-widest text-zinc-400">
        {#each navLinks as link (link.href)}
            <a href={link.href} class="whitespace-nowrap hover:text-white transition-colors duration-300">// {link.label}</a>
        {/each}
    </nav>

    <!-- Operational State Indicator (desktop) -->
    <div class="hidden xl:flex items-center gap-2 font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.5)] animate-pulse"></span>
        <span>SYS_ACTIVE</span>
    </div>

    <!-- Mobile Menu Toggle -->
    <button
        type="button"
        class="lg:hidden flex flex-col items-end justify-center gap-1.5 w-8 h-8 shrink-0"
        aria-label="Toggle navigation menu"
        aria-expanded={mobileNavOpen}
        onclick={() => (mobileNavOpen = !mobileNavOpen)}
    >
        <span class="h-px bg-white transition-all duration-300" class:w-6={!mobileNavOpen} class:w-4={mobileNavOpen} class:rotate-45={mobileNavOpen} class:translate-y-[3px]={mobileNavOpen}></span>
        <span class="h-px bg-white w-6 transition-opacity duration-300" class:opacity-0={mobileNavOpen}></span>
        <span class="h-px bg-white transition-all duration-300" class:w-6={!mobileNavOpen} class:w-4={mobileNavOpen} class:-rotate-45={mobileNavOpen} class:-translate-y-[3px]={mobileNavOpen}></span>
    </button>
</header>

<!-- Mobile Navigation Drawer -->
<div
    class="fixed top-20 left-0 w-full bg-black/95 backdrop-blur-md border-b border-zinc-900 z-40 lg:hidden flex flex-col font-mono text-xs tracking-widest text-zinc-400 transition-all duration-300 overflow-y-auto overscroll-contain select-none"
    class:opacity-100={mobileNavOpen}
    class:opacity-0={!mobileNavOpen}
    style:max-height={mobileNavOpen ? 'calc(100dvh - 5rem)' : '0px'}
>
    {#each navLinks as link, i (link.href)}
        <a
            href={link.href}
            class="px-8 py-4 border-b border-zinc-900/60 last:border-b-0 hover:text-white transition-colors duration-300"
            onclick={() => (mobileNavOpen = false)}
        >// {navIndex(i)}. {link.label}</a>
    {/each}
</div>

<!-- Hero Section Entry Block -->
<div
    id="about"
    bind:this={heroEl}
    class="flex h-screen w-screen items-center justify-center bg-black overflow-hidden select-none relative"
>
    <!-- Ambient WebGL Ray Accent (Intro only). Held at opacity-0 until the page has
         fully loaded and the shader reports its first painted frame. -->
    <div
        class="absolute inset-0 z-0 pointer-events-none transition-opacity duration-[1600ms] ease-out motion-reduce:transition-none"
        class:opacity-100={raysVisible}
        class:opacity-0={!raysVisible}
    >
        <SideRays
            onReady={() => (raysReady = true)}
            speed={2.5}
            rayColor1="#EAB308"
            rayColor2="#96c8ff"
            intensity={2}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1}
        />
    </div>

    <div class="relative z-10 flex flex-col items-center px-4">
        <div class="flex">
            {#each text.split('') as letter, i (i)}
                <span
                    class="text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold inline-block animate-letter opacity-0 tracking-tight"
                    style="animation-delay: {i * 150}ms;"
                >
                    {letter}
                </span>
            {/each}
        </div>

        <!-- Tagline -->
        <div
            class="mt-4 sm:mt-6 flex items-center gap-3 font-mono text-[10px] sm:text-xs tracking-[0.3em] text-zinc-500 transition-opacity duration-1000"
            class:opacity-100={showContent}
            class:opacity-0={!showContent}
        >
            <span class="h-px w-8 bg-zinc-700"></span>
            SYSTEMS ENGINEERED WITH INTENT
            <span class="h-px w-8 bg-zinc-700"></span>
        </div>
    </div>

    <!-- Subtle Architectural Guideline Overlay -->
    <div
        class="absolute z-10 bottom-16 left-8 md:left-16 font-mono text-[10px] text-zinc-600 tracking-[0.2em] transition-opacity duration-1000"
        class:opacity-100={showContent}
        class:opacity-0={!showContent}
    >
        PRODUCT ENGINEERING STUDIO // ZAMBOANGA
    </div>

    {#if showCursor}
        <!-- `translate` positions it at the mouse; the pop-in animation drives `scale`
             until it finishes, after which `cursorPopped` hands `scale` over to the
             hover state (shrinks over links/buttons). Keeping position and scale on
             separate CSS properties means they animate independently instead of one
             clobbering the other. mix-blend-mode lives directly on this element so it
             composites against the actual page content behind it (inverting over
             light sections), not against an intermediate wrapper. -->
        <div
            class="custom-cursor"
            class:animate-cursor-pop={!cursorPopped}
            style:translate="{cursor.x}px {cursor.y}px"
            style:scale={cursorPopped ? (isHoveringLink ? 0.55 : 1) : null}
            style:opacity={cursorPopped ? 1 : null}
        ></div>
    {/if}
</div>

<!-- Intro Metric Sub-Section -->
<section 
    class="w-full bg-white   border-t border-zinc-900 grid grid-cols-1 md:grid-cols-3 px-8 md:px-16 py-16 text-zinc-400 select-none font-mono transition-opacity duration-1000"
    class:opacity-100={showContent}
    class:opacity-0={!showContent}
>
    <div class="p-6 border-b md:border-b-0 md:border-r border-zinc-900/60 flex flex-col gap-2">
        <span class="text-black text-xs tracking-wider">// DESIGN PHILOSOPHY</span>
        <p class="font-sans text-sm text-zinc-500 font-light mt-2 leading-relaxed">
            High-fidelity architectural minimalism that communicates extreme intent. We strip out arbitrary noise in favor of stark, deliberate UI balance.
        </p>
    </div>
    <div class="p-6 border-b md:border-b-0 md:border-r border-zinc-900/60 flex flex-col gap-2">
        <span class="text-black text-xs tracking-wider">// STACK PERFORMANCE</span>
        <p class="font-sans text-sm text-zinc-500 font-light mt-2 leading-relaxed">
            Compiler-first execution setups built exclusively for extreme responsiveness, absolute state sync security, and light network overhead footprints.
        </p>
    </div>
    <div class="p-6 flex flex-col gap-2">
        <span class="text-black text-xs tracking-wider">// SYSTEM ORCHESTRATION</span>
        <p class="font-sans text-sm text-zinc-500 font-light mt-2 leading-relaxed">
            Resilient pipelines integrating fluid automated local processes and AI backend execution infrastructures configured around real-time transparency.
        </p>
    </div>
</section>
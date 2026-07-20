<script>
    import { onMount } from 'svelte';
    
    const text = 'QUINAS';
    let showCursor = $state(false);
    let showContent = $state(false);
    
    // Real mouse coordinates
    let mouse = { x: -100, y: -100 };
    // Rendered cursor coordinates that lag behind
    let cursor = $state({ x: -100, y: -100 });

    onMount(() => {
        const timer = setTimeout(() => {
            showCursor = true;
            showContent = true;
        }, 1550);

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        let frameId;
        const updateCursor = () => {
            const speed = 0.15; 
            cursor.x += (mouse.x - cursor.x) * speed;
            cursor.y += (mouse.y - cursor.y) * speed;
            frameId = requestAnimationFrame(updateCursor);
        };

        window.addEventListener('mousemove', handleMouseMove);
        frameId = requestAnimationFrame(updateCursor);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
        };
    });
</script>

<!-- Structural Header (Fades in with content) -->
<header 
    class="fixed top-0 left-0 w-full h-20 border-b border-zinc-900 bg-black/80 backdrop-blur-md z-50 flex items-center justify-between px-8 md:px-16 transition-opacity duration-1000 select-none"
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

    <!-- Minimalist Navigation Layout -->
    <nav class="hidden md:flex items-center gap-12 font-mono text-[10px] tracking-widest text-zinc-400">
        <a href="#about" class="hover:text-white transition-colors duration-300">// 01. IDENTITY</a>
        <a href="#blueprint" class="hover:text-white transition-colors duration-300">// 02. BLUEPRINT</a>
        <a href="#services" class="hover:text-white transition-colors duration-300">// 03. SERVICES</a>
    </nav>

    <!-- Operational State Indicator -->
    <div class="flex items-center gap-2 font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.5)] animate-pulse"></span>
        <span>SYS_ACTIVE</span>
    </div>
</header>

<!-- Hero Section Entry Block -->
<div 
    class="flex h-screen w-screen items-center justify-center bg-black overflow-hidden select-none relative"
>
    <div class="flex">
    
        {#each text.split('') as letter, i (i)}
            <span
                class="text-white text-9xl font-bold inline-block animate-letter opacity-0 tracking-tight"
                style="animation-delay: {i * 150}ms;"
            >
                {letter}
            </span>
        {/each}
    </div>

    <!-- Subtle Architectural Guideline Overlay -->
    <div 
        class="absolute bottom-16 left-8 md:left-16 font-mono text-[10px] text-zinc-600 tracking-[0.2em] transition-opacity duration-1000"
        class:opacity-100={showContent}
        class:opacity-0={!showContent}
    >
        PRODUCT ENGINEERING STUDIO // ZAMBOANGA
    </div>

    {#if showCursor}
        <div 
            class="custom-cursor animate-cursor-pop fixed top-0 left-0 pointer-events-none z-50 w-4 h-4 rounded-full border border-white/40 bg-white/10 -translate-x-1/2 -translate-y-1/2"
            style="transform: translate3d({cursor.x}px, {cursor.y}px, 0);"
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
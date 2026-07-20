<script>
    // Svelte 5 state management for hover micro-interactions
    let activeLayer = $state(null);

    const techStack = [
        {
            id: 'frontend',
            num: '01',
            layer: 'Interface & Synthesis',
            tech: 'Svelte 5 / Tailwind CSS v4 / Flutter / Javascript (ES6+) / Bootstrap v5 / Next.js',
            description: 'Hyper-responsive, reactive user interfaces compiled to minimal vanilla footprints. Zero runtime overhead, tailored native mobile experiences, and micro-interactions.'
        },
        {
            id: 'frameworks',
            num: '02',
            layer: 'Vigorous Frameworks & Libraries',
            tech: 'Vite / Typescript / Webflow / Dart',
            description: 'Robust application engines with structured routing, relational database integrity, secure authentication mechanics, and highly scalable serverless architectures.'
        },
        {
            id: 'backend',
            num: '03',
            layer: 'Immutable Backend',
            tech: 'Python / PHP / Laravel / Supabase / PostgreSQL / MySQL / Node.js / Express.js',
            description: 'Robust application engines with structured routing, relational database integrity, secure authentication mechanics, and highly scalable serverless architectures.'
        },
        {
            id: 'localfirst',
            num: '04',
            layer: 'Resilient Local-First',
            tech: 'Isar DB / P2P Local Mesh Synchronization',
            description: 'Offline-ready applications designed to function seamlessly without internet dependencies, utilising low-latency local synchronization.'
        },
        {
            id: 'automation',
            num: '05',
            layer: 'Orchestration & AI Pipelines',
            tech: 'n8n / AI Automation Architectures / Zapier / Claude Code',
            description: 'Intelligent workflow engines, custom language model orchestrations, and algorithmic data routing designed to scale business operational efficiency.'
        }
    ];
</script>

<section class="min-h-screen w-full bg-[#000000] text-[#d4d4d8] font-sans flex flex-col justify-between select-none border-t border-[#27272a]/20 relative overflow-hidden mt-20">
    
    <!-- Section Structural Header -->
    <div class="w-full h-24 border-b border-[#27272a]/40 flex items-center justify-between px-8 md:px-16 bg-[#000000] backdrop-blur-sm z-10">
         <div class="text-2xl font-mono tracking-widest text-white uppercase">
            The Technical Blueprint.
        </div>
        <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-100 opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-100 opacity-50"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-100 opacity-30"></span>
        </div>
       
    </div>

    <!-- The Technical Blueprint Matrix Grid -->
    <div class="grow grid grid-cols-1 md:grid-cols-2 w-full px-4 md:px-12 py-12 relative">
        
        <!-- Centered Crosshair Graphic Accent (Quinas Fivefold Anchor) -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none z-20">
            <div class="w-4 h-[1px] bg-[#000000] absolute"></div>
            <div class="h-4 w-[1px] bg-[#000000] absolute"></div>
            <!-- Subtle 5-dot matrix reference in the center -->
            <div class="w-1 h-1 rounded-full bg-zinc-400 absolute"></div>
        </div>

        {#each techStack as item, i (item.id)}
          <div 
    role="contentinfo"
    class="border border-[#27272a]/20 p-8 md:p-12 flex flex-col justify-between relative transition-all duration-500 ease-out group "
    class:bg-[#121214]={activeLayer === item.id}
    class:border-zinc-700={activeLayer === item.id}
    onmouseenter={_ => activeLayer = item.id}
    onmouseleave={_ => activeLayer = null}
>
                <!-- Subtle Gradient Glow behind the active tile -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-zinc-900/10 via-transparent to-transparent pointer-events-none"></div>

                <!-- Top Row of Grid Item -->
                <div class="flex justify-between items-start z-10">
                    <div>
                        <span class="text-[20px] font-mono tracking-widest text-zinc-600 block mb-1">{item.num}</span>
                        <h3 class="text-lg md:text-xl font-light text-zinc-100 group-hover:text-white transition-colors duration-300">
                            {item.layer}
                        </h3>
                    </div>
                    <!-- Indicator Node -->
                    <div class="flex items-center gap-1.5 h-6">
                        <span class="w-1 h-1 rounded-full transition-all duration-300"
                              class:bg-zinc-100={activeLayer === item.id}
                              class:shadow-[0_0_8px_rgba(255,255,255,0.6)]={activeLayer === item.id}
                              class:bg-zinc-700={activeLayer !== item.id}></span>
                    </div>
                </div>

                <!-- Bottom Row of Grid Item -->
                <div class="mt-16 md:mt-24 z-10">
                    <div class="text-xs font-mono tracking-wide text-zinc-400 border-l-2 border-zinc-800 group-hover:border-zinc-500 pl-3 py-1 transition-all duration-300">
                        {item.tech}
                    </div>
                    <p class="text-sm font-light text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 mt-4 leading-relaxed max-w-md">
                        {item.description}
                    </p>
                </div>
            </div>
        {/each}
    </div>
</section>
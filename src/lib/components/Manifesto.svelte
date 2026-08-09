<script>
    import { onMount } from 'svelte';

    // State management using Svelte 5 runes
    let visibleBlocks = $state([false, false, false]);

    onMount(() => {
        // Staggered reveal effect for the text blocks
        const timers = [
            setTimeout(() => { visibleBlocks[0] = true; }, 400),
            setTimeout(() => { visibleBlocks[1] = true; }, 900),
            setTimeout(() => { visibleBlocks[2] = true; }, 1400)
        ];

        return () => {
            timers.forEach(clearTimeout);
        };
    });
</script>

<section id="manifesto" class="min-h-screen w-full bg-[#000000] font-sans text-[#d4d4d8] flex flex-col justify-between select-none relative overflow-hidden">
    
    <!-- Top Structural Menu Bar -->
<div class="w-full h-24 border-t border-b border-[#27272a]/40 flex items-center justify-between px-8 md:px-16 bg-[#000000] backdrop-blur-sm z-10">
        <!-- Left Side: Three Subtle White Dots -->
        <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-100 opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-100 opacity-50"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-100 opacity-30"></span>
        </div>
         <div class="text-lg md:text-2xl font-mono tracking-widest text-white uppercase">
            The Grand Manifesto.
        </div>
    </div>

    <!-- Main Content Area with Architectural Grid Geometry -->
    <div class="grow grid grid-cols-1 lg:grid-cols-12 w-full px-8 md:px-16 relative">
        
        <!-- Vertical Grid Line Accent (Soft Blueprint Constraint) -->
        <div class="hidden lg:block lg:col-start-5 absolute top-0 bottom-0 border-l border-[#27272a]/20 pointer-events-none"></div>

        <!-- Left Column: Empty space/structural padding keeping the layout asymmetrical -->
        <div class="hidden lg:flex lg:col-span-4 flex-col justify-end pb-24 text-left bg-white"> </div>


        <!-- Right Column: The Architectural Manifesto text block group -->
        <div class="lg:col-span-8 flex flex-col justify-center gap-12 lg:pl-16 py-20 lg:py-0 max-w-3xl text-left lg:text-right">
            
            <!-- Block 1 -->
            <div 
                class="transition-all duration-1000 ease-out transform "
                class:opacity-100={visibleBlocks[0]}
                class:opacity-0={!visibleBlocks[0]}
                class:translate-y-0={visibleBlocks[0]}
                class:translate-y-4={!visibleBlocks[0]}
            >
                
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-relaxed text-zinc-100">
                    We strip away the noise to engineer high-fidelity digital infrastructure. No bloated syntax. No fleeting design trends. 
                </h2>
            </div>

            <!-- Block 2 -->
            <div 
                class="transition-all duration-1000 ease-out transform"
                class:opacity-100={visibleBlocks[1]}
                class:opacity-0={!visibleBlocks[1]}
                class:translate-y-0={visibleBlocks[1]}
                class:translate-y-4={!visibleBlocks[1]}
            >
              
                <h2 class="text-xl md:text-2xl font-light tracking-tight leading-relaxed text-zinc-400">
                    Every element is calculated. We build modern systems and highly interactive user interfaces crafted around extreme clarity, precision, and performance.
                </h2>
            </div>

            <!-- Block 3 -->
            <div 
                class="transition-all duration-1000 ease-out transform"
                class:opacity-100={visibleBlocks[2]}
                class:opacity-0={!visibleBlocks[2]}
                class:translate-y-0={visibleBlocks[2]}
                class:translate-y-4={!visibleBlocks[2]}
            >
                <!-- <div class="flex items-center gap-4 mt-4">
                    <span class="h-[1px] w-12 bg-zinc-700"></span>
                    <span class="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                        Quinas Product Engineering Studio
                    </span>
                </div> -->

            </div>
        </div>
    </div>
</section>
<style>
    /* Premium elegant font matching the Swiss / Architectural layout rules */
    :global(body) {
        background-color: #000000;
        color: #d4d4d8;
    }
</style>
<script>
    const year = new Date().getFullYear();

    const sitemap = [
        { label: '// 01. IDENTITY', href: '#about' },
        { label: '// 02. BLUEPRINT', href: '#blueprint' },
        { label: '// 03. SERVICES', href: '#services' },
        { label: '// 04. LEDGER', href: '#ledger' },
        { label: '// 05. CONTACT', href: '#contact' }
    ];

    const system = [
        { label: 'LOCATION', value: 'ZAMBOANGA, PH' },
        { label: 'BUILD', value: `v${year - 2020}.0` },
        { label: 'RUNTIME', value: 'NETWORK_AGNOSTIC' }
    ];
</script>

<footer class="w-full bg-black text-zinc-400 border-t border-zinc-900 font-mono select-none">
    <div class="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <!-- Brand Column -->
        <div class="md:col-span-5 flex flex-col gap-4">
            <div class="flex items-center gap-3">
                <div class="relative w-5 h-5 flex items-center justify-center">
                    <div class="w-1 h-1 bg-white absolute top-0 left-0"></div>
                    <div class="w-1 h-1 bg-white absolute top-0 right-0"></div>
                    <div class="w-1 h-1 bg-white absolute bottom-0 left-0"></div>
                    <div class="w-1 h-1 bg-white absolute bottom-0 right-0"></div>
                    <div class="w-1 h-1 bg-white absolute"></div>
                </div>
                <span class="font-mono text-xs tracking-[0.3em] text-white font-bold">QUINAS</span>
            </div>
            <p class="text-sm font-light text-zinc-500 leading-relaxed max-w-sm">
                Product engineering studio building high-fidelity digital infrastructure — stripped of noise, calculated by design.
            </p>
        </div>

        <!-- Sitemap Column -->
        <div class="md:col-span-4 flex flex-col gap-4">
            <span class="text-[10px] tracking-widest text-zinc-600">// SITEMAP</span>
            <nav class="flex flex-col gap-3 text-xs tracking-widest text-zinc-400">
                {#each sitemap as item (item.href)}
                    <a href={item.href} class="hover:text-white transition-colors duration-300 w-fit">{item.label}</a>
                {/each}
            </nav>
        </div>

        <!-- System Column -->
        <div class="md:col-span-3 flex flex-col gap-4">
            <span class="text-[10px] tracking-widest text-zinc-600">// SYSTEM</span>
            <div class="flex flex-col gap-3 text-xs">
                {#each system as item (item.label)}
                    <div class="flex flex-col gap-0.5">
                        <span class="text-zinc-600 text-[10px] tracking-wider">{item.label}</span>
                        <span class="text-zinc-300 tracking-wide">{item.value}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-zinc-900 px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-widest text-zinc-600">
        <span>© {year} QUINAS. ALL SYSTEMS OPERATIONAL.</span>

        <div class="flex items-center gap-6">
            <a href="#about" class="hover:text-white transition-colors duration-300">[ BACK_TO_TOP ]</a>
            <div class="flex items-center gap-2 uppercase">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.5)] animate-pulse"></span>
                <span>SYS_ACTIVE</span>
            </div>
        </div>
    </div>
</footer>

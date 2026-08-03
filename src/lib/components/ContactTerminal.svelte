<script>
    import { onMount } from 'svelte';

    let live = $state(false);
    let sectionEl = $state();

    onMount(() => {
        if (typeof IntersectionObserver === 'undefined') {
            live = true;
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        live = true;
                        io.disconnect();
                    }
                }
            },
            { threshold: 0.08 }
        );
        io.observe(sectionEl);
        return () => io.disconnect();
    });

    const steps = [
        { id: 1, key: 'SELECT_SCOPE' },
        { id: 2, key: 'STACK_REQUIREMENTS' },
        { id: 3, key: 'INITIALIZE_MAIL' }
    ];

    let step = $state(1);
    let submitted = $state(false);
    let submitError = $state('');

    // STEP 01 — single-select project scope
    const scopeOptions = [
        'WEB_PLATFORM',
        'MOBILE_APPLICATION',
        'AUTOMATION_PIPELINE',
        'LOCAL_FIRST_SYSTEM',
        'FULL_STACK_BUILD',
        'SYSTEM_AUDIT'
    ];
    let scope = $state('');

    // STEP 02 — multi-select stack requirements
    const stackOptions = [
        'AUTH_&_PERMISSIONS',
        'PAYMENTS_&_BILLING',
        'REALTIME_SYNC',
        'AI_ORCHESTRATION',
        'OFFLINE_FIRST',
        'LEGACY_MIGRATION',
        'THIRD_PARTY_INTEGRATION',
        'CUSTOM_INFRASTRUCTURE'
    ];
    let stack = $state([]);

    function toggleStack(option) {
        stack = stack.includes(option) ? stack.filter((s) => s !== option) : [...stack, option];
    }

    const allStackSelected = $derived(stack.length === stackOptions.length);

    function toggleAllStack() {
        stack = allStackSelected ? [] : [...stackOptions];
    }

    // STEP 03 — contact fields
    let name = $state('');
    let email = $state('');
    let company = $state('');
    let brief = $state('');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const canAdvanceFrom1 = $derived(scope !== '');
    const canAdvanceFrom2 = $derived(stack.length > 0);
    const canExecute = $derived(
        name.trim() !== '' && emailPattern.test(email) && brief.trim().length >= 12
    );

    function next() {
        if (step === 1 && canAdvanceFrom1) step = 2;
        else if (step === 2 && canAdvanceFrom2) step = 3;
    }

    function back() {
        submitError = '';
        if (step > 1) step -= 1;
    }

    function goToStep(target) {
        if (target === 1) step = 1;
        if (target === 2 && canAdvanceFrom1) step = 2;
        if (target === 3 && canAdvanceFrom1 && canAdvanceFrom2) step = 3;
    }

    function handleExecute() {
        if (!canExecute) {
            submitError = 'INCOMPLETE_PARAMETERS // NAME, VALID EMAIL AND BRIEF (12+ CHARS) REQUIRED';
            return;
        }
        submitError = '';

        const payload = { scope, stack, name, email, company, brief };

        // TODO: wire this to the real intake target — either
        //   window.location.href = `mailto:hello@quinas.studio?subject=...&body=...`
        // or a webhook POST (n8n / Zapier / custom endpoint) with `payload`.
        console.log('CLIENT_INTEGRATION_PROTOCOL // PAYLOAD', payload);

        submitted = true;
    }

    function resetSequence() {
        step = 1;
        submitted = false;
        submitError = '';
        scope = '';
        stack = [];
        name = '';
        email = '';
        company = '';
        brief = '';
    }
</script>

<section
    bind:this={sectionEl}
    class:is-live={live}
    id="contact"
    class="terminal-root w-full bg-white border-t border-zinc-900 select-none font-mono"
>
    <!-- Section Header -->
    <div class="h-24 border-b border-zinc-900/40 flex items-center justify-between px-8 md:px-16 bg-white text-black">
        <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-black opacity-80"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-black opacity-50"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-black opacity-30"></span>
        </div>
        <span class="text-lg md:text-2xl font-mono tracking-widest text-black uppercase">
            Client Integration Protocol
        </span>
    </div>

    <div class="max-w-4xl mx-auto px-4 md:px-8 py-20 animate-terminal-in">
        <p class="text-[10px] md:text-xs text-zinc-500 tracking-widest mb-8 px-2">
            // HIGH-FIDELITY CONTACT TERMINAL — QUALIFYING INTAKE SEQUENCE
        </p>

        <!-- Terminal Window Frame -->
        <div class="border border-zinc-900 bg-black text-zinc-300 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
            <!-- Window Title Bar -->
            <div class="h-11 border-b border-zinc-800 flex items-center justify-between gap-3 px-4 md:px-6 bg-black">
                <div class="flex items-center gap-2 min-w-0">
                    <span class="w-2.5 h-2.5 border border-zinc-600 shrink-0"></span>
                    <span class="text-[10px] tracking-widest text-zinc-500 truncate">CLIENT_INTEGRATION_PROTOCOL.exe</span>
                </div>
                <span class="hidden sm:inline text-[10px] tracking-widest text-zinc-600 shrink-0">STATUS: {submitted ? 'COMPLETE' : 'AWAITING_INPUT'}</span>
                <span
                    class="sm:hidden w-1.5 h-1.5 rounded-full shrink-0"
                    class:bg-green-500={submitted}
                    class:bg-zinc-600={!submitted}
                    aria-label={submitted ? 'Status: complete' : 'Status: awaiting input'}
                ></span>
            </div>

            <!-- Step Breadcrumb: stacked rows on mobile (full label fits), tabs side-by-side from sm up -->
            <div class="flex flex-col sm:grid sm:grid-cols-3 border-b border-zinc-800 text-[10px] md:text-xs tracking-wider">
                {#each steps as s, i (s.id)}
                    <button
                        type="button"
                        onclick={() => goToStep(s.id)}
                        disabled={submitted}
                        class="flex items-center gap-2 px-4 md:px-6 py-3 border-b sm:border-b-0 sm:border-r border-zinc-800 last:border-b-0 sm:last:border-r-0 transition-colors duration-300 text-left disabled:cursor-default"
                        class:text-white={step === s.id}
                        class:text-zinc-600={step !== s.id}
                        class:bg-zinc-900={step === s.id}
                    >
                        <span class="shrink-0 whitespace-nowrap">[ {String(s.id).padStart(2, '0')}/03 ]</span>
                        <span class="whitespace-nowrap">{s.key}</span>
                        {#if (s.id === 1 && canAdvanceFrom1 && step !== 1) || (s.id === 2 && canAdvanceFrom2 && step !== 2)}
                            <span class="text-zinc-500 ml-auto shrink-0">✓</span>
                        {/if}
                    </button>
                {/each}
            </div>

            <!-- Terminal Body -->
            <div class="p-6 md:p-10 min-h-[360px] flex flex-col">
                {#if submitted}
                    <div class="flex flex-col gap-4">
                        <p class="text-zinc-400 text-sm">
                            <span class="text-white">&gt;</span> SEQUENCE_RECEIVED. COMPILING RECEIPT<span class="cursor-blink">_</span>
                        </p>
                        <div class="border border-zinc-800 p-5 text-xs md:text-sm leading-relaxed flex flex-col gap-2">
                            <div><span class="text-zinc-500">SCOPE</span> <span class="text-white">{scope}</span></div>
                            <div><span class="text-zinc-500">STACK</span> <span class="text-white">{stack.join(', ')}</span></div>
                            <div><span class="text-zinc-500">NAME</span> <span class="text-white">{name}</span></div>
                            <div><span class="text-zinc-500">EMAIL</span> <span class="text-white">{email}</span></div>
                            {#if company}<div><span class="text-zinc-500">COMPANY</span> <span class="text-white">{company}</span></div>{/if}
                            <div><span class="text-zinc-500">BRIEF</span> <span class="text-white">{brief}</span></div>
                        </div>
                        <p class="text-zinc-500 text-xs">
                            // NOTE: intake is not yet routed to a live endpoint. Payload logged to console pending mail/webhook wiring.
                        </p>
                        <button
                            type="button"
                            onclick={resetSequence}
                            class="mt-2 self-start border border-zinc-700 text-zinc-400 hover:text-black hover:bg-white transition-colors duration-300 text-xs tracking-widest px-5 py-3"
                        >
                            [ RUN_NEW_SEQUENCE ]
                        </button>
                    </div>
                {:else if step === 1}
                    <p class="text-zinc-400 text-sm mb-6">
                        <span class="text-white">&gt;</span> DEFINE PROJECT SCOPE<span class="cursor-blink">_</span>
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {#each scopeOptions as option (option)}
                            <button
                                type="button"
                                onclick={() => (scope = option)}
                                class="text-left text-xs md:text-sm tracking-wider border px-4 py-4 transition-all duration-300"
                                class:border-white={scope === option}
                                class:bg-white={scope === option}
                                class:text-black={scope === option}
                                class:border-zinc-800={scope !== option}
                                class:text-zinc-400={scope !== option}
                            >
                                {scope === option ? '[x]' : '[ ]'} {option}
                            </button>
                        {/each}
                    </div>
                {:else if step === 2}
                    <div class="flex items-start justify-between gap-4 mb-6">
                        <p class="text-zinc-400 text-sm">
                            <span class="text-white">&gt;</span> SPECIFY STACK REQUIREMENTS — SELECT ALL THAT APPLY<span class="cursor-blink">_</span>
                        </p>
                        <button
                            type="button"
                            onclick={toggleAllStack}
                            class="shrink-0 text-[10px] tracking-widest border border-zinc-700 text-zinc-400 hover:text-black hover:bg-white hover:border-white transition-colors duration-300 px-3 py-2"
                        >
                            {allStackSelected ? '[ CLEAR_ALL ]' : '[ SELECT_ALL ]'}
                        </button>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {#each stackOptions as option (option)}
                            <button
                                type="button"
                                onclick={() => toggleStack(option)}
                                class="text-left text-xs md:text-sm tracking-wider border px-4 py-4 transition-all duration-300"
                                class:border-white={stack.includes(option)}
                                class:bg-white={stack.includes(option)}
                                class:text-black={stack.includes(option)}
                                class:border-zinc-800={!stack.includes(option)}
                                class:text-zinc-400={!stack.includes(option)}
                            >
                                {stack.includes(option) ? '[x]' : '[ ]'} {option}
                            </button>
                        {/each}
                    </div>
                {:else if step === 3}
                    <p class="text-zinc-400 text-sm mb-6">
                        <span class="text-white">&gt;</span> INITIALIZE CONTACT SEQUENCE<span class="cursor-blink">_</span>
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label class="flex flex-col gap-2 text-[10px] tracking-widest text-zinc-500">
                            NAME *
                            <input
                                type="text"
                                bind:value={name}
                                class="bg-black border border-zinc-800 focus:border-white outline-none text-sm text-white px-3 py-3 font-mono"
                                placeholder="JANE_DOE"
                            />
                        </label>
                        <label class="flex flex-col gap-2 text-[10px] tracking-widest text-zinc-500">
                            EMAIL *
                            <input
                                type="email"
                                bind:value={email}
                                class="bg-black border border-zinc-800 focus:border-white outline-none text-sm text-white px-3 py-3 font-mono"
                                placeholder="JANE@COMPANY.COM"
                            />
                        </label>
                        <label class="flex flex-col gap-2 text-[10px] tracking-widest text-zinc-500 sm:col-span-2">
                            COMPANY / ORG
                            <input
                                type="text"
                                bind:value={company}
                                class="bg-black border border-zinc-800 focus:border-white outline-none text-sm text-white px-3 py-3 font-mono"
                                placeholder="OPTIONAL"
                            />
                        </label>
                        <label class="flex flex-col gap-2 text-[10px] tracking-widest text-zinc-500 sm:col-span-2">
                            PROJECT BRIEF *
                            <textarea
                                bind:value={brief}
                                rows="4"
                                class="bg-black border border-zinc-800 focus:border-white outline-none text-sm text-white px-3 py-3 font-mono resize-none"
                                placeholder="DESCRIBE THE PROBLEM, TIMELINE, AND WHAT SUCCESS LOOKS LIKE."
                            ></textarea>
                        </label>
                    </div>
                    {#if submitError}
                        <p class="text-red-400 text-[10px] tracking-widest mt-4">// {submitError}</p>
                    {/if}
                {/if}
            </div>

            <!-- Navigation Footer -->
            {#if !submitted}
                <div class="border-t border-zinc-800 flex items-center justify-between px-6 py-4">
                    <button
                        type="button"
                        onclick={back}
                        disabled={step === 1}
                        class="text-[10px] md:text-xs tracking-widest text-zinc-500 hover:text-white transition-colors duration-300 disabled:opacity-0 disabled:pointer-events-none"
                    >
                        [ &lt; BACK ]
                    </button>

                    {#if step === 1}
                        <button
                            type="button"
                            onclick={next}
                            disabled={!canAdvanceFrom1}
                            class="text-[10px] md:text-xs tracking-widest px-5 py-3 border transition-all duration-300 disabled:border-zinc-800 disabled:text-zinc-700 border-white text-white hover:bg-white hover:text-black"
                        >
                            [ NEXT &gt; ]
                        </button>
                    {:else if step === 2}
                        <button
                            type="button"
                            onclick={next}
                            disabled={!canAdvanceFrom2}
                            class="text-[10px] md:text-xs tracking-widest px-5 py-3 border transition-all duration-300 disabled:border-zinc-800 disabled:text-zinc-700 border-white text-white hover:bg-white hover:text-black"
                        >
                            [ NEXT &gt; ]
                        </button>
                    {:else}
                        <button
                            type="button"
                            onclick={handleExecute}
                            class="text-[10px] md:text-xs tracking-widest px-5 py-3 border border-white bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
                        >
                            [ EXECUTE_INTAKE &gt;_ ]
                        </button>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    .terminal-root :global(.animate-terminal-in) {
        opacity: 0;
        transform: translateY(16px);
    }

    .is-live :global(.animate-terminal-in) {
        animation: terminalIn 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes terminalIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .cursor-blink {
        animation: blink 1s step-start infinite;
    }

    @keyframes blink {
        50% { opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
        .terminal-root :global(.animate-terminal-in) {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
        .cursor-blink {
            animation: none !important;
        }
    }
</style>

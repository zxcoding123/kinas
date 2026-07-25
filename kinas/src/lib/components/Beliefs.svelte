<script>
  import { onMount } from 'svelte';

  // Svelte 5 reactive state. For Svelte 4: let live = false; let sectionEl;
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
</script>

<svelte:head>
  <!-- Fail-open: if JS never runs, reveal everything rather than showing a blank section -->
  <noscript>
    <style>
      .creed-root .animate-compile,
      .creed-root .animate-draw-v,
      .creed-root .animate-draw-h { opacity: 1 !important; }
    </style>
  </noscript>
</svelte:head>

<section
  bind:this={sectionEl}
  class:is-live={live}
  class="creed-root w-full bg-white border-t border-zinc-900 select-none font-mono overflow-hidden"
>
  <!-- Section Header -->
  <div class="h-24 border-b border-zinc-900/40 flex items-center justify-between px-8 md:px-16 bg-white z-10 text-black">
    <div class="flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-black opacity-80 animate-pulse"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-black opacity-50"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-black opacity-30"></span>
    </div>
    <span class="text-xl md:text-2xl font-mono tracking-widest text-zinc-900">CREED ARCHITECTURE</span>
  </div>

  <!-- Org Chart Master Container -->
  <div class="w-full max-w-7xl mx-auto flex flex-col items-center pt-20 pb-32 px-4">

    <!-- LEVEL 1: ROOT CORNERSTONE -->
    <div
      class="group relative p-8 border border-zinc-900 text-center bg-white hover:bg-black transition-all duration-500 ease-out min-w-[320px] animate-compile"
      style="animation-delay: 200ms;"
    >
      <span class="text-zinc-400 group-hover:text-zinc-600 text-[10px] block mb-2 tracking-wider transition-colors duration-500">// LEVEL 01 // FOUNDATION</span>
      <h3 class="font-sans text-lg font-medium text-black group-hover:text-white tracking-tight transition-colors duration-500">SOPHISTICATEDNESS</h3>
      <p class="font-sans text-xs text-zinc-500 group-hover:text-zinc-400 font-light mt-2 max-w-[260px] mx-auto leading-relaxed transition-colors duration-500">
        Absolute maturity and aesthetic restraint. We value design longevity over fleeting tech trends.
      </p>
    </div>

    <!-- Vertical Connector Root -> Branch -->
    <div class="w-px bg-zinc-900 animate-draw-v" style="height: 64px; animation-delay: 800ms;"></div>

    <!-- LEVEL 2 & 3: THE OPERATIONAL MATRIX (4-COLUMN GRID) -->
    <div class="w-full flex flex-col items-center">
      <!-- Horizontal structural beam, spans the four column centres -->
      <div class="w-[75%] h-px bg-zinc-900 hidden lg:block animate-draw-h" style="animation-delay: 1100ms;"></div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-16 lg:gap-0 pt-0 lg:pt-8 relative">

        <!-- COLUMN 1: INTENTIONAL EXECUTION -->
        <div class="flex flex-col items-center relative px-2">
          <div class="w-px bg-zinc-900 absolute left-1/2 -translate-x-1/2 hidden lg:block animate-draw-v" style="height: 32px; top: -32px; animation-delay: 1300ms;"></div>

          <div
            class="group p-6 border border-zinc-900/40 bg-white hover:bg-black hover:border-zinc-900 transition-all duration-500 ease-out w-full max-w-[280px] text-center animate-compile"
            style="animation-delay: 1500ms;"
          >
            <span class="text-zinc-400 group-hover:text-zinc-600 text-[10px] block mb-2 transition-colors duration-500">// LEVEL 02 // EXECUTION</span>
            <h4 class="font-sans text-base font-medium text-black group-hover:text-white transition-colors duration-500">HARD WORK &amp; RIGOR</h4>
            <p class="font-sans text-xs text-zinc-500 group-hover:text-zinc-400 font-light mt-2 leading-relaxed transition-colors duration-500">
              Deep, uninterrupted focus mechanics. We solve architectural friction through aggressive engineering discipline.
            </p>
          </div>

          <div class="w-px bg-zinc-900 hidden lg:block animate-draw-v" style="height: 48px; animation-delay: 2300ms;"></div>

          <!-- LEVEL 3: ACCOUNTABILITY LEDGER -->
          <div
            class="group p-5 border border-zinc-900/20 bg-white hover:bg-black hover:border-zinc-900/60 transition-all duration-500 ease-out w-full max-w-[250px] text-center animate-compile"
            style="animation-delay: 2500ms;"
          >
            <span class="text-zinc-400 group-hover:text-zinc-600 text-[9px] block mb-1 transition-colors duration-500">// LAYER 03 // LEDGER</span>
            <h5 class="font-sans text-sm font-medium text-zinc-800 group-hover:text-zinc-200 transition-colors duration-500">Extreme Accountability</h5>
            <p class="font-sans text-[11px] text-zinc-400 group-hover:text-zinc-500 font-light mt-1.5 leading-relaxed transition-colors duration-500">
              No excuses. We own our application logic metrics, delivery states, and system failures entirely.
            </p>
          </div>
        </div>

        <!-- COLUMN 2: INTENTIONAL FRICTION -->
        <div class="flex flex-col items-center relative px-2">
          <div class="w-px bg-zinc-900 absolute left-1/2 -translate-x-1/2 hidden lg:block animate-draw-v" style="height: 32px; top: -32px; animation-delay: 1400ms;"></div>

          <div
            class="group p-6 border border-zinc-900/40 bg-white hover:bg-black hover:border-zinc-900 transition-all duration-500 ease-out w-full max-w-[280px] text-center animate-compile"
            style="animation-delay: 1700ms;"
          >
            <span class="text-zinc-400 group-hover:text-zinc-600 text-[10px] block mb-2 transition-colors duration-500">// LEVEL 02 // INTERACTION</span>
            <h4 class="font-sans text-base font-medium text-black group-hover:text-white transition-colors duration-500">INTENTIONAL FRICTION</h4>
            <p class="font-sans text-xs text-zinc-500 group-hover:text-zinc-400 font-light mt-2 leading-relaxed transition-colors duration-500">
          Eliminating mindless loops that break focus with architectural checkpoints to enforce deep situational awareness.
            </p>
          </div>

          <div class="w-px bg-zinc-900 hidden lg:block animate-draw-v" style="height: 48px; animation-delay: 2500ms;"></div>

          <!-- LEVEL 3: ANTI-BLINDNESS METRICS -->
          <div
            class="group p-5 border border-zinc-900/20 bg-white hover:bg-black hover:border-zinc-900/60 transition-all duration-500 ease-out w-full max-w-[250px] text-center animate-compile"
            style="animation-delay: 2700ms;"
          >
            <span class="text-zinc-400 group-hover:text-zinc-600 text-[9px] block mb-1 transition-colors duration-500">// LAYER 03 // AUDITING</span>
            <h5 class="font-sans text-sm font-medium text-zinc-800 group-hover:text-zinc-200 transition-colors duration-500">Expense Blindness Killer</h5>
            <p class="font-sans text-[11px] text-zinc-400 group-hover:text-zinc-500 font-light mt-1.5 leading-relaxed transition-colors duration-500">
              Forcing visibility. Utilizing multi-year burn projections to expose bleeding and strip out waste aggressively.
            </p>
          </div>
        </div>

        <!-- COLUMN 3: TRANSPARENT BLUEPRINT -->
        <div class="flex flex-col items-center relative px-2">
          <div class="w-px bg-zinc-900 absolute left-1/2 -translate-x-1/2 hidden lg:block animate-draw-v" style="height: 32px; top: -32px; animation-delay: 1500ms;"></div>

          <div
            class="group p-6 border border-zinc-900/40 bg-white hover:bg-black hover:border-zinc-900 transition-all duration-500 ease-out w-full max-w-[280px] text-center animate-compile"
            style="animation-delay: 1900ms;"
          >
            <span class="text-zinc-400 group-hover:text-zinc-600 text-[10px] block mb-2 transition-colors duration-500">// LEVEL 02 // STRUCTURE</span>
            <h4 class="font-sans text-base font-medium text-black group-hover:text-white transition-colors duration-500">EXTREME CLARITY</h4>
            <p class="font-sans text-xs text-zinc-500 group-hover:text-zinc-400 font-light mt-2 leading-relaxed transition-colors duration-500">
              Stripping out arbitrary narrative noise. We speak to clients via concrete data parameters and structural layout paths.
            </p>
          </div>

          <div class="w-px bg-zinc-900 hidden lg:block animate-draw-v" style="height: 48px; animation-delay: 2700ms;"></div>

          <!-- LEVEL 3: RADICAL OPENNESS -->
          <div
            class="group p-5 border border-zinc-900/20 bg-white hover:bg-black hover:border-zinc-900/60 transition-all duration-500 ease-out w-full max-w-[250px] text-center animate-compile"
            style="animation-delay: 2900ms;"
          >
            <span class="text-zinc-400 group-hover:text-zinc-600 text-[9px] block mb-1 transition-colors duration-500">// LAYER 03 // SYNTAX</span>
            <h5 class="font-sans text-sm font-medium text-zinc-800 group-hover:text-zinc-200 transition-colors duration-500">Radical Openness</h5>
            <p class="font-sans text-[11px] text-zinc-400 group-hover:text-zinc-500 font-light mt-1.5 leading-relaxed transition-colors duration-500">
              Total pipeline transparency. Clients see real code repositories, raw tracking webhooks, and live system architectures.
            </p>
          </div>
        </div>

        <!-- COLUMN 4: SYSTEM ADAPTABILITY -->
        <div class="flex flex-col items-center relative px-2">
          <div class="w-px bg-zinc-900 absolute left-1/2 -translate-x-1/2 hidden lg:block animate-draw-v" style="height: 32px; top: -32px; animation-delay: 1600ms;"></div>

          <div
            class="group p-6 border border-zinc-900/40 bg-white hover:bg-black hover:border-zinc-900 transition-all duration-500 ease-out w-full max-w-[280px] text-center animate-compile"
            style="animation-delay: 2100ms;"
          >
            <span class="text-zinc-400 group-hover:text-zinc-600 text-[10px] block mb-2 transition-colors duration-500">// LEVEL 02 // EVOLUTION</span>
            <h4 class="font-sans text-base font-medium text-black group-hover:text-white transition-colors duration-500">SYSTEM FLEXIBILITY</h4>
            <p class="font-sans text-xs text-zinc-500 group-hover:text-zinc-400 font-light mt-2 leading-relaxed transition-colors duration-500">
              Agile structural composition. We configure networks and code loops that smoothly adapt to evolving scaling strains.
            </p>
          </div>

          <div class="w-px bg-zinc-900 hidden lg:block animate-draw-v" style="height: 48px; animation-delay: 2900ms;"></div>

          <!-- LEVEL 3: VIBE INTEGRATION -->
          <div
            class="group p-5 border border-zinc-900/20 bg-white hover:bg-black hover:border-zinc-900/60 transition-all duration-500 ease-out w-full max-w-[250px] text-center animate-compile"
            style="animation-delay: 3100ms;"
          >
            <span class="text-zinc-400 group-hover:text-zinc-600 text-[9px] block mb-1 transition-colors duration-500">// LAYER 03 // ORCHESTRA</span>
            <h5 class="font-sans text-sm font-medium text-zinc-800 group-hover:text-zinc-200 transition-colors duration-500">Vibe Integration</h5>
            <p class="font-sans text-[11px] text-zinc-400 group-hover:text-zinc-500 font-light mt-1.5 leading-relaxed transition-colors duration-500">
              We don't fight automation. We orchestrate AI generation tooling for speed while maintaining strict manual architectural governance.
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- LEVEL 4: THE INTEGRATED ANCHOR CORE -->
    <div class="w-full flex flex-col items-center ">
      <!-- Converging tracks: aligned to the four column centres (12.5 / 37.5 / 62.5 / 87.5%) -->
      <div class="w-[75%] h-12 hidden lg:block relative">
        <div class="w-px h-full bg-zinc-900 absolute left-0 animate-draw-v" style="animation-delay: 3300ms;"></div>
        <div class="w-px h-full bg-zinc-900 absolute left-1/3 animate-draw-v" style="animation-delay: 3400ms;"></div>
        <div class="w-px h-full bg-zinc-900 absolute left-2/3 animate-draw-v" style="animation-delay: 3500ms;"></div>
        <div class="w-px h-full bg-zinc-900 absolute right-0 animate-draw-v" style="animation-delay: 3600ms;"></div>
      </div>

      <div class="w-[75%] h-px bg-zinc-900 hidden lg:block animate-draw-h" style="animation-delay: 3700ms;"></div>
      <div class="w-px bg-zinc-900 hidden lg:block animate-draw-v" style="height: 32px; animation-delay: 3900ms;"></div>

      <!-- Core Convergence Data Frame -->
      <div
        class="border border-zinc-900 bg-black text-white p-6 max-w-3xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-compile"
        style="animation-delay: 4100ms;"
      >
        <div>
          <span class="text-[9px] text-zinc-500 block tracking-widest">// CORE RUNTIME ARCHITECTURE</span>
          <h6 class="font-sans font-medium text-sm tracking-wide text-zinc-100">NETWORK-AGNOSTIC RUNTIME</h6>
        </div>
        <div class="flex gap-6 text-[11px] text-zinc-400 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
          <div><span class="text-white block">TRANSPORT</span> ADAPTIVE</div>
          <div><span class="text-white block">STATE</span> DETERMINISTIC</div>
        </div>
      </div>
    </div>

  </div>
</section>

<style>
  /* Pre-animation hidden state. Scoped to this section so it can never
     leak onto unrelated elements elsewhere in the app. */
  .creed-root :global(.animate-compile),
  .creed-root :global(.animate-draw-v),
  .creed-root :global(.animate-draw-h) {
    opacity: 0;
  }

  /* 1. Component Assembly */
  @keyframes compileBox {
    0%   { opacity: 0; transform: scale(0.97); filter: blur(3px); }
    100% { opacity: 1; transform: scale(1);    filter: blur(0); }
  }

  /* 2. Drop Lines */
  @keyframes drawVertical {
    0%   { opacity: 0; transform: scaleY(0); }
    100% { opacity: 1; transform: scaleY(1); }
  }

  /* 3. Structural Crossbeams */
  @keyframes drawHorizontal {
    0%   { opacity: 0; transform: scaleX(0); }
    100% { opacity: 1; transform: scaleX(1); }
  }

  /* transform-origin belongs on the element, not inside the keyframes */
  .creed-root :global(.animate-draw-v) { transform-origin: top; }
  .creed-root :global(.animate-draw-h) { transform-origin: center; }

  /* Trigger once the section enters the viewport */
  .is-live :global(.animate-compile) {
    animation: compileBox 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .is-live :global(.animate-draw-v) {
    animation: drawVertical 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .is-live :global(.animate-draw-h) {
    animation: drawHorizontal 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    .creed-root :global(.animate-compile),
    .creed-root :global(.animate-draw-v),
    .creed-root :global(.animate-draw-h) {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }
</style>
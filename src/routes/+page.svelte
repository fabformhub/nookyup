<script>
  let submitted = false;
  let email = '';

  function handleSubmit(e) {
    e.preventDefault();
    submitted = true;
  }
</script>

<svelte:head>
  <title>Nookyup — Coming Soon</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..600,0..100&family=Archivo:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen relative overflow-x-hidden bg-ink text-paper">

  <div class="grain"></div>
  <div class="vignette"></div>

  <!-- hairline frame, evokes a window edge -->
  <div class="fixed inset-4 md:inset-8 border border-white/10 pointer-events-none rounded-sm"></div>

  <main class="relative min-h-screen flex flex-col justify-between px-6 md:px-16 py-10 md:py-12">

    <!-- top row -->
    <header class="flex items-center justify-between fade-up d1">
      <span class="font-display text-lg md:text-xl tracking-tight">nookyup</span>
      <span class="eyebrow text-[10px] md:text-xs uppercase text-paper-60">opening its door soon</span>
    </header>

    <!-- center content -->
    <section class="max-w-2xl mt-16 md:mt-0">
      <p class="eyebrow text-xs md:text-sm uppercase fade-up d1 text-lamp">a place for one small corner</p>

      <h1 class="font-display mt-5 md:mt-6 text-[13vw] leading-[0.95] md:text-7xl md:leading-[0.98] fade-up d2 font-[480]">
        Find the seat<br />
        <span class="text-paper-60 italic font-[340]">that keeps</span><br />
        the light.
      </h1>

      <p class="mt-6 md:mt-8 text-base md:text-lg max-w-md leading-relaxed fade-up d3 text-paper-60">
        Nookyup helps you find, plan, and furnish the one corner of your home
        that's actually yours — a window seat, a reading chair, a spot for
        the tea to go cold in peace. We're building the first batch of nooks now.
      </p>

      <!-- email capture -->
      {#if !submitted}
        <form
          class="mt-9 md:mt-10 flex flex-col sm:flex-row gap-3 max-w-md fade-up d4"
          on:submit={handleSubmit}
        >
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            type="email"
            required
            bind:value={email}
            placeholder="you@somewhere-cozy.com"
            class="flex-1 bg-transparent border-b border-line py-3 text-sm md:text-base placeholder:text-sm placeholder:text-paper-60 focus:outline-none focus-visible:outline-2 focus-visible:outline-lamp focus-visible:outline-offset-2"
          />
          <button
            type="submit"
            class="bg-lamp text-ink px-6 py-3 text-sm font-medium rounded-full whitespace-nowrap transition-all hover:bg-lamp-light hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-lamp focus-visible:outline-offset-2"
          >
            Save my spot
          </button>
        </form>
        <p class="mt-3 text-xs fade-up d5 text-paper-30">No spam. One note, when the door opens.</p>
      {:else}
        <p class="mt-9 md:mt-10 text-sm md:text-base fade-up d4 text-lamp">
          You're on the list — see you soon.
        </p>
      {/if}
    </section>

    <!-- bottom row -->
    <footer class="flex items-end justify-between fade-up d5">
      <p class="text-xs text-paper-30">&copy; 2026 nookyup.com</p>
      <div class="flex gap-5 text-xs text-paper-30">
        <a href="/" class="hover:opacity-100 transition-opacity opacity-80">Instagram</a>
        <a href="/" class="hover:opacity-100 transition-opacity opacity-80">Notes</a>
      </div>
    </footer>
  </main>

  <!-- signature illustration: a lamplit window-nook corner, bottom right -->
  <svg
    class="fixed bottom-0 right-0 pointer-events-none opacity-90"
    width="360"
    height="360"
    viewBox="0 0 360 360"
    aria-hidden="true"
  >
    <!-- window frame -->
    <path
      class="thread-path"
      d="M 360 60 L 230 60 L 230 260 L 360 260"
      fill="none"
      stroke="rgba(241,236,226,0.3)"
      stroke-width="1.5"
    />
    <path
      class="thread-path"
      d="M 230 140 L 360 140"
      fill="none"
      stroke="rgba(241,236,226,0.3)"
      stroke-width="1.5"
    />

    <!-- window seat cushion, simple curved silhouette -->
    <path
      d="M 210 300 Q 210 270 245 268 L 355 268 Q 360 268 360 273 L 360 320 L 210 320 Z"
      fill="#1e2230"
      stroke="rgba(241,236,226,0.18)"
      stroke-width="1"
    />

    <!-- two soft cushions -->
    <ellipse cx="255" cy="278" rx="26" ry="16" fill="rgba(197,135,144,0.35)" stroke="rgba(241,236,226,0.15)" />
    <ellipse cx="310" cy="280" rx="30" ry="17" fill="rgba(232,171,85,0.18)" stroke="rgba(241,236,226,0.15)" />

    <!-- lamp glow -->
    <g class="lamp-glow">
      <circle cx="285" cy="150" r="55" fill="#e8ab55" opacity="0.12" style="filter: blur(18px)" />
      <circle cx="285" cy="150" r="26" fill="#e8ab55" opacity="0.55" style="filter: blur(10px)" />
    </g>
  </svg>
</div>

<style>
  .grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.05;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 90% 70% at 78% 88%, rgba(232, 171, 85, 0.1), transparent 60%),
      radial-gradient(ellipse 120% 90% at 50% 100%, rgba(0, 0, 0, 0.55), transparent 55%);
  }

  .eyebrow {
    letter-spacing: 0.22em;
  }

  .lamp-glow circle {
    animation: breathe 5.5s ease-in-out infinite;
    transform-origin: center;
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.55;
      transform: scale(1);
    }
    50% {
      opacity: 0.95;
      transform: scale(1.08);
    }
  }

  .thread-path {
    stroke-dasharray: 620;
    stroke-dashoffset: 620;
    animation: draw 2.4s 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  .fade-up {
    opacity: 0;
    transform: translateY(14px);
    animation: fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  .d1 {
    animation-delay: 0.15s;
  }
  .d2 {
    animation-delay: 0.35s;
  }
  .d3 {
    animation-delay: 0.55s;
  }
  .d4 {
    animation-delay: 0.75s;
  }
  .d5 {
    animation-delay: 0.95s;
  }
  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lamp-glow circle,
    .thread-path,
    .fade-up {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      stroke-dashoffset: 0 !important;
    }
  }
</style>

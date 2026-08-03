<script>
  import { enhance } from '$app/forms';
  let { data, form } = $props();

  let messages = $state(data.messages);
</script>

<div class="min-h-screen bg-slate-50 flex items-start justify-center px-4 py-16">
  <div class="w-full max-w-md">
    <h1 class="text-3xl font-bold text-slate-900 mb-6 text-center">
      Hello World
    </h1>

    <form
      method="POST"
      action="?/create"
      use:enhance={() => {
        return async ({ result, update }) => {
          if (result.type === 'success' && result.data?.success) {
            messages = [result.data.message, ...messages];
            await update({ reset: true });
          } else {
            await update();
          }
        };
      }}
      class="flex gap-2 mb-4"
    >
      <input
        type="text"
        name="content"
        placeholder="Type a message..."
        required
        class="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <button
        type="submit"
        class="rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition-colors"
      >
        Add
      </button>
    </form>

    {#if form?.error}
      <p class="text-red-600 text-sm mb-4">{form.error}</p>
    {/if}

    <ul class="space-y-2">
      {#each messages as message (message.id)}
        <li class="rounded-lg bg-white border border-slate-200 px-4 py-3 text-slate-800 shadow-sm">
          {message.content}
        </li>
      {/each}
    </ul>
  </div>
</div>

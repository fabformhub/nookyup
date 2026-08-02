<script>
  import { enhance } from '$app/forms';

  let { data, form } = $props();
</script>

<h1>Hello World</h1>

<form method="POST" action="?/create" use:enhance>
  <input type="text" name="content" placeholder="Type a message..." required />
  <button type="submit">Add</button>
</form>

{#if form?.error}
  <p style="color: red">{form.error}</p>
{/if}

<ul>
  {#each data.messages as message}
    <li>{message.content}</li>
  {/each}
</ul>

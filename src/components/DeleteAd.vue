<template>
  <div>
    <!-- Delete trigger -->
    <button
      @click="open = true"
      class="text-red-400 hover:text-red-300 transition"
    >
      Delete
    </button>

    <!-- Modal -->
    <Modal v-model="open">
      <h2 class="text-xl font-semibold text-pink-300 mb-4">
        Delete Ad
      </h2>

      <p class="text-slate-400 mb-6">
        This action cannot be undone. Are you sure?
      </p>

      <div class="flex justify-end gap-4">
        <button
          @click="open = false"
          class="px-4 py-2 rounded-lg border border-slate-700 text-slate-300"
        >
          Cancel
        </button>

        <form
          method="POST"
          :action="`/ads/${ad.id}/delete`"
        >
          <input type="hidden" name="_csrf" :value="csrfToken" />
          <button
            type="submit"
            class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  components: { Modal },
  props: {
    ad: {
      type: Object,
      required: true
    },
    csrfToken: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false
    };
  }
};
</script>

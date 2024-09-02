<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
      <button
        @click="closePopup"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h3 class="text-lg font-bold text-gray-700 mb-4">Pesan Iklan :</h3>
      <textarea
        class="text-black w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        rows="5"
        placeholder="Isi Pesan..."
        v-model="message"
      ></textarea>
      <div class="text-right">
        <button 
        @click="send()"
        class="text-black bg-blue-600 text-white px-4 py-2 rounded-md">
          Kirim
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message:''
    }
  },
  methods: {
    closePopup() {
      // Logic to close popup
      this.$emit("closeBroadcast");
    },
    send(){
      this.$emit('sendMessage', {message:this.message})
    }
  },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>

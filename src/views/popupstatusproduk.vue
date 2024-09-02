<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 flex space-x-8">
      <!-- Left Side: Product Image -->
      <div class="bg-gray-200 flex items-center justify-center w-48 h-48">
        <img :src="product.url_foto" alt="" />
      </div>

      <!-- Right Side: Product Information -->
      <div class="w-64">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold">Nama Produk</label>
          <input
            type="text"
            class="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model="product.nama_produk"
            placeholder="Botol"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold">Harga Produk</label>
          <input
            type="text"
            class="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model="product.harga_produk"
            placeholder="Harga"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold">Deskripsi</label>
          <textarea
            class="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            v-model="product.deskripsi_produk"
            placeholder="Barang oke"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold">Status</label>
          <div class="flex space-x-4 mt-1">
            <button
              @click="product.is_available = true"
              :class="[
                'px-4 py-2 rounded',
                product.is_available
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700',
              ]"
            >
              Tersedia
            </button>
            <button
              @click="product.is_available = false"
              :class="[
                'px-4 py-2 rounded',
                !product.is_available
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700',
              ]"
            >
              Terjual
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-bold">Foto Produk</label>

          <input
            type="file"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none"
            @change="uploadImage"
          />
        </div>

        <div class="flex justify-between">
          <button
            @click="saveProduct"
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
          <button
            @click="closeModal"
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>

    <!-- Close Button -->
    <button
      @click="closeModal"
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
  </div>
</template>

<script lang="ts">
import axios from "axios";
import type { PropType } from "vue";
import { apiProductUpdate } from "@/api/product";
import type { CreateProduct } from "@/types/product";
import { useSwal } from "@/composables/useSwal";
export default {
  props: {
    product: {
      type: Object as PropType<CreateProduct>,
      required: true,
    },
  },
  methods: {
    saveProduct() {
      // Logic to save the product
      apiProductUpdate(this.product)
        .then((res) => {
          if (!res.error) {
            useSwal().showAlert({
              title: "success",
              text: "Succes update product",
              icon: "success",
            });
          } else {
            useSwal().showAlert({
              title: "error",
              text: "Failed update product",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          useSwal().showAlert({
            title: "error",
            text: "Failed update product",
            icon: "error",
          });
        });
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
    async uploadImage(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      const timestamp = Math.floor(new Date().getTime() / 1000);

      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("api_key", "726339783177776"); // Replace with your actual Cloudinary API key
          formData.append("timestamp", timestamp.toString());
          formData.append("upload_preset", "public");

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/drdtarkab/image/upload`, // Replace with your actual Cloudinary cloud name
            formData
          );

          console.log(response.data);
          this.product.url_foto = response.data.url; // Use Cloudinary's secure URL
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>

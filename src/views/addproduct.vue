<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Barang Rongsok</h1>
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center"
          >
            <h1 v-if="user">
              {{
                user?.name_awal[0].toUpperCase() +
                user?.nama_akhir[0].toUpperCase()
              }}
            </h1>
          </div>
          <span v-if="user" class="text-black"
            >{{ user.name_awal }} {{ user.nama_akhir }}</span
          >
        </button>
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <button
          @click="logout"
            class="rounded-lg block px-4 py-2 text-gray-700 hover:bg-blue-50"
            >Keluar</button
          >
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-blue-500 text-white p-4 flex justify-around">
      <div class="text-center cursor-pointer"
      @click="() => this.$router.push('beranda')">
        <span class="block">🏠</span>
        <span>Beranda</span>
      </div>
      <div class="text-center cursor-pointer"
      @click="() => this.$router.push('halamanchat')">
        <span class="block">💬</span>
        <span>Obrolan</span>
      </div>
      <div class="text-center cursor-pointer"
      @click="() => this.$router.push('halamandisukaiuser')">
        <span class="block">❤️</span>
        <span>Disukai</span>
      </div>
      <div class="text-center cursor-pointer"
      @click="() => this.$router.push('halamanprofile')">
        <span class="block">👤</span>
        <span>Profil</span>
      </div>
    </nav>

    <!-- Add Product Form -->
    <div class="p-6 mt-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg flex">
      <div class="w-1/2 flex items-center justify-center">
        <div
          class="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg"
        >
          <img :src="form.url_foto" alt="" class="max-h-48"/>
        </div>
      </div>
      <div class="w-1/2 pl-8">
        <h2 class="text-2xl font-semibold text-blue-600 mb-6">Tambah Produk</h2>

        <div class="mb-4">
          <label for="product-name" class="block text-sm text-gray-700 mb-2"
            >Nama Produk</label
          >
          <input
            id="product-name"
            type="text"
            class="text-black w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Besi"
            v-model="form.nama_produk"
          />
        </div>

        <div class="mb-4">
          <label for="product-price" class="block text-sm text-gray-700 mb-2"
            >Harga Produk</label
          >
          <input
            id="product-price"
            type="number"
            class="text-black w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Harga"
            v-model="form.harga_produk"
          />
        </div>

        <div class="mb-4">
          <label
            for="product-description"
            class="block text-sm text-gray-700 mb-2"
            >Deskripsi</label
          >
          <input
            id="product-description"
            type="text"
            class="text-black w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Barang oke"
            v-model="form.deskripsi_produk"
          />
        </div>

        <div class="mb-4">
          <label for="product-category" class="block text-sm text-gray-700 mb-2"
            >Kategori</label
          >
          <select
            id="product-category"
            class="text-black w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            v-model="form.kategori_produk"
          >
            <option>Semua Kategori</option>
            <option>Logam</option>
            <option>Plastik</option>
            <option>Kertas</option>
          </select>
        </div>

        <div class="mb-6">
          <label for="product-photo" class="block text-sm text-gray-700 mb-2"
            >Foto Produk</label
          >
          <input
            id="product-photo"
            type="file"
            class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            @change="uploadImage"
          />
        </div>

        <div class="flex justify-between">
          <button
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
            @click="createProduct"
          >
            Tambahkan
          </button>
          <button
          @click="() => $router.go(-1)"
            class="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-400 transition duration-200"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer class="bg-gray-100 py-6 mt-12">
      <div class="container mx-auto flex justify-between">
        <div>
          <h4 class="text-gray-700 font-bold">Barang Rongsok</h4>
          <p class="text-gray-600">
            Kami menyediakan layanan pengumpulan dan daur ulang barang bekas
            seperti logam, plastik, dan elektronik. Dukung upaya pelestarian
            lingkungan dengan mendaur ulang barang-barang yang tidak lagi Anda
            gunakan. Bersama, kita bisa menciptakan dunia yang lebih bersih dan
            berkelanjutan.
          </p>
        </div>
        <div>
          <h4 class="text-gray-700 font-bold">Kontak Kami</h4>
          <div class="flex space-x-4 mt-2">
            <a href="#" class="text-gray-500 hover:text-gray-700">FB</a>
            <a href="#" class="text-gray-500 hover:text-gray-700">IG</a>
            <a href="#" class="text-gray-500 hover:text-gray-700">TW</a>
          </div>
        </div>
      </div>
      <div class="text-center text-gray-500 mt-6">© 2024 - Barang Rongsok</div>
    </footer>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { apiProductCreate } from "@/api/product";
import { useSwal } from "@/composables/useSwal";
import { cloudinary } from "@/plugins/cloudinary";
import axios from "axios";
import CryptoJS from "crypto-js";
export default {
  setup() {
    const authStore = useAuthStore();
    const { user, logout } = authStore;
    return {
      authStore,
      user, logout
    };
  },
  data() {
    return {
      dropdownOpen: false,
      form: {
        nama_produk: "",
        harga_produk: null,
        deskripsi_produk: "",
        kategori_produk: "",
        url_foto: "",
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    generateSignature(timestamp) {
      const secret = "atOByUVlsiYPkRHXcX7SGZSuvzYs"; // Replace with your actual Cloudinary API secret
      const stringToSign = `timestamp=${timestamp}${secret}`;
      return CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);
    },

    async uploadImage() {
      const file = event.target.files[0];
      const timestamp = Math.floor(new Date().getTime() / 1000); // Round down to get a proper integer timestamp
      const signature = this.generateSignature(timestamp);

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
          this.form.url_foto = response.data.url; // Use Cloudinary's secure URL
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    createProduct() {
      apiProductCreate(this.form)
        .then((res) => {
          if (!res.error) {
            useSwal()
              .showAlert({
                title: "Success",
                text: "success create new product",
                icon: "success",
              })
              .then(() => {
                window.location.reload();
              });
          } else {
            useSwal().showAlert({
              title: "Failed",
              text: "failed create new product",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          useSwal().showAlert({
            title: "Failed",
            text: "failed create new product",
            icon: "error",
          });
        });
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header
      class="bg-blue-600 text-white p-4 flex justify-between items-center"
    >
      <h1 class="text-xl font-bold">Barang Rongsok</h1>
      <div>
        <button 
        @click="() => this.$router.push('register')"
        class="bg-white text-blue-600 px-4 py-2 rounded mr-2 cursor-pointer">
          Daftar
        </button>
        <button 
        @click="() => this.$router.push('login')"
        class="bg-white text-blue-600 px-4 py-2 rounded">Masuk</button>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-blue-500 text-white p-4 flex justify-around">
      <div @click="() => this.$router.push('login')" class="text-center">
        <span class="cursor-pointer block">🏠</span>
        <span>Beranda</span>
      </div>
      <div @click="() => this.$router.push('login')" class="text-center">
        <span class="cursor-pointer block">💬</span>
        <span>Obrolan</span>
      </div>
      <div @click="() => this.$router.push('login')" class="text-center">
        <span class="cursor-pointer block">❤️</span>
        <span>Disukai</span>
      </div>
      <div @click="() => this.$router.push('login')" class="text-center">
        <span class="cursor-pointer block">👤</span>
        <span>Profil</span>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="p-8">
      <!-- Search Bar -->
      <div class="flex justify-between items-center mb-8">
        <input
        v-model="query.name"
          type="text"
          placeholder="Pencarian nama barang..."
          class="text-black border border-gray-300 rounded w-full p-2 mr-4"
        />
        <select class="text-black border border-gray-300 rounded p-2"
        v-model="query.category">
          <option value="" selected>Semua Kategori</option>
          <option value="logam">Logam</option>
          <option value="plastik">Plastik</option>
          <option value="kertas">Kertas</option>
        </select>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-3 gap-8">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="bg-white border border-gray-300 rounded-lg shadow-lg p-4"
        >
          <div class="h-40 bg-gray-200 mb-4 flex items-center justify-center">
            <img :src="product.url_foto" alt="" class="max-h-40" >
          </div>
          <p class="text-black">{{ product.nama_produk }}</p>
          <p class="text-black mb-4">Rp. {{ product.harga_produk }}</p>
          <button 
          @click="() => this.$router.push('login')"
          class="bg-blue-600 text-white w-full py-2 rounded">
            Detail
          </button>
          <button
          @click="() => this.$router.push('login')"
            class="mt-2 w-full py-2 rounded text-blue-600 border border-blue-600"
          >
            <span v-if="!product.liked">❤️</span>
          </button>
        </div>
      </div>

      <!-- Add Product Button -->
      
</main>
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
import {apiProductGet,  } from '@/api/product'
export default {
  setup() {
    const authStore = useAuthStore();
    const { user, logout } = authStore;
    return { user, logout };
  },
  data() {
    return {
      products: [], // Dummy data for products
      dropdownOpen: false,
      query: {
        name:null,
        category: "",
        is_available:null,
        all:'true'
      },
      searchDebounce: undefined
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    loadProduct() {
      apiProductGet(this.query)
      .then((res) => {
        if(!res.error) {
          this.products = res.data
        }
      })
    },
    
  },
  mounted() {
    this.loadProduct()
  },
  watch: {
    'query.name'() {
      clearTimeout(this.searchDebounce)
      this.searchDebounce = setTimeout(() => {
        this.loadProduct()
      }, 500);
    },
    'query.category'(){
      this.loadProduct()
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>

<template>
  <div class="min-h-screen  w-full">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Barang Rongsok</h1>
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center"
          >
            <h1>
              {{
                user.name_awal[0].toUpperCase() +
                user.nama_akhir[0].toUpperCase()
              }}
            </h1>
          </div>
          <span class="text-black"
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
          @click="() => this.$router.push('detailbarang?produk_id=' + product.produk_id)"
          class="bg-blue-600 text-white w-full py-2 rounded">
            Detail
          </button>
          <button
          :disabled="product.liked"
          @click="addLiked(product.produk_id)"
            class="mt-2 w-full py-2 rounded text-blue-600 border border-blue-600"
          >
            <span v-if="!product.liked">❤️</span>
            <span v-else>Disukai</span>
          </button>
        </div>
      </div>

      <!-- Add Product Button -->
      <!-- <div class="text-center mt-8">
        <button class="bg-blue-600 text-white py-2 px-8 rounded"
        >
          Tambah Produk
        </button>
      </div> -->
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
import {apiProductGet, apiProductLikedCreate, apiProductLikedGet } from '@/api/product'
import {apiUserLogout} from '@/api/auth'
import {useSwal} from '@/composables/useSwal'
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
    logoutUser() {
      apiUserLogout(this.user.user_id)
      .then((res) => {
        if(!res.error) {
          this.logout()
          this.$router.push('/login')
        }
      })
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    loadProduct() {
      apiProductGet(this.query)
      .then((res) => {
        if(!res.error) {
          this.products = res.data
          this.loadLiked()
        }
      })
    },
    loadLiked() {
      apiProductLikedGet()
      .then((res) => {
        if(!res.error) {
          res.data.forEach((p) => {
            const findIndex = this.products.findIndex((pr) => pr.produk_id == p.produk_id)
            if(findIndex > -1) this.products[findIndex].liked = true
          })
        }
      })
    },
    addLiked(produk_id){
      apiProductLikedCreate(produk_id)
      .then((res) => {
        if(!res.error) {
          useSwal().showAlert({
            title:'Success',
            text:'Success added to like product',
            icon:'success'
          })
        }else {
          useSwal().showAlert({
            title:'Failed',
            text:'Failed added to like product',
            icon:'error'
          })
        }
      })
      .catch((err) => {
        console.log(err)
        useSwal().showAlert({
            title:'Failed',
            text:'Failed added to like product',
            icon:'error'
          })
      })
      .finally(() => this.loadProduct())
    }
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

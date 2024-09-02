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
    <!-- Liked Items Section -->
    <div class="flex-grow p-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Liked Item Card -->
        <div v-for="item in likedItems" :key="item.id" class="bg-white border rounded-lg shadow-lg overflow-hidden">
          <div class="bg-gray-200 h-48 flex items-center justify-center">
          <img :src="item.product.url_foto" alt="" class="max-h-48">
          </div>
          <div class="p-4">
            <div class="text-lg font-medium text-gray-700 mb-2">
              {{ item.product.nama_produk }}
            </div>
            <div class="text-sm text-gray-500 mb-4">Rp. {{ item.product.harga_produk }}</div>
            <div class="flex gap-x-2">
              <button 
              @click="detailProduct(item.product.produk_id)"
              class="bg-blue-600 text-white px-4 py-2 rounded">
                Detail
              </button>
              <button
              @click="deleteLiked(item.product.produk_id)"
              class="bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
        <!-- Repeat the card for each liked item -->
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
import { apiProductLikedGet, apiProductLikedDelete } from '@/api/product'
import { useSwal } from '@/composables/useSwal'
import {useAuthStore} from '@/stores/auth'
export default {
  setup() {
    const authStore = useAuthStore();
    const { user, logout } = authStore;
    return { user, logout };
  },
  data() {
    return {
      likedItems: [
        
      ],
      dropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    detailProduct(produk_id) {
      this.$router.push('detailbarang?produk_id=' + produk_id)
    },
    getLikedProduct() {
      apiProductLikedGet()
        .then((res) => {
          if (!res.error) {
            this.likedItems = res.data
          }
        })
    },
    deleteLiked(produk_id) {
      useSwal().showAlert({
        title: 'Delete',
        text: 'Delete Liked Product?',
        icon: 'warning',
        showCancelButton: true
      })
        .then((res) => {
          if (res.isConfirmed) {
            apiProductLikedDelete(produk_id)
              .then((res) => {
                if (!res.error) {
                  useSwal().showAlert({
                    title: 'Success',
                    text: 'Success Delete Liked Product?',
                    icon: 'success',
                  })
                } else {
                  useSwal().showAlert({
                    title: 'Error',
                    text: 'Error Delete Liked Product?',
                    icon: 'error',
                  })
                }
              })
              .catch((err) => {
                console.log(err)
                useSwal().showAlert({
                  title: 'Error',
                  text: 'Error Delete Liked Product?',
                  icon: 'error',
                })
              })
              .finally(() => this.getLikedProduct())
          }
        })
    }
  },
  mounted() {
    this.getLikedProduct()
  }
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>

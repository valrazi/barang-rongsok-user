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

    <!-- Product Detail -->
    <div class="p-6 mt-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg flex">
      <div class="w-1/2 flex items-center justify-center">
        <div class="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
          <img :src="product.url_foto" alt="" class="max-h-64">
        </div>
      </div>
      <div class="w-1/2 pl-8">
        <h2 class="text-2xl font-semibold text-blue-600 mb-4">{{ product.nama_produk }}</h2>
        <p class="text-xl text-gray-700 mb-4">Rp.{{ product.harga_produk }}</p>
        <p class="text-gray-500 mb-4">{{ product.is_available ? "Tersedia" : "Terjual" }}</p>
        <p class="bg-gray-200 p-4 rounded-lg text-gray-700 mb-6">
          {{ product.deskripsi_produk }}
        </p>

        <div class="flex justify-between">
          <button
          @click="sendChat(product.user_id, product.produk_id)"
          v-if="user.user_id != product.user_id"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200">
            Chat Penjual
          </button>
          <button
          @click="() => this.$router.go(-1)"
            class="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-400 transition duration-200">
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
import { apiProductGetDetail } from '@/api/product'
import {useAuthStore} from '@/stores/auth'
export default {
  setup() {
    const {user, logout} = useAuthStore()
    return {
      user, logout
    }
  },
  data() {
    return {
      dropdownOpen: false,
      product: {}
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    loadDetail() {
      apiProductGetDetail(this.$route.query.produk_id)
        .then((res) => {
          if (!res.error) {
            this.product = res.data
          }
        })
    },
    sendChat(for_id, product_id) {
      this.$router.push(`halamanchatuser?for=${for_id}&product_id=${product_id}&type=product`)
    },
  },
  mounted() {
    this.loadDetail()
  }
};
</script>

<style scoped></style>

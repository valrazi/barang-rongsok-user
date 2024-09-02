<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Barang Rongsok</h1>
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2">
          <div
          v-if="authStore.user"
            class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center"
          >
            <h1>
              {{
                authStore.user.name_awal[0].toUpperCase() +
                authStore.user.nama_akhir[0].toUpperCase()
              }}
            </h1>
          </div>
          <span class="text-black"
            >{{ authStore.user.name_awal }} {{ authStore.user.nama_akhir }}</span
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

    <!-- Profile Section -->
    <div class="flex flex-grow p-8">
      <!-- Profile Picture and Info -->
      <div class="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
        <div class="mb-6">
          <div class="w-48 h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center text-4xl text-white"
          v-if="user.name_awal">{{ user.name_awal[0].toUpperCase() + user.nama_akhir[0].toUpperCase() }}</div>
        </div>
        <div class="space-y-2">
          <div>
            <label class="block text-gray-600">Nama</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
              :value="`${user.name_awal } ${user.nama_akhir}`"
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-600">Email</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded"
              :value="user.email"
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-600">Alamat</label>
            <textarea
              class="w-full p-2 border border-gray-300 rounded"
              disabled
            >{{ user.alamat }}</textarea
            >
          </div>
        </div>
        <div class="mt-6 flex space-x-2">
          <button
            class="flex-grow py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Chat Penjual
          </button>
          <button
          @click="() => this.$router.go(-1)"
            class="flex-grow py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Kembali
          </button>
        </div>
      </div>

      <!-- Products Section -->
      <div class="flex-grow p-4">
        <!-- Category Filter -->
        <div class="flex justify-between mb-4">
          <div>
            <label for="category" class="block mb-2 text-gray-600"
              >Kategori</label
            >
            <select
              id="category"
              class="text-black p-2 border border-gray-300 rounded"
            >
              <option value="semua">Semua Kategori</option>
              <option value="logam">Logam</option>
              <option value="plastik">Plastik</option>
              <option value="kertas">Kertas</option>
            </select>
          </div>
        </div>
        <!-- Product Cards -->
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="i in products"
            :key="i"
            class="p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <div class="w-full h-32 bg-gray-300 rounded mb-4">
              <img :src="i.url_foto" class="max-h-32" alt="">
            </div>
            <div class="text-center">
              <div class="text-gray-700">{{ i.nama_produk }}</div>
              <div class="text-gray-600">Rp.{{ i.harga_produk }}</div>
              <button
                class="mt-2 py-1 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                @click="() => this.$router.push('detailbarang?produk_id=' + i.produk_id)"
              >
                Detail
              </button>
            </div>
          </div>
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
import {useAuthStore} from '@/stores/auth'
import {apiUserGetDetail} from '@/api/auth'
import {apiProductGet} from '@/api/product'
export default {
  setup(){
    const authStore = useAuthStore()
    
    const { logout } = useAuthStore()
    return { logout, authStore }
  },
  data() {
    return {
      products: [], // Dummy data for products
      dropdownOpen: false,
      user: {},
      query: {
        name: null,
        category: '',
        user_id: this.$route.query.user_id,
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    loadUser() {
      apiUserGetDetail(this.query.user_id)
      .then((res) => {
        if(!res.error) {
          this.user = res.data
        }
      })
    },
    loadProduct() {
      apiProductGet(this.query)
      .then((res) => {
        if(!res.error) {
          this.products = res.data
        }
      })
    }
  },
  mounted() {
    this.loadProduct()
    this.loadUser()
    if(this.authStore.user.user_id == this.query.user_id) {
      this.$router.push('halamanprofile')
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>

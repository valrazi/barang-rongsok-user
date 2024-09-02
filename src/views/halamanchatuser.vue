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

    <!-- Chat Section -->
    <div class="flex-grow p-8">
      <!-- Chat Header -->
      <div class="flex items-center bg-gray-100 p-4 rounded-t-lg" v-if="receipent.name_awal">
        <div class="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center text-white">
          <h1>{{ `${receipent.name_awal[0].toUpperCase()}${receipent.nama_akhir[0].toUpperCase()}` }}</h1>
        </div>
        <div>
          <div class="text-lg font-medium text-gray-700">{{ receipent.name_awal + " " + receipent.nama_akhir }}</div>
          <div class="text-sm text-gray-500">
            <span class="text-green-500 text-sm" v-if="receipent.is_online">Aktif</span>
            <span class="text-red-500 text-sm" v-else>Tidak Aktif</span>

          </div>
        </div>
      </div>

      <!-- Chat Body -->
      <div class="flex-grow bg-gray-100 p-4 rounded-b-lg">
        <div class="text-center text-sm text-red-600 bg-white p-2 rounded mb-4">
          Peringatan!!!<br />
          Hati-hati dengan melakukan transaksi secara online, salah satu
          transaksi sudah berlangsung.
        </div>
        <div class="space-y-4 overflow-y-scroll max-h-72" ref="chatContainer">
          <div v-for="m in arrMesages">
            <div class="flex justify-end" v-if="m.sender_id == user_id">
              <div class="bg-gray-300 text-gray-700 p-3 rounded-lg max-w-xs">
                {{ m.message }}
              </div>
            </div>

            <div class="flex justify-start" v-else>
              <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                {{ m.message }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full" v-if="product_detail">
              <div class="bg-gray-200 border border-gray-400 mt-4 text-gray-700 p-3 rounded-lg w-1/4 flex gap-x-4 flex-wrap">
                <img :src="product_detail.url_foto" class="max-w-20" alt="">
                <div>
                  <h1>{{ product_detail.nama_produk }}</h1>
                  <h1>Rp. {{ product_detail.harga_produk }}</h1>
                </div>
              </div>
            </div>

      <!-- Chat Input -->
      <div class="flex items-center bg-gray-100 p-4 rounded-lg mt-4">
        

        <input type="text" class="text-black flex-grow p-2 border border-gray-300 rounded-l-lg"
          placeholder="Ketik pesan..." v-model="message" />
        <button @click="sendMessage()" class="px-4 bg-blue-600 text-white rounded-r-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7-3 7 3M5 12l7-3 7 3m-7 5l7-3 7 3" />
          </svg>
        </button>
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
import { io } from "socket.io-client";
import { useAuthStore } from '@/stores/auth'
import { apiProductGetDetail } from '@/api/product'
import { apiUserGetDetail } from '@/api/auth' 

export default {
  setup() {
    const { user, logout } = useAuthStore()
    return { user, logout }
  },
  data() {
    return {
      dropdownOpen: false,
      socket: io("https://chat-rongsok.onrender.com"),
      user_id: this.user.user_id,
      to_id: this.$route.query.for,
      message: "",
      room_id: "",
      type: this.$route.query.type ?? null,
      product_id: this.$route.query.product_id ?? null,
      arrMesages: [],
      product_detail: null,
      receipent: {}
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    sendMessage() {
      this.socket.emit("private_message", {
        from_user_id: this.user_id,
        to_user_id: this.to_id,
        message: this.message,
      });
      this.message = "";
      this.product_detail = null
    },
    loadReceipent() {
      apiUserGetDetail(this.to_id)
        .then((res) => {
          if (!res.error) {
            this.receipent = res.data
          }
        })
    }
  },
  mounted() {
    this.socket = io("https://chat-rongsok.onrender.com");

    this.loadReceipent()
    setInterval(() => {
      this.loadReceipent()
    }, 10000);

    this.socket.emit("authenticate", {
      user_id: this.user_id,
    });

    this.socket.emit("private_message", {
      to_user_id: this.to_id,
      from_user_id: this.user_id,
      message: "",
    });

    console.log(this.type)
    console.log()
    if (this.type && this.type.toString() == 'product' && this.product_id) {
      apiProductGetDetail(this.product_id)
        .then((res) => {
          console.log('ah ahah')
          if (!res.error) {
            this.product_detail = res.data
            this.message = `Apakah Produk ${res.data.nama_produk} masih tersedia?`
          }
        })
    }

    this.socket.on("private_message", (data) => {
      if (data.allMessage.length) {
        this.arrMesages = data.allMessage;

        this.$nextTick(() => {
          const container = this.$refs.chatContainer;
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        });
      }
    });
  },
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>

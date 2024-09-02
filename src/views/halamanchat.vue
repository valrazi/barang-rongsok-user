<template>
  <PopupBroadcast v-if="showBroadcast" 
  @close-broadcast="toggleBroadcast"
  @send-message="sendMessage"  />
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

    <!-- Chat List -->
    <div class="p-6 mt-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div class="mb-6">
        <div class="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Pencarian nama akun..."
            class="text-black w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            v-model="name"
          />
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 2a8 8 0 105.293 14.293l5.658 5.658 1.414-1.414-5.658-5.658A8 8 0 0010 2zm0 2a6 6 0 11-6 6 6.007 6.007 0 016-6z"
              />
            </svg>
          </button>

          <button
            @click="toggleBroadcast"
            class="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            <h1>Iklan</h1>
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="i in userList" :key="i.user_id" class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white cursor-pointer"
          @click="() => this.$router.push('halamanprofileuser?user_id=' + i.user_id)">
            <h1>{{ `${i.name_awal[0].toUpperCase()}${i.nama_akhir[0].toUpperCase()}`}}</h1>
          </div>
          <div class="flex flex-col">
            <span 
            @click="sendChat(i.user_id)"
            class="text-gray-700 font-semibold cursor-pointer">{{ `${i.name_awal} ${i.nama_akhir}`}} </span>
            <span class="text-green-500 text-sm" v-if="i.is_online">Aktif</span>
            <span class="text-red-500 text-sm" v-else>Tidak Aktif</span>
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
import PopupBroadcast from "@/components/popupchatuser.vue";
import { apiUserGet } from "@/api/auth";
import {useAuthStore} from '@/stores/auth'
import { io } from "socket.io-client";
import {useSwal} from '@/composables/useSwal'
export default {
  setup() {
    const authStore = useAuthStore();
    const { user, logout } = authStore;
    return { user, logout };
  },
  components: {
    PopupBroadcast,
  },
  data() {
    return {
      dropdownOpen: false,
      showBroadcast: false,
      userList: [],
      userDebounce: undefined,
      name:null,
      socket: io('https://chat-rongsok.onrender.com')
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleBroadcast() {
      this.showBroadcast = !this.showBroadcast;
    },
    loadUser() {
      apiUserGet(this.name)
      .then((res) => {
        if(!res.error) this.userList = res.data
      })
    },
    sendChat(to) {
      this.$router.push(`halamanchatuser?for=${to}`)
    },
    sendMessage(data) {
      const {message} = data
      this.socket.emit('broadcast', {from_user_id:this.user.user_id, message})
      useSwal().showAlert({
        text:'Message Broadcasted!',
        icon:'info'
      })
      this.showBroadcast = !this.showBroadcast
    }
  },
  mounted() {
    this.loadUser()
    setInterval(() => {
      this.loadUser()
    }, 5000);
    
  },
  watch: {
    name(){
      clearTimeout(this.userDebounce)
      this.userDebounce = setTimeout(() => {
        this.loadUser()
      }, 500);
    }
  }
};
</script>

<style scoped></style>

<template>
  <popupstatusproduk :product="product" v-if="modal.product" @close="closeModal()" />
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

    <!-- Profile Section -->
    <div class="p-8 flex-grow">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Info -->
        <div class="lg:col-span-1 bg-white border rounded-lg shadow-lg p-6">
          <div class="bg-gray-200 h-24 w-24 rounded-full mx-auto flex items-center justify-center">
            <span class="text-gray-400 text-xl"><span>{{ user.name_awal[0].toUpperCase() }} {{
    user.nama_akhir[0].toUpperCase() }}</span></span>
          </div>
          <div class="mt-4 space-y-4">
            <div>
              <label class="block text-gray-700 font-bold">Nama Depan</label>
              <input type="text" disabled
                class="bg-gray-300 text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                v-model="user.name_awal" />
            </div>
            <div>
              <label class="block text-gray-700 font-bold">Nama Akhir</label>
              <input type="text" disabled
                class="bg-gray-300 text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                v-model="user.nama_akhir" />
            </div>



            <div>
              <label class="block text-gray-700 font-bold">Email</label>
              <input type="email" disabled
                class="bg-gray-300 text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                v-model="user.email" />
            </div>

            <div>
              <label class="block text-gray-700 font-bold">Alamat</label>
              <input type="text"
                class="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                v-model="alamat" />
            </div>


            <button @click="updateProfile" class="mt-4 w-full bg-blue-600 text-white py-2 rounded">
              Update
            </button>
          </div>
        </div>

        <!-- Liked Items Section -->
        <div class="lg:col-span-2 bg-white border rounded-lg shadow-lg p-6">
          <button @click="tambahProduct()" class="my-4 bg-blue-600 text-white px-4 py-2 rounded">
                    + Tambah Produk
                  </button>
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-700">Produk</h2>
            <select v-model="query.category"
              class="text-black block w-48 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option value="" selected>Semua Produk</option>
              <option value="sold">Produk Terjual</option>
              <option value="available">Produk Tersedia</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Product Item -->
            <div v-for="item in products" :key="item.produk_id"
              class="bg-white border rounded-lg shadow-lg overflow-hidden">
              <div class="bg-gray-200 h-48 flex items-center justify-center">
                <img :src="item.url_foto" alt="" class="max-h-48 object-contain" />
              </div>
              <div class="p-4">
                <div class="text-sm font-medium text-gray-400 mb-2">
                  {{ item.kategori_produk }}
                </div>
                <div class="text-lg font-medium text-gray-700 mb-2">
                  {{ item.nama_produk }}
                </div>
                <div class="text-sm text-gray-500 mb-4">
                  Rp.{{ item.harga_produk }}
                </div>
                <div class="w-full flex gap-x-2">
                  <button @click="showEdit(item)" class="bg-blue-600 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                  <button @click="deleteItem(item.produk_id)" class="bg-red-600 text-white px-4 py-2 rounded">
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <!-- Repeat the card for each product -->
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
import Popupstatusproduk from "./popupstatusproduk.vue";
import popupstatusproduk from "./popupstatusproduk.vue";
import { apiProductGet, apiProductDelete } from "@/api/product";
import { apiUserUpdate } from '@/api/auth'
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from 'pinia'
import { useSwal } from '@/composables/useSwal'

export default {
  setup() {
    const { user } = storeToRefs(useAuthStore());
    const {logout} = useAuthStore()
    return {
      user, logout
    };
  },
  components: {
    popupstatusproduk,
    Popupstatusproduk,
  },
  methods: {
    closeModal() {
      this.modal.product = false;
      this.getProduct()
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    getProduct() {
      apiProductGet(this.query).then((res) => {
        if (!res.error) {
          this.products = res.data;
          console.log(this.products);
        }
      });
    },
    showEdit(product) {
      this.modal.product = true;
      this.product = product;
    },
    updateProfile() {
      apiUserUpdate(this.alamat)
        .then((res) => {
          if (!res.error) {
            this.user.alamat = res.data.alamat
            useSwal().showAlert({
              title: 'Success',
              icon: 'success',
              text: 'Success Update Profile'
            })
          } else {
            useSwal().showAlert({
              title: 'Error',
              icon: 'error',
              text: 'Failed Update Profile'
            })
          }
        })
        .catch((err) => {
          console.log(err)
          useSwal().showAlert({
              title: 'Error',
              icon: 'error',
              text: 'Failed Update Profile'
            })
        })
    },
    tambahProduct() {
      this.$router.push('/addproduct')
    },
    deleteItem(produk_id) {
      useSwal().showAlert({
        title: 'Delete Product?',
        icon: 'warning',
        text: 'Delete Product',
        showCancelButton: true
      })
        .then((res) => {
          if (res.isConfirmed) {
            apiProductDelete(produk_id)
              .then((res) => {
                if (!res.error) {
                  useSwal().showAlert({
                    title: 'Success',
                    icon: 'success',
                    text: 'Success Delete Product'
                  })
                } else {
                  useSwal().showAlert({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed Delete Product'
                  })
                }
              })
              .catch((err) => {
                console.log(err)
                useSwal().showAlert({
                  title: 'Error',
                  icon: 'error',
                  text: 'Failed Delete Product'
                })
              })
              .finally(() => this.getProduct())
          }
        })
    }
  },
  mounted() {
    this.getProduct();
    this.alamat = this.user.alamat
  },
  watch: {
    "query.category"(newVal) {
      console.log(newVal);
    },
  },
  data() {
    return {
      products: [],
      product: null,
      modal: {
        product: false,
      },
      dropdownOpen: false,
      query: {
        name: null,
        category: '',
        user_id: this.user.user_id,
      },
      alamat: '',
    };
  },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 class="text-center text-2xl font-bold mb-8 text-blue-600">
        Daftar Akun
      </h2>
      <div>
        <!-- Nama Pertama dan Nama Terakhir -->
        <div class="flex mb-4 space-x-2">
          <div class="w-1/2">
            <label for="first-name" class="block mb-1 text-gray-700"
              >Nama Pertama</label
            >
            <input
              type="text"
              id="first-name"
              class="text-black w-full p-2 border border-gray-300 rounded"
              placeholder="Nama Pertama"
              v-model="form.name_awal"
            />
          </div>
          <div class="w-1/2">
            <label for="last-name" class="block mb-1 text-gray-700"
              >Nama Terakhir</label
            >
            <input
              type="text"
              id="last-name"
              class="text-black w-full p-2 border border-gray-300 rounded"
              placeholder="Nama Terakhir"
              v-model="form.nama_akhir"
            />
          </div>
        </div>
        <!-- Alamat -->
        <div class="mb-4">
          <label for="address" class="block mb-1 text-gray-700">Alamat</label>
          <textarea
            id="address"
            class="text-black w-full p-2 border border-gray-300 rounded"
            placeholder="Masukan Alamat Anda"
            v-model="form.alamat"
          ></textarea>
        </div>
        <!-- Alamat Email -->
        <div class="mb-4">
          <label for="email" class="block mb-1 text-gray-700"
            >Alamat Email</label
          >
          <input
            type="email"
            id="email"
            class="text-black w-full p-2 border border-gray-300 rounded"
            placeholder="Masukan Email Anda"
            v-model="form.email"
          />
        </div>
        <!-- Kata Sandi -->
        <div class="mb-4">
          <label for="password" class="block mb-1 text-gray-700"
            >Kata Sandi</label
          >
          <input
            type="password"
            id="password"
            class="text-black w-full p-2 border border-gray-300 rounded"
            placeholder="Masukan Kata Sandi Anda"
            v-model="form.katasandi"
          />
        </div>
        <!-- Pertanyaan Keamanan -->
        <div class="mb-4">
          <label for="security-question" class="block mb-1 text-gray-700"
            >Pertanyaan Keamanan</label
          >
          <select
            id="security-question"
            class="text-black w-full p-2 border border-gray-300 rounded"
            v-model="form.pertanyaan_keamanan"
          >
            <option value="parent-name">Nama Orang Tua</option>
            <option value="favorite-animal">Nama Hewan Favorit</option>
            <option value="favorite-color">Nama Warna Favorit</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="security-answer" class="block mb-1 text-gray-700"
            >Jawaban</label
          >
          <input
            type="text"
            id="security-answer"
            class="text-black w-full p-2 border border-gray-300 rounded"
            placeholder="Masukan Jawaban Anda"
            v-model="form.jawaban_keamanan"
          />
        </div>
        <!-- Foto Profil -->
        
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="register()"
        >
          Daftar
        </button>
      </div>
      <!-- Sudah Memiliki Akun -->
      <p class="text-center mt-4 text-sm text-gray-600">
        Sudah Memiliki Akun?
        <span
        @click="() => this.$router.push('login')"
        href="#" class="text-blue-600 hover:underline">Masuk Sekarang</span>
      </p>
    </div>
  </div>
</template>

<script>
import { apiAuthRegister } from "@/api/auth";
import { useSwal } from "@/composables/useSwal";
export default {
  data() {
    return {
      form: {
        name_awal: "",
        nama_akhir: "",
        email: "",
        alamat: "",
        katasandi: "",
        pertanyaan_keamanan: "",
        jawaban_keamanan: "",
      },
    };
  },
  methods: {
    register() {
      apiAuthRegister(this.form)
        .then((res) => {
          if (!res.error) {
            useSwal()
              .showAlert({
                text: "Berhasil Daftar",
                icon: "success",
                title: "success",
              })
              .then((res) => {
                if (res.isConfirmed) {
                  this.$router.push({ name: "login" });
                }
              });
          } else {
            useSwal().showAlert({
              text: "Gagal Daftar:" + res.message,
              icon: "error",
              title: "failed",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          useSwal().showAlert({
            text: "Gagal Daftar: " + res.message,
            icon: "error",
            title: "failed",
          });
        });
    },
  },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>

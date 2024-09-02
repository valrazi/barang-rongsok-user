<template>
  <div class="flex items-center justify-center min-h-screen bg-blue-50">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-semibold text-center text-blue-600 mb-6">
        Ganti Kata Sandi
      </h2>

      <div class="mb-4">
        <label for="email" class="block text-sm text-gray-700 mb-2"
          >Alamat Email</label
        >
        <input
          id="email"
          type="email"
          class="text-black w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Masukan Email Anda"
          v-model="email"
        />
      </div>

      <div class="mb-4">
        <label for="security-question" class="block text-sm text-gray-700 mb-2"
          >Pertanyaan Keamanan</label
        >
        <select
        v-model="securityQuestion"
          id="security-question"
          class="text-black w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
        <option value="parent-name">Nama Orang Tua</option>
            <option value="favorite-animal">Nama Hewan Favorit</option>
            <option value="favorite-color">Nama Warna Favorit</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="security-answer" class="block text-sm text-gray-700 mb-2"
          >Masukan Jawaban Anda</label
        >
        <input
          id="security-answer"
          v-model="securityAnswer"
          type="text"
          class="text-black w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Masukan Jawaban Anda"
        />
      </div>

      <div class="mb-6">
        <label for="new-password" class="block text-sm text-gray-700 mb-2"
          >Kata Sandi Baru</label
        >
        <input
          id="new-password"
          type="password"
          v-model="password"
          class="text-black w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Masukan Kata Sandi Baru Anda"
        />
      </div>

      <button
      @click="resetPassword()"
        class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
      >
        Ganti Kata Sandi
      </button>
    </div>
  </div>
</template>

<script>
import {apiUserResetPass} from '@/api/auth'
import {useSwal} from '@/composables/useSwal'
export default {
  name: "PasswordReset",
  data(){
    return {
      email:'',
      securityQuestion:'',
      securityAnswer:'',
      password:''
    }
  },
  methods: {
    resetPassword(){
      apiUserResetPass(this.email, this.securityQuestion, this.securityAnswer, this.password)
      .then((res) => {
        if(!res.error) {
          useSwal().showAlert({
            text:'Success reset password',
            icon:'success'
          })
          .then(() => this.$router.push('login'))
        }else {
          useSwal().showAlert({
            text:res.message,
            icon:'error'
          })
        }
      })
      .catch((err) => {
        useSwal().showAlert({
            text:'Server error',
            icon:'error'
          })
      })
    }
  }
};
</script>

<style scoped></style>

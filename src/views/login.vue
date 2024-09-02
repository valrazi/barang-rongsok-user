<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-sm p-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 class="text-center text-2xl font-bold mb-8 text-blue-600">
        Masuk Akun
      </h2>
      <div>
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
            v-model="form.alamatemail"
          />
        </div>
        <!-- Kata Sandi -->
        <div class="mb-6">
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
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="login()"
        >
          Masuk
        </button>
      </div>
      <!-- Additional Links -->
      <div class="text-center mt-4 text-sm text-gray-600">
        <p>
          Belum Mendaftar Akun?
          <span @click="() => this.$router.push('register')" href="#" class="text-blue-600 hover:underline">Daftar Sekarang</span>
        </p>
        <p>
          Lupa Kata Sandi?
          <span @click="() => this.$router.push('reset')" href="#" class="text-blue-600 hover:underline">Ganti Kata Sandi</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAuthLogin } from "@/api/auth";
import { useSwal } from "@/composables/useSwal";
import { useAuthStore } from "@/stores/auth";
import { toRefs } from "vue";
export default {
  setup() {
    const { user, token } = toRefs(useAuthStore());
    return { user, token };
  },
  data() {
    return {
      form: {
        alamatemail: "",
        katasandi: "",
      },
    };
  },
  methods: {
    login() {
      apiAuthLogin(this.form.alamatemail, this.form.katasandi)
        .then((res) => {
          if (!res.error) {
            this.token = res.data.tokenPayload;
            this.user = res.data.user;
            useSwal()
              .showAlert({
                text: "Success Login",
                title: "success",
                icon: "success",
              })
              .then(() => {
                this.$router.push({ name: "beranda" });
              });
          } else {
            useSwal().showAlert({
              text: "Failed Login",
              title: "failed",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          useSwal().showAlert({
            text: "Failed Login",
            title: "failed",
            icon: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>

import type { StateTree } from "pinia";
import { defineStore } from "pinia";
import type { User } from "@/types/index";
import {apiUserLogout} from '@/api/auth'
const initialState = {
  token: null as string | null,
  user: null as User | null,
};

export const useAuthStore = defineStore("auth", {
  state: () => initialState,
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    async logout() {
      await apiUserLogout(this.user?.user_id!)
      this.token = null;
      this.user = null;
      window.location.replace('/login')
    },
  },
  persist: {
    serializer: {
      deserialize: (val: string) => JSON.parse(atob(val)),
      serialize: (val: StateTree) => btoa(JSON.stringify(val)),
    },
  },
});

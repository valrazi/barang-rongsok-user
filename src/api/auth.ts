import api from "@/api/client";
import type { UserRegister, ApiResponse, User, UserLogin } from "@/types/index";

export const apiAuthRegister = (payload: UserRegister) => {
  return api<ApiResponse<User>>({
    method: "POST",
    url: "register",
    data: payload,
  });
};

export const apiAuthLogin = (alamatemail: string, katasandi: string) => {
  return api<ApiResponse<UserLogin>>({
    method: "POST",
    url: "login",
    data: { alamatemail, katasandi },
  });
};

export const apiUserUpdate = (alamat: string) => {
  return api<ApiResponse<User>>({
    method: "PUT",
    url: "profile",
    data: { alamat },
  });
}

export const apiUserGet =  (name?:string) => {
  return api<ApiResponse<User[]>>({
    method: "GET",
    url: "user",
    params: {
      name
    }
  })
}

export const apiUserGetDetail =  (user_id: number) => {
  return api<ApiResponse<User>>({
    method: "GET",
    url: "/profile/" + user_id,
  })
}

export const apiUserLogout = (user_id: number) => {
  return api<ApiResponse<any>>({
    method: "GET",
    url: "logout?user_id=" + user_id,
  })
}

export const apiUserResetPass = (email:string, securityQuestion:string, securityAnswer:string, password:string) =>{
  return api<ApiResponse<any>>({
    method: "POST",
    url: "reset-password",
    data: { email, securityQuestion, securityAnswer, password },
  });
}


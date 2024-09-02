export type AuthLogin = {
  token: string;
  user: UserLogin;
};

export interface UserLogin {
  user: User;
  tokenPayload: string;
}

export interface User {
  user_id: number;
  name_awal: string;
  nama_akhir: string;
  email: string;
  alamat: string;
  pertanyaan_keamanan: string;
  jawaban_keamanan: string;
  createdAt: Date;
  updatedAt: Date;
  socket_id: null;
  is_online: boolean;
  messageUnread: number
}

export type UserRegister = {
  name_awal: string;
  nama_akhir: string;
  email: string;
  alamat: string;
  katasandi: string;
  pertanyaan_keamanan: string;
  jawaban_keamanan: string;
};

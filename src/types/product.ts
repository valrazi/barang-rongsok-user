export type CreateProduct = {
  nama_produk: string;
  harga_produk: number;
  deskripsi_produk: string;
  kategori_produk: string;
  url_foto: string;
  produk_id?: number;
  is_available?: boolean;
};
export type ProductQuery = {
  name?: string;
  category?: string;
  user_id?: string;
};
export type Product = {
  produk_id: number;
  nama_produk: string;
  harga_produk: number;
  deskripsi_produk: string;
  kategori_produk: string;
  url_foto: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
  liked?:boolean
};

export interface ProductLiked {
  id:        number;
  user_id:   number;
  produk_id: number;
  product:   Product;
}

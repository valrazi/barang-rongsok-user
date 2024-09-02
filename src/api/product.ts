import api from "@/api/client";
import type {
  CreateProduct,
  ApiResponse,
  ProductLiked,
  Product,
} from "@/types/index";

export const apiProductCreate = (payload: CreateProduct) => {
  return api<ApiResponse<any>>({
    method: "POST",
    url: "product",
    data: payload,
  });
};

export const apiProductUpdate = (payload: CreateProduct) => {
  return api<ApiResponse<any>>({
    method: "PUT",
    url: "product/" + payload.produk_id,
    data: payload,
  });
};

export const apiProductGet = (query: any) => {
  return api<ApiResponse<Product[]>>({
    method: "GET",
    url: "product",
    params: query,
  });
};

export const apiProductGetDetail = (produk_id: number) => {
  return api<ApiResponse<Product>>({
    method: "GET",
    url: "product/" + produk_id,
  });
};


export const apiProductDelete = (produk_id: number) => {
  return api<ApiResponse<any>>({
    method: "DELETE",
    url: "product/" + produk_id,
  });
}

export const apiProductLikedCreate = (produk_id: number) => {
  return api<ApiResponse<any>>({
    method: "POST",
    url: "liked",
    data: {produk_id},
  });
}

export const apiProductLikedGet = () => {
  return api<ApiResponse<ProductLiked[]>>({
    method: "GET",
    url: "liked",
  });
};

export const apiProductLikedDelete = (produk_id: number) => {
  return api<ApiResponse<any>>({
    method: "DELETE",
    url: "liked/" + produk_id,
  });
}


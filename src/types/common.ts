export type ApiResponse<T> = {
  error: boolean;
  status_code: number;
  data: T;
  message: string;
};

import Swal, { type SweetAlertOptions } from "sweetalert2";

export function useSwal() {
  // Function to show a basic alert
  const showAlert = (options: SweetAlertOptions) => {
    return Swal.fire(options);
  };

  // Function to show a confirmation dialog
  const showConfirmation = async (options: SweetAlertOptions) => {
    const result = await Swal.fire({
      ...options,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    return result.isConfirmed;
  };

  // Function to show a toast notification
  const showToast = (options: SweetAlertOptions) => {
    return Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      ...options,
    });
  };

  return {
    showAlert,
    showConfirmation,
    showToast,
  };
}

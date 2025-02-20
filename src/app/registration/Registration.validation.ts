import * as Yup from "yup";

export const RegistrationValidation = Yup.object({
  username: Yup.string()
    .min(6, "Username minimal 6 karakter.")
    .required("Username wajib diisi."),
  email: Yup.string()
    .email("Email tidak valid.")
    .required("Email wajib diisi."),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter.")
    .required("Password wajib diisi."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak cocok.")
    .required("Konfirmasi password wajib diisi."),
});

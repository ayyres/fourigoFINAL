import * as Yup from "yup";

export const RegistrationValidation = Yup.object({
  Name: Yup.string().required("Nama lengkap wajib diisi."),
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
  dateOfBirth: Yup.string().required("Tanggal lahir wajib diisi."),
  gender: Yup.string().required("Jenis kelamin wajib dipilih."),
  address: Yup.string().required("Alamat wajib diisi."),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka.")
    .min(10, "Nomor telepon minimal 10 angka.")
    .required("Nomor telepon wajib diisi."),
  class: Yup.string().required("Nama sekolah wajib diisi."),
});

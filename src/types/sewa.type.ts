export interface Sewa {
  penyewaan_id: number | string[] | undefined | string;
  penyewaan_tglsewa: string;
  penyewaan_tglkembali: string;
  penyewaan_sttspembayaran: string;
  penyewaan_sttskembali: string;
  penyewaan_totalharga: number;
  penyewaan_pelanggan_id: string;
}

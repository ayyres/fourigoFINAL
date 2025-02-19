export interface Sewa {
  penyewaan_id: number | string[] | undefined | string;
  penyewaan_tglsewa: string;
  penyewaan_tglkembali: string;
  penyewaan_sttspembayaran: string;
  penyewaan_sttskembali: string;
  penyewaan_totalharga: number;
  penyewaan_pelanggan_id: string;
}

export interface sewaDetail {
  penyewaan_detail_id: number;
  penyewaan_detail_penyewaan_id: number;
  penyewaan_detail_alat_id: number;
  penyewaan_detail_jumlah: number;
  penyewaan_detail_subharga: number;
}

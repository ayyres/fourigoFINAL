export interface Alat {
  alat_id: number | string | undefined | string[];
  alat_nama: string;
  alat_deskripsi: string;
  alat_hargaperhari: string;
  alat_stok: number;
  alat_kategori_id: number;
}

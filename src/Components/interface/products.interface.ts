export interface ProductInterface {
  id?: string;
  product_code: string;
  product_category: string;
  product_name: string;
  product_batch: string;
  product_net_qty: number;
  expiry_date: string;
  mfg_date: string;
  manuf_name: string;
  organization: string;
  mfg_license_no: string;
  best_before_days: string;
  secret_code: string;
  qr_embd_code: string;
  barcode_no: string;
  created_at: string;
  updated_at: string;
}

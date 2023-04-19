import { HydratedDocument, Types } from 'mongoose';

export class CreateProductDto {
    id: string;
    product_code: string;
    product_category: string;
    product_name:  string;
    product_batch: string;
    product_net_qty: number;
    expiry_date: string;
    mfg_date: string;
    manuf_name: string;
    mfg_license_no: string;
    best_before_days: string;
    secret_code: string;
    qr_embd_code: string;
    user_id: Types.ObjectId;
    barcode_no: string;
    created_at: string;
    updated_at: string
  }

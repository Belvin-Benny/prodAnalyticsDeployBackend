import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({ timestamps: true })
export class Products {
  @Prop({ required: true })
  barcode_no: string;

  @Prop({ required: true })
  best_before_days: string;

  @Prop({ required: false })
  created_at: string;

  @Prop({ required: true })
  expiry_date: string;

  @Prop({ required: false })
  id: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  manuf_name: string;

  @Prop({required:false})
  organization:string;

  @Prop({ required: true })
  mfg_date: string;

  @Prop({ required: true })
  mfg_license_no: string;

  @Prop({ required: true })
  product_batch: string;

  @Prop({ required: true })
  product_category: string;

  @Prop({ required: true })
  product_code: string;

  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  product_net_qty: number;

  @Prop({ required: true })
  qr_embd_code: string;

  @Prop({ required: true })
  secret_code: string;

  @Prop({ required: false })
  updated_at: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);

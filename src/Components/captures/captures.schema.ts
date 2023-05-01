import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CapturesDocument = HydratedDocument<Captures>;

@Schema()
export class Captures {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  user_gen_name: string;
  @Prop({ required: true })
  user_gen_pwd: string;
  @Prop({ required: true })
  secret_code: string;
  @Prop({ required: true })
  captured_image: string;
  @Prop({ required: true })
  loc_lat: number;
  @Prop({ required: true })
  loc_long: number;
  @Prop({ required: true })
  user_ip: string;
  @Prop({ required: true })
  access_method: string;
  @Prop({ required: false })
  qr_code_url: string;
  @Prop({ required: false })
  qr_embd_no: string;
  @Prop({ required: false })
  barcode_no: string;
  @Prop({ required: false })
  other_details: string;
  @Prop({ required: false })
  created_at: string;
  @Prop({
    type: {
      product_code: { type: String, required: false },
      product_name: { type: String, required: false }
    },
    required: true
  })
  product_details: {
    product_code: string;
    product_name: string;
  };
}

export const CapturesSchema = SchemaFactory.createForClass(Captures);

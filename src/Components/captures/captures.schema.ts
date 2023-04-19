import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CapturesDocument = HydratedDocument<Captures>;

@Schema()
// export class Captures {
//   @Prop({ required: true })
//   asn: string;

//   @Prop({ required: true })
//   city: string;

//   @Prop({ required: true })
//   continent_code: string;

//   @Prop({ required: true })
//   country: string;

//   @Prop({ required: true })
//   country_area: string;

//   @Prop({ required: true, type: Types.ObjectId, ref: 'User'})
//   country_calling_code: Types.ObjectId;

//   @Prop({ required: true })
//   country_capital: string;

//   @Prop({ required: true })
//   country_code: string;

//   @Prop({ required: true })
//   country_code_iso3: string;

//   @Prop({ required: true })
//   country_name: string;

//   @Prop({ required: true })
//   country_population: string;

//   @Prop({ required: true })
//   country_tld: string;

//   @Prop({ required: true })
//   currency: string;

//   @Prop({ required: true })
//   currency_name: number;

//   @Prop({ required: true }) 
//   in_eu: string;

//   @Prop({ required: true })
//   ip: string;

//   @Prop({ required: true })
//   languages: string;


//   @Prop({ required: true })
//   latitude: number;

//   @Prop({ required: true }) 
//   longitude: string;

//   @Prop({ required: true })
//   network: string;

//   @Prop({ required: true })
//   org: string;

//   @Prop({ required: true }) 
//   postal: string;

//   @Prop({ required: true })
//   region: string;

//   @Prop({ required: true })
//   region_code: string;

//   @Prop({ required: true }) 
//   timezone: string;

//   @Prop({ required: true })
//   utc_offset: string;

//   @Prop({ required: true })
//   version: string;





// }
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
    loc_lat: string;
    @Prop({ required: true })
    loc_long: string;
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
    @Prop({ required: true })
    created_at: string;
   
    product_details: {
        product_code: string;
 
        product_name: string;
        

    }
}

export const CapturesSchema = SchemaFactory.createForClass(Captures);


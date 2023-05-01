export interface CapturesInterface {

    id: string;
    user_gen_name: string;
    user_gen_pwd: string;
    secret_code: string;
    captured_image: string;
    loc_lat: number;
    loc_long: number;
    user_ip: string;
    access_method: string;
    qr_code_url: string;
    qr_embd_no: string;
    barcode_no: string;
    other_details: string;
    created_at: string;

    product_details: {
        product_code: string;
        product_name: string
      
    }

}

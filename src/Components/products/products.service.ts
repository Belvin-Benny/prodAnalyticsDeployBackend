import { Injectable } from '@nestjs/common';
import { Products } from './products.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../admin/schemas/user.schema';
Products
@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private  ProductsModel: Model<Products>,
    @InjectModel(User.name) private userModel: Model<User>,
 ) {}

    async findAll(): Promise<Products[]> {
        return await this.ProductsModel.find().populate('user_id');
      }
    
      async findOne(id: string): Promise<Products> {
        return await this.ProductsModel.findOne({ _id: id });
      }
      async findUserProducts(id: string): Promise<Products[]> {
        return await this.ProductsModel.find({ user_id: id }).populate('user_id');
      }

      async findNormalUserProducts(id: string) {
        const admin = await this.userModel.findOne({_id: id})
       
        return await this.ProductsModel.find({ user_id: (await admin).createdBy.toString() })
      }
      async create(Products: Products): Promise<Products> {
        const newProducts = new this.ProductsModel(Products);
        return await newProducts.save();
      } 
    
      async delete(id: string): Promise<Products> {
        const exists = await this.ProductsModel.findOne({ _id: id });
        if (!exists) {
            throw new Error(`The Product ${id} does not exist`); 
        }

        return await this.ProductsModel.findByIdAndRemove(id);
      }
    
      async update(id: string, Products: Products): Promise<Products> {
        const exists = await this.ProductsModel.findOne({ _id: id });
        if (!exists) {
            throw new Error(`The Product ${id} does not exist`); 
        }
        return await this.ProductsModel.findByIdAndUpdate(id, Products, { new: true });
      }
}

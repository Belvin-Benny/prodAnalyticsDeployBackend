import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Captures } from './captures.schema';

@Injectable()
export class CapturesService {
    constructor(@InjectModel('Capture') private readonly ProductsModel: Model<Captures>) {}

    async findAll(): Promise<Captures[]> {
        return await this.ProductsModel.find()
      }
    
      async findOne(id: string): Promise<Captures> {
        return await this.ProductsModel.findOne({ _id: id });
      }
      async findUserProducts(id: string): Promise<Captures[]> {
        return await this.ProductsModel.find({ secret_code: id })
      }
    
      async create(Captures: Captures): Promise<Captures> {
        const newProducts = new this.ProductsModel(Captures);
        return await newProducts.save();
      }

      async createMany(captures: Captures[]): Promise<Captures[]> {
        const newProducts = await this.ProductsModel.insertMany(captures);
        return newProducts;
      }
    
      async delete(id: string): Promise<Captures> {
        const exists = await this.ProductsModel.findOne({ _id: id });
        if (!exists) {
            throw new Error(`The Product ${id} does not exist`); 
        }

        return await this.ProductsModel.findByIdAndRemove(id);
      }
    
      async update(id: string, Captures: Captures): Promise<Captures> {
        const exists = await this.ProductsModel.findOne({ _id: id });
        if (!exists) {
            throw new Error(`The Product ${id} does not exist`); 
        }
        return await this.ProductsModel.findByIdAndUpdate(id, Captures, { new: true });
      }
}

import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Captures } from './captures.schema';
import { ProductsService } from '../products/products.service';
import { CapturesInterface } from '../interface/captures.interface';
import { Users } from '../admin/dto/user.dto';

@Injectable()
export class CapturesService {
  constructor(
    @InjectModel('Capture')
    private readonly CaptureModel: Model<Captures>,
    private readonly productService: ProductsService,
  ) { }

  async findAll(): Promise<Captures[]> {
    return await this.CaptureModel.find()
  }
  async findGenuine(status: number, page: number, pageSize: number) {
    let query = []
    if (status === 1) {
      console.log(1)
      query = await this.CaptureModel.find({
        secret_code: { $ne: "Failed to decode" }
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    } else {
      console.log(2)
      query = await this.CaptureModel.find({
        secret_code: "Failed to decode"
      }).skip((page - 1) * pageSize)
        .limit(pageSize);
    }

    return {
      captures: await query,
      result: (await query).length,
      status: "success"
    };
  }

  async findOne(id: string): Promise<Captures> {
    return await this.CaptureModel.findOne({ _id: id });
  }
  async findUserProducts(id: string): Promise<Captures[]> {
    return await this.CaptureModel.find({ secret_code: id })
  }

  async create(Captures: Captures): Promise<Captures> {
    const newProducts = new this.CaptureModel(Captures);
    console.log(newProducts)
    return await newProducts.save();
  }

  async createMany(captures: Captures[]): Promise<Captures[]> {
    const newProducts = await this.CaptureModel.insertMany(captures);
    return newProducts;
  }

  async delete(id: string): Promise<Captures> {
    const exists = await this.CaptureModel.findOne({ _id: id });
    if (!exists) {
      throw new Error(`The Product ${id} does not exist`);
    }

    return await this.CaptureModel.findByIdAndRemove(id);
  }

  async update(id: string, Captures: Captures): Promise<Captures> {
    const exists = await this.CaptureModel.findOne({ _id: id });
    if (!exists) {
      throw new Error(`The Product ${id} does not exist`);
    }
    return await this.CaptureModel.findByIdAndUpdate(id, Captures, { new: true });
  }
  // async findByPagination(searchTerm: string, page: number, pageSize: number) {
  //   let options = {};
  //   if (searchTerm) {
  //     options = {
  //       $or: [{ userName: { $regex: '' + searchTerm, $options: 'i' } }],
  //     };
  //   }

  //   const query = this.CaptureModel.aggregate([
  //     { $sort: { created: -1 } },
  //     { $skip: (page - 1) * pageSize },
  //     { $match: options },
  //     { $limit: Number(pageSize) },

  //   ]);

  //   return {
  //     captures: await query,
  //     result: (await query).length,
  //     status: "success"
  //   };
  // }

  /**
   * Super admin -> userId and user field is not required
   * admin -> userId and user field is required
   * normal user -> userId and user field is required
   */

  async findAdminUserCapture(userId: string, searchTerm: string, page: number, pageSize: number, user: string, isPagination: boolean) {
    let product;
    let query;

    if (user === Users.superAdmin) {
      query = {};

      if (searchTerm) {
        query["$or"] = [
          { user_gen_name: { $regex: '' + searchTerm, $options: 'i' } },
        ];
      }

    } else {

      if (user === Users.normalUser) {
        product = await this.productService.findNormalUserProducts(userId);
      } else if (user === Users.admin) {
        product = await this.productService.findUserProducts(userId);
      }

      const getSecreteCodes = product?.map((e) => e.secret_code);

      query = { secret_code: { $in: getSecreteCodes } };
      if (searchTerm) {
        query["$or"] = [
          { user_gen_name: { $regex: '' + searchTerm, $options: 'i' } },
          // add more fields to search here
        ];
      }
    }

    if (isPagination === true) {
      const length = (await this.CaptureModel.find(query)).length;
      const capture = await this.CaptureModel.find(query)
        .sort({ created_at: -1 })
        .skip((page - 1) * pageSize)
        .limit(Number(pageSize))
        .exec();

      return {
        total_count: length,
        result: (await capture).length,
        status: "success",
        captures: await capture,
      };
    } else {
      const length = (await this.CaptureModel.find(query)).length;
      const capture = await this.CaptureModel.find(query)
        .sort({ created_at: -1 })
        .exec();

      return {
        total_count: length,
        result: (await capture).length,
        status: "success",
        captures: await capture,
      };
    }
  }

  /**
   * Super admin -> userId and user field is not required
   * admin -> userId and user field is required
   * normal user -> userId and user field is required
   * start -> start date is required
   * end -> end date is required
   */

  async findDateRangeCapture(userId: string, searchTerm: string, page: number, pageSize: number, user: string, start: string, end: string, isPagination: boolean) {
    let product;
    let query;

    if (user === Users.superAdmin) {
      query = {
        created_at: {
          $gte: start,
          $lte: end
        }
      };

      if (searchTerm) {
        query["$or"] = [
          { user_gen_name: { $regex: '' + searchTerm, $options: 'i' } },
        ];
      }

    } else {

      if (user === Users.normalUser) {
        product = await this.productService.findNormalUserProducts(userId);
      } else if (user === Users.admin) {
        product = await this.productService.findUserProducts(userId);
      }

      const getSecreteCodes = product.map((e) => e.secret_code);

      query = {
        secret_code: { $in: getSecreteCodes },
        created_at: {
          $gte: start,
          $lte: end
        }
      };
      if (searchTerm) {
        query["$or"] = [
          { user_gen_name: { $regex: '' + searchTerm, $options: 'i' } },
        ];
      }
    }

    const data = this.CaptureModel.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            loc_lat: "$loc_lat",
            loc_long: "$loc_long",
            secret_code: "$secret_code",
            user_gen_name: "$user_gen_name"
          },
          data: { $first: "$$ROOT" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          data: 1,
          count: 1
        }
      },
    ]);

    const capture = this.CaptureModel.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: { loc_lat: "$loc_lat", loc_long: "$loc_long", secret_code: "$secret_code", user_gen_name: "$user_gen_name" },
          data: { $first: "$$ROOT" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          data: 1,
          count: 1
        }
      },
    ]);

    if (isPagination === true) {
      const paginationList = capture
        .sort({ count: -1 })
        .skip((page - 1) * pageSize)
        .limit(Number(pageSize))
        .exec();
      return {
        total_count: (await data).length,
        result: (await paginationList).length,
        status: "success",
        captures: await paginationList,
      };
    } else {
      const list = capture.sort({ count: -1 }).exec();
      return {
        total_count: (await data).length,
        result: (await list).length,
        status: "success",
        captures: await list,
      };
    }
  }

  /**
  * accessMethod -> default it's Mob -> [Mob , Web]
  * secretCode is required
  */

  async sortBySecretCodeCapture(secreteCode: string, searchTerm: string, page: number, pageSize: number, isPagination: boolean, accessMethod: String) {
    let query;

    if (accessMethod) {
      query = {
        secret_code: { $in: secreteCode },
        access_method: accessMethod
      };
    } else {
      query = {
        secret_code: { $in: secreteCode },
      };
    }

    if (searchTerm) {
      query["$or"] = [
        { user_gen_name: { $regex: '' + searchTerm, $options: 'i' } },
      ];
    }


    const length = (await this.CaptureModel.find(query)).length;

    if (isPagination === true) {
      const capture = await this.CaptureModel.find(query)
        .sort({ created_at: -1 })
        .skip((page - 1) * pageSize)
        .limit(Number(pageSize))
        .exec();

      return {
        total_count: length,
        result: capture.length,
        status: "success",
        captures: capture,
      };
    } else {
      const capture = await this.CaptureModel.find(query).sort({ created_at: -1 }).exec();

      return {
        total_count: length,
        result: capture.length,
        status: "success",
        captures: capture,
      };
    }
  }
}

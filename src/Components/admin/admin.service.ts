import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { userDTO } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { MyException } from 'src/Exception';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async addUser(userdto: userDTO): Promise<User> {
    const findinDb = await this.userModel.findOne({
      username: userdto.username
    });
    const findinOrg = await this.userModel.findOne({
      organization: userdto.organization
    });
    if (findinDb) {
      throw new MyException('Username not available!');
    }
 
    else if(findinOrg){
      throw new MyException('organization not available!');
    }else {
      const saltOrRounds = 10;
      const password = userdto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = new this.userModel({
        ...userdto,
        password: hash,
        createdBy: new Types.ObjectId(userdto.createdBy),
      });
      user.save();
      return user;
    }
  }
  async validateUser(user: userDTO): Promise<object> {
    const findInDb: userDTO = await this.userModel.findOne({
      username: user.username,
    });
    if (findInDb) {
      const checkPassword = bcrypt.compareSync(
        user.password,
        findInDb.password,
      );
      if (checkPassword) {
        return this.loginAdmin(user);
      } else {
        throw new MyException('Please enter a valid password');
      }
    } else {
      throw new MyException('Please enter a valid username');
    }
  }

  async editUser(id: string, user: userDTO): Promise<User> {
    const update = await this.userModel.findByIdAndUpdate(id, user);
    return update;
  }
  async loginAdmin(adminDto: userDTO) {
    const data = await this.userModel.findOne({ username: adminDto.username });
    const payload = { username: adminDto.username, sub: adminDto._id };
    return {
      access_token: this.jwtService.sign(payload),
      data: data,
    };
  }

  async deleteUser(id: string): Promise<User> {
    const deleteuser = await this.userModel.findByIdAndDelete(id);
    return deleteuser;
  }

  async remove(id: string) {
    try {
      // return await this.userpostModel.findByIdAndRemove(id);
      const data = await this.userModel.updateOne(
        { _id: id },
        {
          $set: {
            isDeleted: true,
          },
        },
      );
      console.log(data);
      return data;
    } catch (e) {
      await e;
    }
  }
  async getUsersByCreatorId(creatorId: string): Promise<User[]> {
    // return this.userModel.find({ createdBy: creatorId}).exec();
    const createdBy = new Types.ObjectId(creatorId); // replace with your desired ID
    const result = await this.userModel
      .aggregate([
        {
          $match: {
            createdBy: createdBy,
            isDeleted: false,
          },
        },
      ])
      .exec();

    return result;
  }
  async findAllOrganizations() {
    const users = await this.userModel.find({ isDeleted: false }).exec();
    const organizations = users
      .filter(u => u.organization) 
      .map(u => ({
        user: u._id,
        org: u.organization 
      }));
    return organizations;
  }
}

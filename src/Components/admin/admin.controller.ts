import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { userDTO } from './dto/user.dto';
import { AdminService } from './admin.service';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers() {
    const userdetails = await this.adminService.getAllUsers();
    return userdetails;
  }

  @Get('findAllOrganizations')
  async findAllOrganizations() {
    const userdetails = await this.adminService.findAllOrganizations();
    return userdetails;
  }

  @Post('user/login')
  loginAdmin(@Body() data: userDTO) {
    return this.adminService.validateUser(data);
  }

  @Post('user/add')
  async addUsers(@Body() userdto: userDTO): Promise<User> {
    const result = await this.adminService.addUser(userdto);
    return result;
  }

  @Put('user/update/:id')
  async editUser(@Param('id') id, @Body() userDTO: userDTO): Promise<User> {
    const result = await this.adminService.editUser(id, userDTO);
    return result;
  }

  @Delete('user/delete/:id')
  async deleteUser(@Param('id') id): Promise<User> {
    const result = await this.adminService.deleteUser(id);
    return result;
  }
  // @UseGuards(JwtAuthGuard)
  @Put('user/delete/:id')
  async update(@Param('id') id): Promise<any> {
    return await this.adminService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':creatorId/user')
  async getUsersByCreatorId(@Param('creatorId') creatorId: string) {
    return this.adminService.getUsersByCreatorId(creatorId);
  }
}

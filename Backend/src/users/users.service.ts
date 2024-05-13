import { Injectable } from '@nestjs/common';
import { CreateUserDto, loginDTO } from './dto/create-user.dto';
import { Like, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }


  async findAll() {
    return await this.userRepo.find({});
  }

  async findById(id: number) {
    return await this.userRepo.find({ where: { id: id } });
  }

  //Sajid
  async getUsers(subString: string): Promise<User[]> {
    return await this.userRepo.find({
      where: { fullName: Like(`%${subString}%`) },
    });
  }

  //Sajid
  async addUser(myobj: CreateUserDto): Promise<Object> {
    return await this.userRepo.save(myobj);
  }
  //Sajid
  async findOne(logindata: loginDTO): Promise<any> {
    return await this.userRepo.findOneBy({ email: logindata.email });
  }

  //Sajid
  async getTotalUsers(): Promise<number> {
    return await this.userRepo.count();
  }

  async findOne2(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async ShowAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findbyEmail(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  //Humayra
  async uploadProfilePhoto(
    id: number,
    uploadedProfilePhoto: Express.Multer.File,
  ) {
    const user = await this.userRepo.findOneBy({ id: id });
    user.profilePhoto = uploadedProfilePhoto.filename;
    const { password, ...response } =
      await this.userRepo.save({
        id,
        ...user,
      });
    return response;
  }
  //Humayra
  async getProfilePhoto(id: number, res) {
    const user = await this.userRepo.findOneBy({ id: id });
    res.sendFile(user.profilePhoto, { root: './upload' });
  }

}



import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  UpdateUserParams,
  CreateUserProfile,
  CreateUserPost,
} from '../../../utils/types';
import { Repository } from 'typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  findUsers() {
    return this.userRepository.find({ relations: ['profile'] });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updatreUser(id: number, updateUserDto: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDto });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(id: number, createUserProfile: CreateUserProfile) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );

    const newPorfile = this.profileRepository.create(createUserProfile);
    const savedProfile = await this.profileRepository.save(newPorfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(id: number, createUserPost: CreateUserPost) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPost,
      user,
    });
    return this.postRepository.save(newPost);
  }
}

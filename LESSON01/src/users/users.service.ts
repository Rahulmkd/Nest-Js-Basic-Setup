import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Amit Sharma',
      email: 'amit.sharma@example.com',
      role: 'user',
    },
    {
      id: 3,
      name: 'Sneha Verma',
      email: 'sneha.verma@example.com',
      role: 'user',
    },
    {
      id: 4,
      name: 'Ravi Singh',
      email: 'ravi.singh@example.com',
      role: 'moderator',
    },
    {
      id: 5,
      name: 'Priya Mehta',
      email: 'priya.mehta@example.com',
      role: 'user',
    },
  ];

  findAll(role?: 'user' | 'moderator' | 'admin') {
    if (role) {
      const relesArray = this.users.filter((user) => user.role === role);
      if (relesArray.length === 0)
        throw new NotFoundException('User Role Not Found');
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userById = [...this.users].sort((a, b) => (b.id = a.id));
    const newUser = {
      id: userById[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id != id);
    return removedUser;
  }
}

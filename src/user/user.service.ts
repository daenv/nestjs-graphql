import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './model/user';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUsersArgs } from './dto/args/get-users.args';
import { GetUserArgs } from './dto/args/get-user.args';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Injectable()
export class UserService {
   private users: User[] = [];

   public createUser(createUserData: CreateUserInput): User {
      const user: User = {
         userId: uuidv4(),
         ...createUserData,
         isSubscribed: false,
      };

      this.users.push(user);

      return user;
   }
   public updateUser(updateUserData: UpdateUserInput): User {
      const user = this.users.find((user) => user.userId === updateUserData.userId);
      Object.assign(user, updateUserData);
      return user;
   }

   public getUsers(getUsersData: GetUsersArgs): User[] {
      return getUsersData.userIds.map((userId) =>
         this.users.find((user) => user.userId === userId),
      );
   }

   public getUser(getUserData: GetUserArgs): User {
      return this.users.find((user) => user.userId === getUserData.userId);
   }
   public deleteUser(deleteUserData: DeleteUserInput): User {
      const userIndex = this.users.findIndex((user) => user.userId === deleteUserData.userId);
      const user = this.users[userIndex];
      this.users.splice(userIndex, 1);
      return user;
   }
}

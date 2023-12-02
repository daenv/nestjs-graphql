import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from './model/user';
import { UserService } from './user.service';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Resolver(() => User)
export class UserResolver {
   constructor(private readonly userService: UserService) {}

   @Query(() => User, { name: 'user', nullable: true })
   getUser(@Args() getUserArgs: GetUserArgs): User {
      return this.userService.getUser(getUserArgs);
   }

   @Query(() => User, { name: 'users', nullable: true })
   getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
      return this.userService.getUsers(getUsersArgs);
   }

   @Mutation(() => User)
   createUser(@Args('CreateUserData') createUserArgs: CreateUserInput): User {
      return this.userService.createUser(createUserArgs);
   }

   @Mutation(() => User)
   updateUser(@Args('UpdateUserData') updateUserArgs: UpdateUserInput): User {
      return this.userService.updateUser(updateUserArgs);
   }

   @Mutation(() => User)
   deleteUser(@Args('DeleteUserData') deleteUserArgs: DeleteUserInput): User {
      return this.userService.deleteUser(deleteUserArgs);
   }
}

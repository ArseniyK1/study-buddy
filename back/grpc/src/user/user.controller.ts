import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import {
  GetUserRequest,
  User,
  UserServiceController,
  UserServiceControllerMethods,
} from '../proto/generated/user';

@Controller('user')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  private readonly logger = new Logger(UserController.name);
  getUser(request: GetUserRequest): Promise<User> {
    this.logger.log(request);
    // Реализуйте свою логику для получения элемента на основе запроса.
    // Вы можете использовать request.itemId для получения определенного элемента из вашего источника данных.
    const item: User = {
      id: request.id,
      name: 'Sample Item',
      isActive: true,
    };
    return Promise.resolve(item);
  }
}

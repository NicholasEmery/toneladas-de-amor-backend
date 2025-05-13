import { Module } from '@nestjs/common';
import { GetUserService } from './get-user.service';
import { GetUserController } from './get-user.controller';

@Module({
  controllers: [GetUserController],
  providers: [GetUserService]
})
export class GetUserModule {}

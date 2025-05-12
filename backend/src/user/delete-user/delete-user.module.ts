import { Module } from '@nestjs/common';
import { DeleteUserService } from './delete-user.service';

@Module({
  providers: [DeleteUserService]
})
export class DeleteUserModule {}

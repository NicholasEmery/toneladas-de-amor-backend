import { Module } from '@nestjs/common';
import { UpdateUserService } from './update-user.service';

@Module({
  providers: [UpdateUserService]
})
export class UpdateUserModule {}

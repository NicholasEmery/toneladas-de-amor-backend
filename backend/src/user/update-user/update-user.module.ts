import { Module } from "@nestjs/common";
import { UpdateUserService } from "./update-user.service";
import { UpdateUserController } from "./update-user.controller";

@Module({
  controllers: [UpdateUserController],
  providers: [UpdateUserService],
})
export class UpdateUserModule {}

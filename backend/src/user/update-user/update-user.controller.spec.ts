import { Test, TestingModule } from "@nestjs/testing";
import { UpdateUserController } from "./update-user.controller";
import { UpdateUserService } from "./update-user.service";
import { AuthGuard } from "../../auth/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../database/prisma.service";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
class MockAuthGuard {
  canActivate(_context: ExecutionContext) {
    return true;
  }
}

describe("UpdateUserController", () => {
  let controller: UpdateUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [UpdateUserService, { provide: JwtService, useValue: {} }, { provide: PrismaService, useValue: {} }],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    controller = module.get<UpdateUserController>(UpdateUserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

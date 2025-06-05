import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserService } from "./create-user.service";
import { PrismaService } from "../../database/prisma.service";
import { JwtService } from "@nestjs/jwt";

describe("CreateUserService", () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

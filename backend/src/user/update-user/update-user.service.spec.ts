import { Test, TestingModule } from "@nestjs/testing";
import { UpdateUserService } from "./update-user.service";
import { PrismaService } from "../../database/prisma.service";
import { JwtService } from "@nestjs/jwt";

describe("UpdateUserService", () => {
  let service: UpdateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { GetUserService } from "./get-user.service";
import { PrismaService } from "../../database/prisma.service";

describe("GetUserService", () => {
  let service: GetUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<GetUserService>(GetUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

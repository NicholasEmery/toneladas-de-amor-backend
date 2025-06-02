import { AuthGuard } from "./auth.guard";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/prisma.service";

describe("AuthGuard", () => {
  it("should be defined", () => {
    const mockJwtService = {} as JwtService;
    const mockPrismaService = {} as PrismaService;
    expect(new AuthGuard(mockJwtService, mockPrismaService)).toBeDefined();
  });
});

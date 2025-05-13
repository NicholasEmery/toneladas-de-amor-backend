import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class GetUsersByRoleDto {
  @ApiProperty({
    default: "UPHELD",
    description: "Role of the users to be retrieved",
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role!: Role;
}

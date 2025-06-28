import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserByIdDto {
  @ApiProperty({
    default: "ID",
    description: "ID do usuário",
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId!: string;
}

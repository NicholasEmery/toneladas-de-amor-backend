import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserByIdDto {
  @ApiProperty({
    description: "ID do usuário a ser deletado",
    example: "ID",
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId!: string;
}

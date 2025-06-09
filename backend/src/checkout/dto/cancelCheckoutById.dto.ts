import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CancelCheckoutByIdDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: "id must contain only numbers" })
  id!: string;
}

import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum FieldsCycle {
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  BIMONTHLY = "BIMONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMIANNUALLY = "SEMIANNUALLY",
  YEARLY = "YEARLY",
}

export class FieldsSubscriptionDto {
  @ApiProperty({
    description: "Cycle of the subscription.",
    example: "MONTHLY",
    enum: FieldsCycle,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(FieldsCycle, {
    message: (args) => `The value '${args.value}' is invalid.`,
  })
  cycle!: FieldsCycle;

  @ApiProperty({
    description: "End date of the subscription in YYYY-MM-DD format.",
    example: "2024-12-31",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "endDate must be in the format YYYY-MM-DD.",
  })
  endDate!: string;

  @ApiProperty({
    description: "Next due date of the subscription in YYYY-MM-DD format.",
    example: "2024-07-01",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "nextDueDate must be in the format YYYY-MM-DD.",
  })
  nextDueDate!: string;
}

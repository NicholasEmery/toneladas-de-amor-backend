import { PartialType } from "@nestjs/mapped-types";
import { CreateFieldsRoleDonatorDto } from "../createFieldsRole/createFieldsRoleDonator.dto";

export class UpdateFieldsRoleDonatorDto extends PartialType(
  CreateFieldsRoleDonatorDto,
) {}

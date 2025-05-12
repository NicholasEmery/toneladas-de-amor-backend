import { PartialType } from "@nestjs/mapped-types";
import { CreateFieldsRoleUpheldDto } from "../createFieldsRole/createFieldsRoleUpheld.dto";

export class UpdateFieldsRoleUpheldDto extends PartialType(
  CreateFieldsRoleUpheldDto,
) {}

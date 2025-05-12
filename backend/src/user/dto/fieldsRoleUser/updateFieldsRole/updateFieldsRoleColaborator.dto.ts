import { PartialType } from "@nestjs/mapped-types";
import { CreateFieldsRoleColaboratorDto } from "../createFieldsRole/createFieldsRoleColaborator.dto";

export class UpdateFieldsRoleColaboratorDto extends PartialType(
  CreateFieldsRoleColaboratorDto,
) {}

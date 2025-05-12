import { CreateUserAdminDto } from "../createUser/createUserAdmin.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserAdminDto extends PartialType(CreateUserAdminDto) {}

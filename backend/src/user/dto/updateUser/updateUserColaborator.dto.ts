import { CreateUserColaboratorDto } from "../createUser/createUserColaborator.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserColaboratorDto extends PartialType(CreateUserColaboratorDto) {}

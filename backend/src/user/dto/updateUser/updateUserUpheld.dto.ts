import { CreateUserUpheldDto } from "../createUser/createUserUpheld.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserUpheldDto extends PartialType(CreateUserUpheldDto) {}
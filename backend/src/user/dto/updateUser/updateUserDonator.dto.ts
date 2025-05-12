import { CreateUserDonatorDto } from "../createUser/createUserDonator.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserDonatorDto extends PartialType(CreateUserDonatorDto) {}
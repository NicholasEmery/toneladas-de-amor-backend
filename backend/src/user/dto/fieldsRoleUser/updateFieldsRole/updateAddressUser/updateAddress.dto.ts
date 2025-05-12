import { PartialType } from "@nestjs/mapped-types";
import { CreateAddressDto } from "../../createFieldsRole/createAddressUser/createAddress.dto";

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}

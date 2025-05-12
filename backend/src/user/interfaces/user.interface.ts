export type UserFieldsRole =
  | ColaboratorFields
  | DonatorFields
  | UpheldFields;

type AddressFields = {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface ColaboratorFields { 
    department: string;
    address: AddressFields;
}

export interface DonatorFields {
    nameBusiness: string;
    cnpj: string;
    address: AddressFields;
}

export interface UpheldFields {
    employmentSituation: string;
    numberOfPeopleInTheHousehold: number ;
    address: AddressFields;
}
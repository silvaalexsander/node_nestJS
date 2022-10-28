import { PartialType } from "@nestjs/mapped-types";
import { CreaUserDTO } from "./createUser.dto";

export class UpdateUserDTO extends PartialType(CreaUserDTO) {
    
}
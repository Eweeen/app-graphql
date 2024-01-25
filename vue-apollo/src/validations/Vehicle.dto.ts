import BaseModel from "./BaseModel.ts";
import { IsNotEmptyMessage, IsStringMessage } from "./ErrorMessage.ts";
import { IsNotEmpty, IsString } from "class-validator";

export class VehicleDto extends BaseModel {
    @IsNotEmpty({ message: IsNotEmptyMessage })
    @IsString({ message: IsStringMessage })
    immatriculation!: string;

    @IsNotEmpty({ message: IsNotEmptyMessage })
    @IsString({ message: IsStringMessage })
    model!: string;
}
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty({ message: "O nome é obrigatorio"})
    name: string
    @IsEmail({}, { message: "O email deve ser válido "})
    email: string
}

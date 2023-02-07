import { IsEmail, MinLength, MaxLength } from "class-validator";

export class RegisterDto {
  @MinLength(2, {
    message: "Name is too short. Minimal length is $constraint1 characters.",
  })
  @MaxLength(50, {
    message: "Name is too long. Maximal length is $constraint1 characters.",
  })
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8, {
    message:
      "Password is too short. Minimal length is $constraint1 characters.",
  })
  @MaxLength(50, {
    message: "Password is too long. Maximal length is $constraint1 characters.",
  })
  password: string;
}

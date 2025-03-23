import { regularExp } from '../../../config';

export class RegisterUserDto {
  constructor(
    public fullname: string,
    public password: string,
    public email: string,
    public phone_number: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { fullname, password, email, phone_number } = object;

    if (!fullname) return ['fullname is required'];
    if (!password) return ['password is required'];
<<<<<<< HEAD
    if (!regularExp.password.test(password)) return ['invalid password format'];
=======
    if (!regularExp.password.test(password))
      return ['format password is invalid'];
>>>>>>> eae1636dc935a889ccad3ace04f19a841275b869
    if (!email) return ['email is required'];
    if (!regularExp.email.test(email)) return ['email is invalid'];
    if (!phone_number) return ['phone_number is required'];

    return [
      undefined,
      new RegisterUserDto(
        fullname.trim().toLowerCase(),
        password.trim(),
        email.trim().toLowerCase(),
        phone_number.trim()
      ),
    ];
  }
}

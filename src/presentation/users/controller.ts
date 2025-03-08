import { Request, Response } from 'express';
import { RegisterUserService } from './services/register-user.service';
import { FinderUsersService } from './services/finder-users.service';
import { FinderUserService } from './services/finder-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { CustomError, RegisterUserDto, UpdateUserDto } from '../../domain';

export class UserController {
  constructor(
    private readonly registerUser: RegisterUserService,
    private readonly finderUsers: FinderUsersService,
    private readonly finderUser: FinderUserService,
    private readonly updateUser: UpdateUserService,
    private readonly deleteUser: DeleteUserService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Something went very wrong🧨' });
  };

  findAll = (req: Request, res: Response) => {
    this.finderUsers
      .execute()
      .then((users) => res.status(200).json(users))
      .catch((err) => this.handleError(err, res));
  };

  register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.registerUser
      .execute(registerUserDto!)
      .then((message) => res.status(201).json(message))
      .catch((err) => this.handleError(err, res));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.finderUser
      .execute(id)
      .then((user) => res.status(200).json(user))
      .catch((err) => this.handleError(err, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateUserDto] = UpdateUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.updateUser
      .execute(id, updateUserDto!)
      .then((user) => res.status(200).json(user))
      .catch((err) => this.handleError(err, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deleteUser
      .execute(id)
      .then(() => res.status(204).json(null))
      .catch((err) => this.handleError(err, res));
  };
}

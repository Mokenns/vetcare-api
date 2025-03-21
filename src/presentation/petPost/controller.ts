import { Request, Response } from 'express';
import { FindAllPetPostService } from './services/findall-petpost.service';
import { CreatePetPostService } from './services/create-petpost.service';
import { FindPetPostService } from './services/find-petpost.service';
import { UpdatePetPostService } from './services/update-petpost.service';
import { DeletePetPostService } from './services/delete-petpost.service';
import { ApprovePetPostService } from './services/approve-petpost.service';
import { RejectPetPostService } from './services/reject-petpost.service';
import { CustomError } from '../../domain';
import { CreatePetPostDto } from '../../domain/dtos/petposts/petpost.dto';
import { UpdatePetPostDto } from '../../domain/dtos/petposts/update-petpost.dto';

export class PetPostController {
  constructor(
    private readonly findAllPetPost: FindAllPetPostService,
    private readonly createPetPost: CreatePetPostService,
    private readonly findPetPost: FindPetPostService,
    private readonly updatePetPost: UpdatePetPostService,
    private readonly deletePetPost: DeletePetPostService,
    private readonly approvePetPost: ApprovePetPostService,
    private readonly rejectPetPost: RejectPetPostService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Something went very wrong🧨' });
  };

  findAll = (req: Request, res: Response) => {
    this.findAllPetPost
      .execute()
      .then((posts) => res.status(200).json(posts))
      .catch((err) => this.handleError(err, res));
  };

  create = (req: Request, res: Response) => {
    const [error, createPetPostDto] = CreatePetPostDto.execute(req.body);
    const user = req.body.sessionUser;

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.createPetPost
      .execute(createPetPostDto!, user)
      .then((message) => res.status(201).json(message))
      .catch((err) => this.handleError(err, res));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;

    this.findPetPost
      .execute(id)
      .then((post) => res.status(200).json(post))
      .catch((err) => res.status(500).json({ message: err.message }));
  };
  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updatePetPostDto] = UpdatePetPostDto.execute(req.body);
    if (error) {
      return res.status(422).json({ message: error });
    }

    this.updatePetPost
      .execute(id, updatePetPostDto!)
      .then((message) => res.status(200).json(message))
      .catch((err) => this.handleError(err, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deletePetPost
      .execute(id)
      .then(() => res.status(204).json(null))
      .catch((err) => this.handleError(err, res));
  };

  approve = (req: Request, res: Response) => {
    const { id } = req.params;
    this.approvePetPost
      .execute(id)
      .then((message) => res.status(200).json(message))
      .catch((err) => this.handleError(err, res));
  };

  reject = (req: Request, res: Response) => {
    const { id } = req.params;
    this.rejectPetPost
      .execute(id)
      .then((message) => res.status(200).json(message))
      .catch((err) => this.handleError(err, res));
  };
}

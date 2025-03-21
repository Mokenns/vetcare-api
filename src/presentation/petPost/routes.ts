import { Request, Response, Router } from 'express';
import { PetPostController } from './controller';
import { FindAllPetPostService } from './services/findall-petpost.service';
import { CreatePetPostService } from './services/create-petpost.service';
import { FindPetPostService } from './services/find-petpost.service';
import { UpdatePetPostService } from './services/update-petpost.service';
import { DeletePetPostService } from './services/delete-petpost.service';
import { ApprovePetPostService } from './services/approve-petpost.service';
import { RejectPetPostService } from './services/reject-petpost.service';

export class PetPostRoutes {
  static get routes(): Router {
    const router = Router();

    const FindAllPetPost = new FindAllPetPostService();
    const CreatePetPost = new CreatePetPostService();
    const FindPetPost = new FindPetPostService();
    const UpdatePetPost = new UpdatePetPostService();
    const DeletePetPost = new DeletePetPostService();
    const ApprovePetPost = new ApprovePetPostService();
    const RejectPetPost = new RejectPetPostService();

    const controller = new PetPostController(
      FindAllPetPost,
      CreatePetPost,
      FindPetPost,
      UpdatePetPost,
      DeletePetPost,
      ApprovePetPost,
      RejectPetPost
    );

    router.get('/', controller.findAll);
    router.post('/', controller.create);
    router.get('/:id', controller.findOne);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.delete);
    router.patch('/:id/approve', controller.approve);
    router.patch('/:id/reject', controller.reject);

    return router;
  }
}

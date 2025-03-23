import { Request, Response, Router } from 'express';
import { PetPostController } from './controller';
import { FindAllPetPostService } from './services/findall-petpost.service';
import { CreatePetPostService } from './services/create-petpost.service';
import { FindPetPostService } from './services/find-petpost.service';
import { UpdatePetPostService } from './services/update-petpost.service';
import { DeletePetPostService } from './services/delete-petpost.service';
import { ApprovePetPostService } from './services/approve-petpost.service';
import { RejectPetPostService } from './services/reject-petpost.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserRole } from '../../data/postgres/models/user.model';

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

    router.use(AuthMiddleware.protect);
    router.get('/', controller.findAll);
    router.post(
      '/',
      AuthMiddleware.restrictTo(UserRole.USER),
      controller.create
    );
    router.get('/:id', controller.findOne);
    router.patch(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.USER),
      controller.update
    );
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.delete
    );
    router.patch(
      '/:id/approve',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.approve
    );
    router.patch(
      '/:id/reject',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.reject
    );

    return router;
  }
}

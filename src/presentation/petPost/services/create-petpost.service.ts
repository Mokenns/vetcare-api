import { PetPost } from '../../../data/postgres/models/petPost.model';
import { User } from '../../../data/postgres/models/user.model';
import { CreatePetPostDto, CustomError } from '../../../domain';

export class CreatePetPostService {
  async execute(petPostData: CreatePetPostDto, user: User) {
    const petPost = new PetPost();
    petPost.user = user;
    petPost.pet_name = petPostData.pet_name;
    petPost.description = petPostData.description;
    petPost.image_url = petPostData.image_url;
    petPost.status = petPostData.status;
    petPost.hasFound = petPostData.hasFound;
    petPost.created_at = petPostData.created_at;
    try {
      await petPost.save();
      return {
        message: 'Post created succesfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Error creating post');
    }
  }
}

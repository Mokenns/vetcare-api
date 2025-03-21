import { PetPost } from '../../../data/postgres/models/petPost.model';
import { CustomError } from '../../../domain';
import { UpdatePetPostDto } from '../../../domain/dtos/petposts/update-petpost.dto';

export class UpdatePetPostService {
  async execute(postId: string, petPostData: UpdatePetPostDto) {
    const petPost = await PetPost.findOne({
      select: [
        'id',
        'user',
        'pet_name',
        'description',
        'image_url',
        'status',
        'hasFound',
        'created_at',
      ],
      where: {
        id: postId,
      },
    });
    if (!petPost) throw CustomError.notFound('Post not found');

    petPost.pet_name = petPostData.pet_name;
    petPost.description = petPostData.description;
    petPost.image_url = petPostData.image_url;
    petPost.hasFound = petPostData.hasFound;

    try {
      await petPost.save();
      return {
        message: 'Post updated successfully',
      };
    } catch (error) {
      this.throwException(error);
    }
  }

  private throwException(error: any) {
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid data type');
    }

    throw CustomError.internalServer('Error trying to update post');
  }
}

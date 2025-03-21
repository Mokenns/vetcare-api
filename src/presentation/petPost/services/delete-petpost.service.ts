import { PetPost } from '../../../data/postgres/models/petPost.model';
import { CustomError } from '../../../domain';

export class DeletePetPostService {
  async execute(postId: string) {
    if (!postId) return 'id is required';
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
    if (!petPost) return 'Post not found';
    try {
      await petPost.remove();
      return {
        message: 'Post deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Error trying to delete post');
    }
  }
}

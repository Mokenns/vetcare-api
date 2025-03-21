import { PetPost } from '../../../data/postgres/models/petPost.model';
import { CustomError } from '../../../domain';
import { PostStatus } from '../../../data/postgres/models/petPost.model';

export class ApprovePetPostService {
  async execute(petPostId: string) {
    const petPost = await PetPost.findOne({
      where: { id: petPostId },
    });
    if (!petPost) throw CustomError.notFound('Post not found');

    petPost.status = PostStatus.APPROVED;

    try {
      await petPost.save();
      return {
        message: 'Post approved successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Error trying to approve post');
    }
  }
}

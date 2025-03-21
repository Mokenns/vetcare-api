import { PostStatus } from '../../../data/postgres/models/petPost.model';
import { User } from '../../../data/postgres/models/user.model';

export class CreatePetPostDto {
  constructor(
    public readonly pet_name: string,
    public readonly description: string,
    public readonly image_url: string,
    public readonly status: PostStatus = PostStatus.PENDING,
    public readonly hasFound: boolean = false,
    public readonly created_at: Date = new Date()
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreatePetPostDto?] {
    const { pet_name, description, image_url, status, hasFound, created_at } =
      object;

    if (!pet_name) return ['Pet name is required'];
    if (!description) return ['Description is required'];
    if (!image_url) return ['Image URL is required'];
    if (status && !Object.values(PostStatus).includes(status))
      return ['Invalid status'];
    if (hasFound !== undefined && typeof hasFound !== 'boolean')
      return ['hasFound must be a boolean'];

    return [
      undefined,
      new CreatePetPostDto(
        pet_name.trim(),
        description.trim(),
        image_url.trim(),
        status,
        hasFound,
        created_at
      ),
    ];
  }
}

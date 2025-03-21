export class UpdatePetPostDto {
  constructor(
    public pet_name: string,
    public description: string,
    public image_url: string,
    public hasFound: boolean
  ) {}

  static execute(object: { [key: string]: any }): [string?, UpdatePetPostDto?] {
    const { pet_name, description, image_url, hasFound } = object;

    if (!pet_name) return ['pet_name is required'];
    if (!description) return ['description is required'];
    if (!image_url) return ['image_url is required'];
    if (typeof hasFound !== 'boolean') return ['hasFound must be a boolean'];

    return [
      undefined,
      new UpdatePetPostDto(
        pet_name.trim(),
        description.trim(),
        image_url.trim(),
        hasFound
      ),
    ];
  }
}

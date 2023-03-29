import { UsersRepository } from '@/repositories/usersRepository';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

interface GetUserProfileRequest {
  userId: string;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileRequest) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError('User');
    }

    return { user };
  }
}

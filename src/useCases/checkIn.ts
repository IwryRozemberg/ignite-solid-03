import { CheckInsRepository } from '@/repositories/checkInsRepository';
import { GymsRepository } from '@/repositories/gymsRepository';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';
// import { UsersRepository } from '@/repositories/usersRepository';
// import { ResourceNotFoundError } from './errors/resourceNotFoundError';

interface CheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    // private usersRepository: UsersRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInRequest) {
    // const user = await this.usersRepository.findById(userId);
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError('Gym');
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) {
      throw new Error(`User [userId] already check-in today`);
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}

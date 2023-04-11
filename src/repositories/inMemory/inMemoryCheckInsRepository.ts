import { Prisma, CheckIn } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CheckInsRepository } from '../checkInsRepository';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private checkIns: CheckIn[] = [];
  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      gym_id,
      user_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    dayjs.extend(isBetween);

    const startOfTheDate = dayjs(date).startOf('date');
    const endOfTheDate = dayjs(date).endOf('date');

    const checkInOnSameDate = this.checkIns.find((c) => {
      const checkInDate = dayjs(c.created_at);
      const inOnSameDate = checkInDate.isBetween(
        startOfTheDate,
        endOfTheDate,
        'day',
        '[]',
      );

      return c.user_id === userId && inOnSameDate;
    });

    return checkInOnSameDate || null;
  }
}

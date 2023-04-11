import { Gym, Prisma } from '@prisma/client';
import { GymsRepository } from '../gymsRepository';
import { randomUUID } from 'crypto';
import { Decimal } from '@prisma/client/runtime/binary';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      phone: data.phone ?? null,
    };

    this.items.push(gym);

    return gym;
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((x) => x.id === gymId);

    return gym || null;
  }
}

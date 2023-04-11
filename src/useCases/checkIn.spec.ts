import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInsRepository } from '@/repositories/checkInsRepository';
import { CheckInUseCase } from './checkIn';
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemoryCheckInsRepository';
import { GymsRepository } from '@/repositories/gymsRepository';
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemoryGymsRepository';
import { ResourceNotFoundError } from './errors/resourceNotFoundError';

let repository: CheckInsRepository;
let gymsRepository: GymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    repository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(repository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'JD',
      gymId: 'gym-01',
      userLatitude: -16.7022371,
      userLongitude: -49.2537428,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 3, 5, 0, 0, 0));

    await sut.execute({
      userId: 'JD',
      gymId: 'gym-01',
      userLatitude: -16.7022371,
      userLongitude: -49.2537428,
    });

    await expect(() =>
      sut.execute({
        userId: 'JD',
        gymId: 'gym-01',
        userLatitude: -16.7022371,
        userLongitude: -49.2537428,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 3, 5, 0, 0, 0));

    await sut.execute({
      userId: 'JD',
      gymId: 'gym-01',
      userLatitude: -16.7022371,
      userLongitude: -49.2537428,
    });

    vi.setSystemTime(new Date(2023, 3, 10));

    const { checkIn } = await sut.execute({
      userId: 'JD',
      gymId: 'gym-01',
      userLatitude: -16.7022371,
      userLongitude: -49.2537428,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be no able to check in not existing gym', async () => {
    await expect(async () =>
      sut.execute({
        userId: 'user-01',
        gymId: 'not-existing-gym',
        userLatitude: -16.7022371,
        userLongitude: -49.2537428,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

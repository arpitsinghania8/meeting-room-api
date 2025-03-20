import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { RoomService } from '../rooms/room.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

describe('BookingService', () => {
  let service: BookingService;
  //   let roomService: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingService, RoomService],
    }).compile();

    service = module.get<BookingService>(BookingService);
    // roomService = module.get<RoomService>(RoomService);
  });

  describe('create', () => {
    const createBookingDto: CreateBookingDto = {
      userId: 'user1',
      startTime: '2025-01-01T10:00:00Z',
      endTime: '2025-01-01T11:00:00Z',
    };

    it('should create a booking successfully', () => {
      const booking = service.create('1', createBookingDto);
      expect(booking).toBeDefined();
      expect(booking.roomId).toBe('1');
      expect(booking.userId).toBe('user1');
    });

    it('should throw BadRequestException for invalid time range', () => {
      const invalidDto = {
        ...createBookingDto,
        startTime: '2025-01-01T11:00:00Z',
        endTime: '2025-01-01T10:00:00Z',
      };
      expect(() => service.create('1', invalidDto)).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for conflicting bookings', () => {
      service.create('1', createBookingDto);
      expect(() => service.create('1', createBookingDto)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update a booking successfully', () => {
      const booking = service.create('1', {
        userId: 'user1',
        startTime: '2025-01-01T10:00:00Z',
        endTime: '2025-01-01T11:00:00Z',
      });

      const updateDto: UpdateBookingDto = {
        userId: 'user2',
      };

      const updated = service.update('1', booking.id, updateDto);
      expect(updated.userId).toBe('user2');
    });

    it('should throw NotFoundException for non-existent booking', () => {
      expect(() =>
        service.update('1', 'non-existent', { userId: 'user2' }),
      ).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a booking successfully', () => {
      const booking = service.create('1', {
        userId: 'user1',
        startTime: '2025-01-01T10:00:00Z',
        endTime: '2025-01-01T11:00:00Z',
      });

      service.delete('1', booking.id);
      expect(() => service.findById('1', booking.id)).toThrow(
        NotFoundException,
      );
    });
  });
});

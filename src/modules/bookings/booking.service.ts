import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Booking } from './booking.model';
import { RoomService } from '../rooms/room.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

@Injectable()
export class BookingService {
  private bookings: Booking[] = [];

  constructor(private readonly roomService: RoomService) {}

  findByRoomId(roomId: string): Booking[] {
    return this.bookings.filter((booking) => booking.roomId === roomId);
  }

  create(roomId: string, createBookingDto: CreateBookingDto): Booking {
    // Verify room exists
    this.roomService.findById(roomId);

    const startTime = new Date(createBookingDto.startTime);
    const endTime = new Date(createBookingDto.endTime);

    if (startTime >= endTime) {
      throw new BadRequestException('Start time must be before end time');
    }

    // Check for booking conflicts
    const hasConflict = this.bookings.some((booking) => {
      return (
        booking.roomId === roomId &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime))
      );
    });

    if (hasConflict) {
      throw new BadRequestException(
        'Room is already booked for this time slot',
      );
    }

    const booking = new Booking({
      id: Date.now().toString(),
      roomId,
      userId: createBookingDto.userId,
      startTime,
      endTime,
    });

    this.bookings.push(booking);
    return booking;
  }

  findById(roomId: string, bookingId: string): Booking {
    const booking = this.bookings.find(
      (b) => b.roomId === roomId && b.id === bookingId,
    );
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);
    }
    return booking;
  }

  update(
    roomId: string,
    bookingId: string,
    updateBookingDto: UpdateBookingDto,
  ): Booking {
    const booking = this.findById(roomId, bookingId);
    const startTime = updateBookingDto.startTime
      ? new Date(updateBookingDto.startTime)
      : booking.startTime;
    const endTime = updateBookingDto.endTime
      ? new Date(updateBookingDto.endTime)
      : booking.endTime;

    if (startTime >= endTime) {
      throw new BadRequestException('Start time must be before end time');
    }

    // Check for booking conflicts excluding the current booking
    const hasConflict = this.bookings.some((b) => {
      if (b.id === bookingId) return false;
      return (
        b.roomId === roomId &&
        ((startTime >= b.startTime && startTime < b.endTime) ||
          (endTime > b.startTime && endTime <= b.endTime))
      );
    });

    if (hasConflict) {
      throw new BadRequestException(
        'Room is already booked for this time slot',
      );
    }

    const updatedBooking = {
      ...booking,
      ...updateBookingDto,
      startTime,
      endTime,
    };

    const index = this.bookings.findIndex((b) => b.id === bookingId);
    this.bookings[index] = updatedBooking;

    return updatedBooking;
  }

  delete(roomId: string, bookingId: string): void {
    const index = this.bookings.findIndex((b) => b.id === bookingId);
    this.bookings.splice(index, 1);
  }
}

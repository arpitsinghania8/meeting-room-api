import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';

@Controller('rooms/:roomId/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  findByRoomId(@Param('roomId') roomId: string): Booking[] {
    return this.bookingService.findByRoomId(roomId);
  }

  @Post()
  create(
    @Param('roomId') roomId: string,
    @Body() createBookingDto: CreateBookingDto,
  ): Booking {
    return this.bookingService.create(roomId, createBookingDto);
  }

  @Put(':bookingId')
  update(
    @Param('roomId') roomId: string,
    @Param('bookingId') bookingId: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Booking {
    return this.bookingService.update(roomId, bookingId, updateBookingDto);
  }

  @Delete(':bookingId')
  delete(
    @Param('roomId') roomId: string,
    @Param('bookingId') bookingId: string,
  ): void {
    return this.bookingService.delete(roomId, bookingId);
  }
}

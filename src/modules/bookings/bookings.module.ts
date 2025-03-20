import { Module } from '@nestjs/common';
import { RoomsModule } from '../rooms/rooms.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [RoomsModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingsModule {}

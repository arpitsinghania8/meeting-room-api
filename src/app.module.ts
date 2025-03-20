import { Module } from '@nestjs/common';
import { RoomsModule } from './modules/rooms/rooms.module';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
  imports: [RoomsModule, BookingsModule],
})
export class AppModule {}

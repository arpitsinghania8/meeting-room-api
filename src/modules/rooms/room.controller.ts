import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.model';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll(): Room[] {
    return this.roomService.findAll();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './room.model';

@Injectable()
export class RoomService {
  private rooms: Room[] = [
    new Room({ id: '1', name: 'Conference Room A', capacity: 10 }),
    new Room({ id: '2', name: 'Meeting Room B', capacity: 6 }),
  ];

  findAll(): Room[] {
    return this.rooms;
  }

  findById(id: string): Room {
    const room = this.rooms.find((room) => room.id === id);
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }
}

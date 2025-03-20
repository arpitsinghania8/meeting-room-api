import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomService],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  describe('findAll', () => {
    it('should return an array of rooms', () => {
      const rooms = service.findAll();
      expect(rooms).toBeInstanceOf(Array);
      expect(rooms.length).toBeGreaterThan(0);
    });
  });

  describe('findById', () => {
    it('should return a room if found', () => {
      const room = service.findById('1');
      expect(room).toBeDefined();
      expect(room.id).toBe('1');
    });

    it('should throw NotFoundException if room not found', () => {
      expect(() => service.findById('999')).toThrow(NotFoundException);
    });
  });
});

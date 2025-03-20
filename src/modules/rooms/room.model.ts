export class Room {
  id: string;
  name: string;
  capacity: number;
  features?: string[];

  constructor(partial: Partial<Room>) {
    Object.assign(this, partial);
  }
}

export class Booking {
  id: string;
  roomId: string;
  userId: string;
  startTime: Date;
  endTime: Date;

  constructor(partial: Partial<Booking>) {
    Object.assign(this, partial);
  }
}

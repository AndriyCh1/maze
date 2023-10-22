import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id/user/:userId/replay')
  async getReplay(
    @Param('id') roomId: string,
    @Param('userId') userId: string,
  ) {
    return await this.roomService.getReplay(roomId, userId);
  }
}

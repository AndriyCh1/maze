import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { RoomsManager } from './rooms.manager';

@Module({
  imports: [UserModule, RoomModule],
  providers: [GameGateway, RoomsManager],
})
export class GameModule {}

import { IsString } from 'class-validator';
import { Command } from '../../common/constants';

export class CommandDto {
  @IsString()
  command: Command;

  @IsString()
  roomId: string;
}

import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  message: string;

  @IsString()
  roomId: string;
}

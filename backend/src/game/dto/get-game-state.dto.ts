import { IsString } from 'class-validator';

export class GetGameStateDto {
  @IsString()
  roomId: string;
}

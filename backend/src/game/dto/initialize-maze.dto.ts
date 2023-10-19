import { IsString } from 'class-validator';

export class InitializeMazeDto {
  @IsString()
  roomId: string;
}

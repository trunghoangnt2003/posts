import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @Length(4, 40)
  title: string;
  @MaxLength(255)
  description: string;
}

import { ApiProperty } from '@nestjs/swagger';
export class CreateUserPostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

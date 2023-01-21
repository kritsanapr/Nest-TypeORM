import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfileDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  dob: string;
}

/* eslint-disable prettier/prettier */
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  // @IsString()
  // @MinLength(8)
  // @MaxLength(20)
  // @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  // email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: `At least 8 characters long.
Contains at least one lowercase letter.
Contains at least one uppercase letter.
Contains at least one digit.
Contains at least one special character from the set @$!%*?&.`,
    },
  )
  password: string;
}

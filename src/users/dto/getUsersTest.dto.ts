import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class UserData {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  age: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  active: boolean;
}

class CompanyData {
  @IsString()
  @IsOptional()
  companyName: string;

  @IsString()
  @IsOptional()
  companyPhone: string;
}

export class GetUsersTestDto {
  @IsOptional()
  @Transform(
    ({ value }) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },
    { toClassOnly: true },
  )
  @ValidateNested()
  @Type(() => UserData)
  user: UserData;

  @IsOptional()
  @Transform(
    ({ value }) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },
    { toClassOnly: true },
  )
  @ValidateNested()
  @Type(() => CompanyData)
  company: CompanyData;
}

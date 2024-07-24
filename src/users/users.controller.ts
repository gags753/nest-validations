import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { GetUsersTestDto } from './dto/getUsersTest.dto';

@Controller('users')
export class UsersController {
  @Get()
  async getUsersTest(
    @Query(new ValidationPipe({ transform: true })) data: GetUsersTestDto,
  ) {
    return data;
  }
}

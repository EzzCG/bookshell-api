import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /api/auth/login
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  // GET /api/auth/me - just to test the token
  @UseGuards(JwtAuthGuard)
  @Get('me')
  // async me(@Req() req: any) {
  async me(@CurrentUser() user: any) {
    //now currentUser can take parameters @CurrentUser('email')
    return user; // set by JwtStrate       gy.validate()
    // return req.user; // set by JwtStrate       gy.validate()
  }
}

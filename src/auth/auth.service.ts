import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};
@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: '1',
      email: 'test@example.com',
      password: 'password123', // don't do this in production 😅
      name: 'Test User',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = this.users.find((u) => u.email === email);

    // In real life: compare hash with bcrypt.compare(...)
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Don't return password
    const { password: _pw, ...safeUser } = user;
    return safeUser;
  }

  async login(user: { id: string; email: string; name: string }) {
    const payload = { sub: user.id, email: user.email, name: user.name };

    // Create JWT token
    const token = await this.jwtService.signAsync(payload);
    //waits for JWT creation, pauses only this function

    return {
      access_token: token,
      user: payload,
    };
  }
}

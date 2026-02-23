import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Where to read token from: Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-key-change-me',
    });
  }

  validate(payload: JwtPayload) {
    // This 'payload' is the content we signed in AuthService login()
    // It becomes req.user in guards/controllers
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}

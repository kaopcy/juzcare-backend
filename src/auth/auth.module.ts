import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from 'src/admins/admins.module';
import { AdminsService } from 'src/admins/admins.service';
import { Admin } from 'src/admins/models/admin';
import { User, UserSchema } from 'src/users/models/user';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthAdminResolver } from './auth.resolve.admin';
import { AuthUserResolver } from './auth.resolver.user';
import { AuthAdminService } from './auth.service.admin';
import { AuthUserService } from './auth.service.user';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    AdminsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d'
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [AuthUserService, UsersService, JwtStrategy, AuthUserResolver, AdminsService, AuthAdminResolver, AuthAdminService]
})
export class AuthModule { }

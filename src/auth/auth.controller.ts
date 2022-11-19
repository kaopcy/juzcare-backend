// import { Controller, Post, Req, UseGuards } from '@nestjs/common';
// import { Request } from 'express';
// import { User } from 'src/users/models/user';
// import { UsersService } from 'src/users/users.service';
// import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { LocalAuthGuard } from './guards/local-auth.guard';

// @Controller('auth')
// export class AuthController {
//     constructor(
//         private readonly authService: AuthService,
//         private readonly usersService: UsersService,
//     ) { }

//     // @UseGuards(LocalAuthGuard)
//     // @Post('login')
//     // login(@Req() req: Request): { accessToken: string } {        
//     //     return this.authService.login(req.user as User)
//     // }

//     @UseGuards(JwtAuthGuard)
//     @Post('repassword')
//     async rePassword(@Req() req: Request): Promise<any> {
//         console.log(req.headers.authorization);
//         console.log(await this.authService.verify(req.headers.authorization.split(' ')[1]));
        
//         return await this.usersService.rePasswordUser(req.body as { _id: string; oldPassword: string; newPassword: string; })
//     }
// }

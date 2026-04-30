import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }

    @Post('/login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Get()
    findAll() {
        return this.authService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authService.findOne(+id);
    }
    
    @Get('/profile')
    @UseGuards(AuthGuard)
    profile() {
        return('Perfil de usuario solo con token')
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return this.authService.update(+id, updateAuthDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.authService.remove(+id);
    }
}

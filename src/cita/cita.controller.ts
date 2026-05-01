import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth('access-token') // 👈 mismo nombre
@UseGuards(AuthGuard)
@Controller('citas')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Post()
  create(@Body() createCitaDto: CreateCitaDto, @Req() req) {
    return this.citaService.create(createCitaDto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.citaService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citaService.update(+id, updateCitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citaService.remove(+id);
  }
}
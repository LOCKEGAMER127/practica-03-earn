import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private citaRepository: Repository<Cita>,
  ) {}

  create(createCitaDto: CreateCitaDto, user) {
    const cita = this.citaRepository.create({
      ...createCitaDto,
      usuario: user,
    });
    return this.citaRepository.save(cita);
  }

  findAll(user) {
    return this.citaRepository.find({
      where: { usuario: { id: user.id } },
    });
  }

  findOne(id: number) {
    return this.citaRepository.findOneBy({ id });
  }

  update(id: number, updateCitaDto: UpdateCitaDto) {
    return this.citaRepository.update(id, updateCitaDto);
  }

  remove(id: number) {
    return this.citaRepository.delete(id);
  }
}
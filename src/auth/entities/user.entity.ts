import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cita } from '../../cita/entities/cita.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Cita, (cita) => cita.usuario)
  citas!: Cita[];
}
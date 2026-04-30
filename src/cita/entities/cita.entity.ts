import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Cita {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column({ type: 'date' })
  fecha !: string;

  @Column({ type: 'time' })
  hora !: string;

  @Column({ nullable: true })
  descripcion !: string;

  @Column({ default: 'pendiente' })
  estado !: string;

  @ManyToOne(() => User, (user) => user.citas)
  usuario!: User;;
}
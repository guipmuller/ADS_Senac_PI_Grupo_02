import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Appointment } from "./Appointment";

@Entity({ name: "Patients", schema: "public" })
export class Patient {
  @PrimaryGeneratedColumn()
  idPatient!: number;
  @Column({ type: "varchar", nullable: false })
  patientName!: string;
  @Column({ type: "varchar", nullable: false, unique: true })
  patientCpf!: string;
  @Column({ type: "date", nullable: false })
  patientBirthDate!: Date;
  @CreateDateColumn()
  createAt!: Date;
  @UpdateDateColumn()
  updateAt!: Date;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn({ name: "idUser" })
  user: any;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments!: Appointment[];
}

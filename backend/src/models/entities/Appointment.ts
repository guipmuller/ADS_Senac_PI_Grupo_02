import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Patient } from "./Patient";
import { CareProfessional } from "./CareProfessional";

@Entity({ name: "Appointments", schema: "public" })
export class Appointment {
  @PrimaryGeneratedColumn()
  idAppointment!: number;
  @Column({ type: "timestamp", nullable: false })
  scheduledAt!: Date;
  @Column({ type: "varchar", length: 10, nullable: false })
  status!: AppointmentStatus;
  @Column({ type: "varchar", nullable: false, unique: true })
  idLocation!: number;
  @CreateDateColumn()
  createAt!: Date;
  @UpdateDateColumn()
  updateAt!: Date;

  @OneToOne(() => Patient)
  @JoinColumn({ name: "idPatient" })
  patient!: Patient;

  @ManyToOne(() => CareProfessional)
  @JoinColumn({ name: "idCareProfessional" })
  careProfessional!: CareProfessional;
}

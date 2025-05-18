import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Patient } from "./Patient";
import { CareProfessional } from "./CareProfessional";
import { Address } from "./Address";
import { AppointmentStatus } from "../enums/AppointmentStatus";

@Entity({ name: "Appointments", schema: "public" })
export class Appointment {
  @PrimaryGeneratedColumn()
  idAppointment!: number;
  @Column({ type: "timestamp", nullable: false })
  scheduledAt!: Date;
  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
    nullable: false,
  })
  status!: AppointmentStatus;
  @Column({ type: "varchar", nullable: false })
  idAddress!: number;
  @CreateDateColumn()
  createAt!: Date;
  @UpdateDateColumn()
  updateAt!: Date;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: "idPatient" })
  patient: any;

  @ManyToOne(() => CareProfessional)
  @JoinColumn({ name: "idCareProfessional" })
  careProfessional!: CareProfessional;

  @ManyToOne(() => Address, (address) => address.appointments, {
    nullable: false,
  })
  @JoinColumn({ name: "idAddress" })
  address!: Address;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "../../patient/entities/Patient";
import { CareProfessional } from "../../careProfessional/entities/CareProfessional";
import { AppointmentStatus } from "../enums/AppointmentStatus";
import { Address } from "../../address/entities/Address";

@Entity({ name: "Appointments", schema: "public" })
export class Appointment {
  @PrimaryGeneratedColumn()
  idAppointment!: number;
  @Column({ type: "timestamp", nullable: false })
  scheduledAt!: Date;
  @Column({ type: "int", nullable: false })
  idPatient!: number;
  @Column({ type: "int", nullable: false })
  idCareProfessional!: number;
  @Column({ type: "int", nullable: false })
  idAddress!: number;
  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
    nullable: false,
  })
  status!: AppointmentStatus;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

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

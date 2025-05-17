import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "Patients", schema: "public" })
export class Patient {
  @PrimaryGeneratedColumn()
  idPatient!: number;
  @Column({ type: "varchar", nullable: false })
  patientName!: string;
  @Column({ type: "varchar", nullable: false, unique: true })
  patientCPF!: string;
  @Column({ type: "date", nullable: false })
  patientBirthDate!: Date;
  @CreateDateColumn()
  createAt!: Date;
  @UpdateDateColumn()
  updateAt!: Date;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn({ name: "idUser" })
  user: any;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Patient } from "./Patient";
import { CareProfessional } from "./CareProfessional";

@Entity({ name: "Reviews", schema: "public" })
export class Review {
  @PrimaryGeneratedColumn()
  idReview!: number;
  @Column({ type: "int", nullable: false })
  rating!: number;
  @Column({ type: "varchar", length: 250, nullable: true })
  comment?: string;
  @Column({ type: "varchar" })
  idPatient!: number;
  @Column({ type: "varchar" })
  idCareProfessional!: number;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "idPatient" })
  patient!: Patient;

  @ManyToOne(() => CareProfessional)
  @JoinColumn({ name: "idCareProfessional" })
  careProfessional!: CareProfessional;
}

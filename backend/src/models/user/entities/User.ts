import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "../../patient/entities/Patient";
import { CareProfessional } from "../../careProfessional/entities/CareProfessional";

@Entity({ name: "Users", schema: "public" })
export class User {
  @PrimaryGeneratedColumn()
  idUser!: number;
  @Column({ type: "varchar", unique: true })
  firebaseUid!: string;
  @Column({ type: "varchar", length: 150, nullable: false })
  name!: string;
  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  email!: string;
  @Column({ type: "varchar", length: 15, nullable: false })
  phoneNumber!: string;
  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  cpf!: string
  @Column({ type: "varchar", nullable: true, length: 150 })
  urlImage?: string | null
  @Column({ type: "boolean", nullable: false })
  isPatient!: boolean
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Patient, (patient) => patient.user)
  patient?: Patient;

  @OneToOne(() => CareProfessional, (careProfessional) => careProfessional.user)
  careProfessional?: CareProfessional;
};
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "./Patient";
import { CareProfessional } from "./CareProfessional";

@Entity({ name: "Users", schema: "public" })
export class User {
  @PrimaryGeneratedColumn()
  idUser!: number;
  @Column({ type: "varchar", length: 150, nullable: false })
  name!: string;
  @Column({ type: "varchar", length: 150, nullable: false, unique: true })
  email!: string;
  @Column({ type: "varchar", length: 15, nullable: false })
  phoneNumber!: string;
  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  cpf!: string
  @Column({ type: "varchar", length: 150 })
  urlImage!: string
  @CreateDateColumn()
  createAt!: Date;
  @UpdateDateColumn()
  updateAt!: Date;

  @OneToOne(() => Patient, (patient) => patient.user)
  patient?: Patient;

  @OneToOne(() => CareProfessional, (careProfessional) => careProfessional.user)
  careProfessional?: CareProfessional;
};
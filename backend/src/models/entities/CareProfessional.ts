import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "CareProfessionals", schema: "public" })
export class CareProfessional {
  @PrimaryGeneratedColumn()
  idCareProfessional!: number;
  @Column({ type: "int", nullable: false })
  idUser!: number;
  @Column({ type: "varchar", nullable: false })
  professionalRegistryCode!: string;
  @Column({ type: "varchar", nullable: false })
  professionalBiography!: string;
  @Column({ type: "float", nullable: true })
  rating?: number;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => User, (user) => user.careProfessional)
  @JoinColumn({ name: "idUser" })
  user: any;
}

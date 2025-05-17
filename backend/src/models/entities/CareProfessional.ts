import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User.js";

@Entity({ name: "CareProfessionals", schema: "public" })
export class CareProfessional {
  @PrimaryGeneratedColumn()
  idCareProfessional!: number;
  @Column({ type: "varchar", nullable: false })
  professionalRegistryCode!: string;
  @Column({ type: "varchar", nullable: false })
  professionalBiography!: string;
  @Column({ type: "float", nullable: false })
  rating!: number;
  @CreateDateColumn()
  createAt!: Date;
  @UpdateDateColumn()
  updateAt!: Date;

  @OneToOne(() => User, (user) => user.careProfessional)
  @JoinColumn({ name: "idUser" })
  user: any;
}

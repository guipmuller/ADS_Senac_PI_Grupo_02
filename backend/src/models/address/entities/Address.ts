import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "../../appointment/entities/Appointment";


@Entity({ name: "Addresses", schema: "public" })
export class Address {
  @PrimaryGeneratedColumn()
  idAddress!: number;
  @Column({ type: "varchar", length: 150, nullable: false })
  street!: string;
  @Column({ type: "varchar", length: 20, nullable: false })
  number!: string;
  @Column({ type: "varchar", length: 150, nullable: true })
  complement?: string | null;
  @Column({ type: "varchar", length: 40, nullable: false })
  neighborhood!: string;
  @Column({ type: "varchar", length: 40, nullable: false })
  city!: string;
  @Column({ type: "varchar", length: 40, nullable: false })
  state!: string;
  @Column({ type: "varchar", length: 9, nullable: false })
  postalCode!: string;
  @Column({ type: "varchar", length: 20, nullable: false })
  country!: string;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.address)
  appointments!: Appointment[];
}

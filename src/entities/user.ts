import "reflect-metadata";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false, type: "varchar" })
  firstname!: string;

  @Column({ nullable: false, type: "varchar" })
  lastname!: string;

  @Column({ nullable: false, type: "varchar" })
  email!: string;

  @Column({ nullable: false, type: "varchar" })
  password!: string;

  @Column({ type: "boolean", default: true })
  isActive = true;

  @Column({ type: "varchar", nullable: true, array: true })
  refreshToken?: string[];

  @Column({ nullable: false, type: "varchar" })
  phone?: string;

  @Column({ nullable: false, type: "varchar" })
  country?: string;
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  country?: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface UserLoginDto {
  password: string;
  email: string;
}

export interface loginResponseDto {
  accessToken: string;
  refreshToken: string;
}

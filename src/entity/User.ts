import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, MinLength } from "class-validator";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @MinLength(6)
    password: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}


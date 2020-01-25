import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Template from './Template';
import Screen from './Screen';

@Entity()
export default class Ratio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    name: string;

    @Column({ length: 20 })
    value: string;

    @Column({ length: 60 })
    description: string;

    @Column()
    type: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column('timestamptz', { nullable: true })
    deletedAt?: Date;

    @OneToMany(() => Template, template => template.ratio)
    templates: Template[];

    @OneToMany(() => Screen, screen => screen.ratio)
    screens: Screen[];
};

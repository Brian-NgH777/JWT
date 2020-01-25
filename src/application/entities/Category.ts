import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Template from './Template';
import Screen from './Screen';

@Entity()
export default class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    name: string;

    @Column({ length: 20 })
    value: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column('timestamptz', { nullable: true })
    deletedAt?: Date;

    @OneToMany(() => Template, template => template.category)
    templates: Template[];

    @OneToMany(() => Screen, screen => screen.category)
    screens: Screen[];
};

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';
import Category from './Category';
import Ratio from './Ratio';
import TemplateData from '../models/template/TemplateData';

@Entity()
export default class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.templates)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Category, category => category.templates)
    @JoinColumn()
    category: Category;

    @ManyToOne(() => Ratio, ratio => ratio.templates)
    @JoinColumn()
    ratio: Ratio;

    @Column()
    userId: number;

    @Column({ nullable: true })
    categoryId?: number;

    @Column({ nullable: true })
    ratioId?: number;

    @Column()
    code: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 300 })
    slug: string;

    @Column()
    isDrag: boolean;

    @Column({ type: 'simple-json', nullable: true })
    template?: TemplateData;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column('timestamptz', { nullable: true })
    deletedAt?: Date;
};

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Template from './Template';
import User from './User';
import Category from './Category';
import Ratio from './Ratio';
@Entity()
export default class Screen {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, unique: true })
    name: string;

    @Column({ length: 300, nullable: true })
    slug: string;

    @Column({ type: 'simple-json', nullable: true })
    template?: Template;

    @ManyToOne(() => Category, category => category.screens)
    @JoinColumn()
    category: Category;

    @ManyToOne(() => Ratio, ratio => ratio.screens)
    @JoinColumn()
    ratio: Ratio;

    @Column({ nullable: true })
    categoryId?: number;

    @Column({ nullable: true })
    ratioId?: number;

    @ManyToOne(() => User, user => user.screens)
    @JoinColumn()
    user: User;

    @Column()
    userId: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column('timestamptz', { nullable: true })
    deletedAt?: Date;
};

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.medias)
    @JoinColumn()
    user: User;

    @Column()
    userId: number;

    @Column({ length: 300 })
    name: string;

    @Column({ length: 300 })
    slug: string;

    @Column({ length: 2000 })
    description?: string;

    @Column({ type: 'simple-json', nullable: true })
    screens?: any;

    @Column({ length: 20, nullable: true })
    status: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column('timestamptz', { nullable: true })
    deletedAt?: Date;
};

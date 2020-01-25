import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index, JoinColumn, OneToMany } from 'typeorm';
import Role from './Role';
import { Gender } from '../models/common/Enum';
import Media from './Media';
import Screen from './Screen';
import Template from './Template';
import Playlist from './Playlist';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn()
    role: Role;

    @Column()
    roleId: number;

    @Column({ length: 20 })
    firstName: string;

    @Column({ length: 20, nullable: true })
    lastName?: string;

    @Column({ length: 200 })
    @Index({ unique: true })
    email: string;

    @Column({ length: 32 })
    password: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column('smallint', { nullable: true })
    gender?: Gender;

    @Column('date', { nullable: true })
    birthday?: Date;

    @Column({ length: 20, nullable: true })
    phone?: string;

    @Column({ length: 200, nullable: true })
    address?: string;

    @Column({ length: 5, nullable: true })
    culture?: string;

    @Column({ length: 3, nullable: true })
    currency?: string;

    @Column({ nullable: true })
    accessToken?: string;

    @Column({ length: 64, nullable: true })
    keyRandom?: string;

    @Column('timestamptz', { nullable: true })
    tokenExpire?: Date;

    @Column({ default: false })
    accountExpire: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column('timestamptz', { nullable: true })
    deletedAt?: Date;

    @OneToMany(() => Media, media => media.user)
    medias: Media[];

    @OneToMany(() => Screen, screen => screen.user)
    screens: Screen[];

    @OneToMany(() => Template, template => template.user)
    templates: Template[];

    @OneToMany(() => Playlist, playlist => playlist.user)
    playlists: Playlist[];
};

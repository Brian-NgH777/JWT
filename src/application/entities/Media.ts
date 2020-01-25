import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import User from './User';
import { MediaType } from '../models/common/Enum';
import MediaImageInfo from '../models/media/MediaImageInfo';
import MediaVideoInfo from '../models/media/MediaVideoInfo';
import MediaMusicInfo from '../models/media/MediaMusicInfo';

@Entity()
export default class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.medias)
    @JoinColumn()
    user: User;

    @Column()
    userId: number;

    @Column({ length: 200 })
    name: string;

    @Column({ enum: MediaType })
    type: MediaType;

    @ManyToOne(() => Media, media => media.thumbnailDefault)
    @JoinColumn()
    thumbnail?: Media;

    @Column({ nullable: true })
    thumbnailId?: number;

    @Column({ type: 'simple-json', nullable: true })
    videoInfo?: MediaVideoInfo;

    @Column({ type: 'simple-json', nullable: true })
    musicInfo?: MediaMusicInfo;

    @Column({ type: 'simple-json', nullable: true })
    imageInfo?: MediaImageInfo;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column('timestamptz', { nullable: true })
    deletedAt?: Date;

    @OneToMany(() => Media, media => media.thumbnail)
    thumbnailDefault: Media[];
};

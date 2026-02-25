import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artists-entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date', nullable: true })
  releaseDate?: string;

  @Column({ nullable: true })
  coverUrl: string;

  // @ManyToMany(() => Artist, (artist) => artist.albums, { onDelete: 'CASCADE' })
  // @OneToMany(() => Track, (track) => track.album)
  @CreateDateColumn()
  createdAt: Date;
}

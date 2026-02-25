import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('json')
  artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text', { default: null })
  lyrics: string;

  // @ManyToMany(() => Artist, (artists) => artists.songs)

  //   @JoinTable({ name: 'songs_artists' })
  //   artists: Artists[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio?: string;

  //   @OneToMany(() => Album, (album) => album.artist)
  //   albums: Album[];

  //   @ManyToMany(() => Track, (track) => track.artists)
  //   tracks: Track[];

  @CreateDateColumn()
  createDate: Date;
}

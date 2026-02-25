import { Body, Controller, Get, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  getAll() {
    return this.songsService.getAllSongs();
  }

  @Post()
  create(@Body() dto: CreateSongDto) {
    return this.songsService.createSong();
  }
}

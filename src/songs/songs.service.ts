import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  getAllSongs() {
    return [];
  }

  getSongById(id: string) {
    return;
  }

  createSong() {}

  deleteSong() {}
}

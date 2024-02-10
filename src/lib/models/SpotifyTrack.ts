import type { SpotifyArtist } from '$lib/models/SpotifyArtist';
import type { SpotifyAlbum } from '$lib/models/SpotifyAlbum';

export interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    duration_ms: number;
    track_number: string;
}

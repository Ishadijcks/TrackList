import type { SpotifyArtist } from '$lib/models/SpotifyArtist';

export const msToMMSS = (ms: number): string => {
    const mm = Math.floor(ms / (60 * 1000))
        .toString()
        .padStart(2, '0');
    const ss = (Math.floor(ms / 1000) % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
};

export const formatName = (name: string): string => {
    // Remove all bracketed stuff
    return name.replace(/ *\([^)]*\) */g, '').split('- ')[0];
};

export const formatArtists = (artists: SpotifyArtist[]) => {
    return artists.map((a) => a.name).join(', ');
};

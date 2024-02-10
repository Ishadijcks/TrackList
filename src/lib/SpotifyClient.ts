import { writable } from 'svelte/store';

export class SpotifyClient {
    clientId: string;
    redirectUri: string;
    scope: string;

    constructor(clientId: string, redirectUri: string, scope: string) {
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.scope = scope;
    }

    /**
     * Calls Spotify to create a challenge and returns the URL to navigate to
     */
    public async authorize() {
        const codeVerifier = this.generateRandomString(64);

        const hashed = await this.sha256(codeVerifier);
        const codeChallenge = this.base64encode(hashed);

        const authUrl = new URL('https://accounts.spotify.com/authorize');

        // generated in the previous step
        window.localStorage.setItem('code_verifier', codeVerifier);

        const params = {
            response_type: 'code',
            client_id: this.clientId,
            scope: this.scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: this.redirectUri,
        };

        console.log(params);

        authUrl.search = new URLSearchParams(params).toString();
        return authUrl.toString();
    }

    public generateRandomString = (length: number): string => {
        const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], '');
    };

    public sha256 = async (plain: string): Promise<ArrayBuffer> => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    };

    public base64encode = (input: ArrayBuffer) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    public getToken = async (code: string): Promise<string> => {
        // stored in the previous step
        let codeVerifier = localStorage.getItem('code_verifier') as string;

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: this.redirectUri,
                code_verifier: codeVerifier,
            }),
        };

        const authUrl = new URL('https://accounts.spotify.com/api/token');

        const body = await fetch(authUrl, payload);
        const response = await body.json();

        return response.access_token;
    };

    public async getQueueData() {
        const accessToken = localStorage.getItem('access_token');

        const response = await fetch('https://api.spotify.com/v1/me/player/queue', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        });

        const data = await response.json();

        console.log(data);
        return data;
    }
}

export const client = writable(
    new SpotifyClient(
        '4ba0f7fd84a544ba9d640e7cc39ea622',
        'http://localhost:5173/callback',
        'user-read-currently-playing user-read-playback-state',
    ),
);

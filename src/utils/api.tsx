import type {NewsData} from "../components/NewsCard.tsx";

const API_BASE_URL = 'https://twenty-backend.thinkinggms.com';

export interface UserData {
    id: string;
    name: string;
    email: string;
    picture: string;
    provider: 'GOOGLE' | 'DISCORD';
    role: 'ADMIN' | 'USER';
}

export interface NewsList {
    newsList: NewsData[];
}

export const api = {
    // 사용자 정보 조회
    async getMe(): Promise<UserData> {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                throw new Error('Unauthorized');
            }
            throw new Error('Failed to fetch user info');
        }

        return response.json();
    },

    async updateProfile(profile: UserData): Promise<UserData> {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/edit`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(profile),
        });

        return response.json();
    },

    async log(message: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/debug/log?message=${encodeURIComponent(message)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to send log message');
        }
    },

    async getNewsList(): Promise<NewsList> {
        const response = await fetch(`${API_BASE_URL}/api/announce/news-list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to send log message');
        }

        return await response.json();
    },

    async getNews(id: number): Promise<NewsData> {
        const response = await fetch(`${API_BASE_URL}/api/announce/news?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to send log message');
        }

        return await response.json();
    },

    // OAuth2 로그인 URL 생성
    getGoogleLoginUrl(): string {
        return `${API_BASE_URL}/oauth2/authorization/google`;
    },

    getDiscordLoginUrl(): string {
        return `${API_BASE_URL}/oauth2/authorization/discord`;
    },
};
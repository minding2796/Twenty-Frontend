import { useState, useEffect } from 'react'
import Login from './components/Login'
import MyPage from './components/MyPage'
import OAuthCallback from './components/OAuthCallback'
import { api, type UserData } from './utils/api'
import './App.css'

function App() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // OAuth 콜백 확인
    const isCallback = window.location.search.includes('token') || window.location.search.includes('error');

    useEffect(() => {
        // 콜백 페이지가 아닐 때만 사용자 정보 로드
        if (!isCallback) {
            loadUserData();
        } else {
            setLoading(false);
        }
    }, [isCallback]);

    const loadUserData = async () => {
        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                setLoading(false);
                return;
            }
            if (typeof window.Unity !== 'undefined') window.Unity.call(token);

            const userData = await api.getMe();
            setUser(userData);
        } catch (error) {
            console.error('Failed to load user data:', error);
            localStorage.removeItem('accessToken');
            setError('사용자 정보를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthSuccess = async () => {
        setLoading(false);
        await loadUserData();
    };

    const handleOAuthError = (errorMessage: string) => {
        setError(errorMessage);
        setTimeout(() => {
            setError(null);
        }, 3000);
    };

    const handleLogout = () => {
        setUser(null);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexGrow: '1',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <div style={{ color: 'white', fontSize: '24px' }}>로딩 중...</div>
            </div>
        );
    }

    // OAuth 콜백 처리
    if (isCallback) {
        return <OAuthCallback onSuccess={handleOAuthSuccess} onError={handleOAuthError} />;
    }

    // 에러 표시
    if (error) {
        return (
            <div style={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <div style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '16px',
                    textAlign: 'center',
                    maxWidth: '400px'
                }}>
                    <div style={{ color: '#f44336', fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
                    <h2 style={{ color: '#333', marginBottom: '12px' }}>오류 발생</h2>
                    <p style={{ color: '#666', marginBottom: '20px' }}>{error}</p>
                    <button
                        onClick={() => setError(null)}
                        style={{
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {user ? (
                <MyPage user={user} onLogout={handleLogout} />
            ) : (
                <Login />
            )}
        </>
    )
}

export default App
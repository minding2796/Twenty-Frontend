import React, {useEffect, useState} from 'react';
import './OAuthCallback.css';
import {api} from '../utils/api';

interface OAuthCallbackProps {
    onSuccess: () => void;
    onError: (error: string) => void;
}

const OAuthCallback: React.FC<OAuthCallbackProps> = ({onSuccess, onError}) => {
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

    useEffect(() => {
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const error = urlParams.get('error');

            if (error) {
                setStatus('error');
                onError(error);
                return;
            }

            if (token) {
                localStorage.setItem('accessToken', token);
                try {
                    await api.getMe();
                    setStatus('success');
                } catch (e) {
                    console.error('Failed to load user data:', e);
                }
                if (typeof window.Unity !== 'undefined') window.Unity.call(token);

                // 성공 처리
                onSuccess();

                // URL에서 토큰 제거
                window.history.replaceState({}, document.title, '/');
            }
        };

        handleCallback();
    }, [onSuccess, onError]);

    return (
        <div className="oauth-callback-container">
            <div className="oauth-callback-card">
                {status === 'processing' && (
                    <>
                        <div className="spinner"></div>
                        <h2>로그인 처리 중...</h2>
                        <p>잠시만 기다려주세요</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="success-icon">✓</div>
                        <h2>로그인 성공!</h2>
                        <p>페이지로 이동 중입니다...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="error-icon">✕</div>
                        <h2>로그인 실패</h2>
                        <p>다시 시도해주세요</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default OAuthCallback;
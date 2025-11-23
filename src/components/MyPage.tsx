import React from 'react';
import type {UserData} from '../utils/api';
import './MyPage.css';

interface MyPageProps {
    user: UserData;
    onLogout: () => void;
}

const MyPage: React.FC<MyPageProps> = ({user, onLogout}) => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.dispatchEvent(new CustomEvent('token', { detail: false }));
        onLogout();
    };

    const handleEdit = () => {
        window.location.href = '/my-page/edit';
    }

    return (
        <div className="mypage-container">
            <div className="mypage-card">
                <div className="mypage-header">
                    <h1>내 정보</h1>
                    <button className="logout-button" onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>

                <div className="profile-section">
                    <div className="avatar-container">
                        <img src={user.picture} alt={user.name} className="avatar"/>
                    </div>
                    <h2 className="user-name">{user.name}</h2>
                    <p className="user-email">{user.email}</p>
                </div>

                <div className="info-section">
                    <div className="info-item">
                        <span className="info-label">사용자 ID</span>
                        <span className="info-value">{user.id}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">이메일</span>
                        <span className="info-value">{user.email}</span>
                    </div>
                </div>

                <div className="actions-section">
                    <button className="action-button primary" onClick={handleEdit}>프로필 수정</button>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
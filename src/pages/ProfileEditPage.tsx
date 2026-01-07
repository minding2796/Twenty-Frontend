import React, {useState} from 'react';
import {api, type UserData} from '../utils/api.tsx';
import './ProfileEditPage.css';
import './MyPage.css';

interface ProfileEditPageProps {
    user: UserData;
}

const ProfileEditPage: React.FC<ProfileEditPageProps> = ({user}) => {
    const [name, setName] = useState(user.name);
    const onChangeName = (event: React.FormEvent<HTMLInputElement>) => {
        const {currentTarget: { value }} = event;
        setName(value);
    };
    const handleConfirm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        api.updateProfile({
            id: user.id,
            name: name,
            email: user.email,
            picture: user.picture,
            provider: user.provider,
            role: user.role,
        }).then(() => window.location.href = '/my-page');
    };
    const handleCancel = () => {
        window.location.href = '/my-page';
    };

    return (
        <div className="mypage-container">
            <form className="mypage-card" onSubmit={handleConfirm} onReset={handleCancel}>
                <div className="mypage-header">
                    <h1>프로필 수정</h1>
                    <button className="reset-button" type='reset'>
                        취소
                    </button>
                    <button className="submit-button" type='submit'>
                        완료
                    </button>
                </div>

                <div className="profile-section">
                    <div className="avatar-container">
                        <img src={user.picture} alt={user.name} className="avatar"/>
                    </div>
                    <div>
                        <input name='name' className="user-name" value={name} onChange={onChangeName} placeholder='닉네임' minLength={3} maxLength={20}/>
                    </div>
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
            </form>
        </div>
    );
};

export default ProfileEditPage;
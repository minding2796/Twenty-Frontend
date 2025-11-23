import React, {useEffect, useState} from 'react';
import './NewsPage.css';
import type {NewsData} from "./NewsCard.tsx";
import {api} from "../utils/api.tsx";
import {useParams} from "react-router-dom";

const NewsPage: React.FC = () => {
    const { id } = useParams();
    const [nd, setNewsData] = useState<NewsData>({id: -1, title: "불러오는 중..", description: ""});
    useEffect(() => {
        if (Number.isInteger(id)) {
            setNewsData({id: -1, title: "문서를 찾을 수 없음", description: "문서가 없거나 잘못된 경로입니다!"});
        } else api.getNews(Number(id)).then(setNewsData);
    }, [id]);
    return (
        <div className="np-container">
            <div className="np-card">
                <h1>{nd.title}</h1>
                <hr/>
                <p>{nd.description}</p>
            </div>
        </div>
    );
}

export default NewsPage;
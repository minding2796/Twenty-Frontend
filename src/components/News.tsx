import React, {useEffect, useState} from 'react';
import './News.css';
import NewsCard from "./NewsCard";
import {api} from "../utils/api.tsx";
import type { JSX } from "react/jsx-runtime";

const News: React.FC = () => {
    const [list, setList] = useState<JSX.Element[]>([]);
    useEffect(() => {
        api.getNewsList().then(news => {
            const elementList: JSX.Element[] = [];
            news.newsList.forEach(data => {
                const card = <NewsCard id={data.id} title={data.title} description={data.description}/>;
                elementList.push(card);
            });
            setList(elementList);
        });
    }, []);
    return (
        <div className='news-container'>
            <h1>새소식</h1>
            <ul className='news-list'>
                {list}
            </ul>
        </div>
    );
};

export default News;
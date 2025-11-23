import React from 'react';
import logo from "../assets/Twenty.png";

export interface NewsData {
    id: number;
    title: string;
    description: string;
}

const NewsCard: React.FC<NewsData> = ({id, title, description}) => {
    return (
        <li className='news'>
            <a href={'/news/' + id}>
                <img src={logo} alt='icon'/>
                <div>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </a>
        </li>
    );
}

export default NewsCard;
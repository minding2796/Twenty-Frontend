import React, {useEffect, useState} from 'react';
import './MainPage.css';
import gpb from '../assets/GetItOnGooglePlay_Badge_Web_color_Korean.png';

const MainPage: React.FC = () => {
    const [value, setValue] = useState(20);
    useEffect(() => {
        const basePrice = 20, maxPrice = 30, minPrice = 10;
        let stockPrice = 20, display = stockPrice;
        const updateDisplay = async (price: number) => {
            while (display != price) {
                if (display < price) display++;
                else if (display > price) display--;
                setValue(display);
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
        const updateStock = () => {
            const nextInt = (origin: number, bound: number) => {
                return Math.random() * (bound - origin) + origin;
            }
            const difference = basePrice - stockPrice;
            const maxChange = Math.max(2, Math.abs(difference));
            let change: number;

            if (nextInt(0, 100) < 1) {
                change = nextInt(-10, 11);
                stockPrice += change;
                stockPrice = Math.max(stockPrice, 1);
            } else {
                const probability = Math.max(0.2, 1 - Math.abs(difference) / (maxPrice - minPrice));

                if (Math.random() < probability) {
                    if (difference > 0) change = nextInt(-maxChange / 2, maxChange + 1);
                    else if (difference < 0) change = nextInt(-maxChange, maxChange / 2 + 1);
                    else change = nextInt(-3, 4);
                } else {
                    change = nextInt(-1, 2);
                }

                stockPrice += change;
                stockPrice = Math.min(Math.max(stockPrice, minPrice), maxPrice);
            }

            updateDisplay(Math.round(stockPrice)).then();
        }

        updateStock();
        setInterval(updateStock, 3000)
    }, []);
    return (
        <>
            <div className="mp-container">
                <div className="hero-container">
                    <h1>Twenty: <span className='bold'>영원</span>의 주식</h1>
                    <p>끝없는 매매로 부자가 되자!</p>
                </div>
                <div className="stock-container">
                    <p>한 주당 가격</p>
                    <h1>{value}</h1>
                </div>
                <div className="mc-container">
                    <h1>지금 바로 플레이하세요</h1>
                    <a href="#"><img src={gpb} alt="Google Play" height="100px"/></a>
                </div>
            </div>
        </>
    );
}

export default MainPage;
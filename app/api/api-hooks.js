import {useState, useEffect} from 'react';
import {getNormalizedGamesDataByCategory, isResponseOk} from './api-utils'; 

export const useGetDataByCategory = (endpoint, category) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const data = await getNormalizedGamesDataByCategory(endpoint, category);
            setData(data);
        }
            fetchData();
    }, []);
    return isResponseOk(data) ? data: null; // вроде и без проверки не было ошибки
};  
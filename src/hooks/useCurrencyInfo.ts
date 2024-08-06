import { useState, useEffect } from "react"
import axios from 'axios';

function useCurrencyInfo(currency: string): object{
    const [response, setResponse] = useState({});
    useEffect(() => {
        const getInfo = async () => {
            const currencyInfoUrl: string = `https://open.er-api.com/v6/latest/${currency}`;
            const response = await axios.get(currencyInfoUrl);
            setResponse(response.data.rates)
        }
        getInfo();
    }, [currency])
    return response;
}

export default useCurrencyInfo

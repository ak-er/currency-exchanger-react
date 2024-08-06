import CurrencyForm from "./components/CurrencyForm";
import { MdSwapVert } from "react-icons/md";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { useState, useEffect } from "react";

function App() {
  const [currency, setCurrency] = useState<string>("INR");
  const [from, setFrom] = useState<string>("INR");
  const [to, setTo] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>(1);
  const currencyInfo: any = useCurrencyInfo(currency);
  const options: string[] = Object.keys(currencyInfo)

  const convert = () => {
    if (currencyInfo[from] && currencyInfo[to]) {
      const value = (amount * currencyInfo[to]) / currencyInfo[from];
      setConvertedAmount(value || 0);
    }
  };

  useEffect(() => {
    convert();
    setCurrency(to);
  }, [amount, to]);

  useEffect(() => {
    if (currencyInfo[from] && currencyInfo[to]) {
      const value = (convertedAmount * currencyInfo[from]) / currencyInfo[to];
      setAmount(value || 0);
      setCurrency(from);
    }
  }, [convertedAmount, from]);

  const swap = () => {
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setFrom(to);
    setTo(from);
  }

  

  return (
    <>
      <div className="bg-black/[0.5] h-screen w-full flex items-center justify-center">
        <div className="bg-slate-700 p-4 rounded-lg">
          <div className="relative">
            <CurrencyForm
              labelText="From"
              org={from}
              selectCurrency={(selCurrency) => setFrom(selCurrency)}
              options={options}
              amount={amount}
              onChangeInputValue={(amnt) => setAmount(amnt)}
              />
            <CurrencyForm
              labelText="To"
              org={to}
              selectCurrency={(selCurrency) => setTo(selCurrency)}
              options={options}
              amount={convertedAmount}
              onChangeInputValue={(amnt) => setConvertedAmount(amnt)}
               />
            <div onClick={swap}
              className="bg-sky-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg cursor-pointer">
              <MdSwapVert className="text-white text-3xl text-center" />
            </div>
          </div>
          <button
            className="w-full bg-gray-950 text-white py-3 cursor-pointer rounded-xl mt-3"
            onClick={convert}>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
        </div>
      </div>
    </>
  )
}
// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json
// https://open.er-api.com/v6/latest/usd
export default App

import React from "react";

interface FormProps {
    labelText: string;
    org: string;
    selectCurrency: (currency: string) => void;
    options: string[];
    amount: number;
    onChangeInputValue: (amount: number) => void;
}

const CurrencyForm: React.FC<FormProps> = ({ labelText, org, selectCurrency, options=[], amount=0, onChangeInputValue}) => {
    return(
    <div className = "bg-gray-900 text-white rounded-lg flex justify-between gap-10 p-5 my-2" >
        <div>
            <div >{labelText}</div>
            <input
              type="text"
              value={amount}
              onChange={(e) => onChangeInputValue(Number(e.target.value))}
              className="w-52 mt-3 text-black bg-gray-100 outline-none h-10 p-2 shadow" />
        </div>
      <div>
        <div>Currency Type</div>
        <select
          name="currency"
          value={org}
          className="w-32 mt-3 h-10 text-black outline-none"
          onChange={(e)=> selectCurrency(e.target.value)}
          >
            {
              options && options.map((value: string) => <option key={value} value={value}>{value && value.toUpperCase()}</option>
              )
            }
        </select>
      </div>
    </div>
  )
}

export default CurrencyForm

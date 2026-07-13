import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);

    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (!currencyInfo[to]) return;

    setConvertedAmount(
      (Number(amount) * Number(currencyInfo[to])).toFixed(2)
    );
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-xl p-5 backdrop-blur-md bg-white/30 shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            selectedCurrency={from}
            onCurrencyChange={setFrom}
            onAmountChange={setAmount}
          />

          <div className="relative w-full h-1">
            <button
              type="button"
              onClick={swap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md"
            >
              Swap
            </button>
          </div>

          <div className="mt-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              selectedCurrency={to}
              onCurrencyChange={setTo}
              amountDisabled
            />
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Convert {from} to {to}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
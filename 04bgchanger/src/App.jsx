import { useState } from "react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <--- IS THIS LINE MISSING IN YOUR FILE?

function App() {
  const [color, setColor] = useState("olive");

  return (
    <div
      className="w-full min-h-screen m-0 p-0 transition-colors duration-300"
      style={{ backgroundColor: color }}
    >
      <div className="fixed bottom-12 inset-x-0 flex justify-center z-10">
        <div className="flex gap-3 bg-white p-3 rounded-full shadow-lg">
          <button
            onClick={() => setColor("red")}
            style={{ backgroundColor: "red" }}
            className="px-4 py-2 rounded-full text-white font-medium"
          >
            Red
          </button>

          <button
            onClick={() => setColor("green")}
            style={{ backgroundColor: "green" }}
            className="px-4 py-2 rounded-full text-white font-medium"
          >
            Green
          </button>

          <button
            onClick={() => setColor("blue")}
            style={{ backgroundColor: "blue" }}
            className="px-4 py-2 rounded-full text-white font-medium"
          >
            Blue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
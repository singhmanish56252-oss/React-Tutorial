import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="bg-green-500 text-white text-3xl font-bold text-center py-4">
        Tailwind Card Example
      </h1>

      <div className="flex justify-center mt-10">
        <Card />
        <br />
        <Card />
      </div>
    </div>
  );
}

export default App;
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import Deshboard from "./pages/Deshboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/deshboard" element={<Deshboard />} />
      </Routes>
    </div>
  );
}

export default App;

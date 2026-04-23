import "./App.css";
import { GameProvider } from "./GameContext";
import InfoCard from "./infoCard/infoCard";
import Questions from "./questionCard/questions";
import Tools from "./toolsCard/tools";

function App() {
  return (
    <GameProvider>
      <div className="App">
        <header className="App-header">
          <h1>Projeto Quiz</h1>
        </header>

        <main>
          <InfoCard />
          <Questions />
          <Tools />
        </main>
      </div>
    </GameProvider>
  );
}

export default App;
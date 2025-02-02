import QuoteGenerator from "./components/QuoteGenerator";
import { LoadingBarContainer } from "react-top-loading-bar";

function App() {
  return (
    <LoadingBarContainer>
      <main>
        <QuoteGenerator />
      </main>
    </LoadingBarContainer>
  );
}

export default App;

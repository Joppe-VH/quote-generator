import QuoteGenerator from "./components/QuoteGenerator";
import quotes from "./data.json";

function App() {
  return (
    <>
      <main>
        <QuoteGenerator list={quotes} />
      </main>
    </>
  );
}

export default App;

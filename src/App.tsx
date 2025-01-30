import QuoteGenerator from "./components/QuoteGenerator";
import data from "./data.json";

const quotes = data.map((d) => d.quote);

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

import "../css/quoteGenerator.css";
import { useState } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";

type Props = {
  list: string[];
};

const QuoteGenerator = ({ list }: Props) => {
  const randomQuoteId = (current?: number) => {
    let quoteId;
    do {
      quoteId = Math.floor(Math.random() * list.length);
    } while (quoteId === current);
    return quoteId;
  };

  const formatQuoteNr = (id: number) =>
    (++id).toString().padStart(list.length.toString().length, "0");

  const [quoteId, setQuoteId] = useState(randomQuoteId());

  const copyQuote = () => {
    navigator.clipboard.writeText(list[quoteId]);
    toast(`Copied advice #${formatQuoteNr(quoteId)} to clipboard`);
  };

  return (
    <>
      <div className="quote-generator">
        <h2>Advice #{formatQuoteNr(quoteId)}</h2>
        <blockquote>
          <p>{list[quoteId]}</p>
          <button onClick={copyQuote}>
            <i className="fa-regular fa-copy"></i>
          </button>
        </blockquote>
        <div>
          <hr />
          <i className="fa-solid fa-pause"></i>
        </div>
        <button onClick={() => setQuoteId((id) => randomQuoteId(id))}>
          <i className="fa-solid fa-dice-five"></i>
        </button>
      </div>
      <ToastContainer transition={Zoom} theme="dark" />
    </>
  );
};
export default QuoteGenerator;

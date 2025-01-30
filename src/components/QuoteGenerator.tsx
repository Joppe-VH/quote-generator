import "../css/quoteGenerator.css";
import { useState } from "react";
import { toast, ToastContainer, Zoom } from "react-toastify";

type Quote = {
  quote: string;
  author: string;
};
type Props = {
  list: Quote[];
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
    navigator.clipboard.writeText(list[quoteId].quote);
    toast(`Copied ${list[quoteId].author}'s advice to clipboard`);
  };

  return (
    <>
      <div className="quote-generator">
        <h3>Advice #{formatQuoteNr(quoteId)}</h3>
        <h2>{list[quoteId].author}</h2>
        <blockquote>
          <p>{list[quoteId].quote}</p>
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

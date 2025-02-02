import "../css/quoteGenerator.css";
import { toast, ToastContainer, Zoom } from "react-toastify";
import useSWR from "swr";
import ContentLoader from "react-content-loader";
import { useLoadingBar } from "react-top-loading-bar";

type Quote = {
  id: number;
  advice: string;
};

const URL = "https://api.adviceslip.com/advice";

async function fetchQuote(url: string): Promise<Quote> {
  const res = await fetch(url);
  const data = await res.json();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return data?.slip;
}

const QuotePlaceholder = () => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={120}
    viewBox="0 0 400 120"
    backgroundColor="#465368"
    foregroundColor="#53ffaa"
    display={"block"}
  >
    <rect x="0" y="30" rx="12" ry="12" width="400" height="24" />
    <rect x="30" y="74" rx="12" ry="12" width="340" height="24" />
  </ContentLoader>
);

const QuoteGenerator = () => {
  const { start, complete } = useLoadingBar({
    color: "#19ba99",
    height: 4,
  });

  const {
    data: quote,
    isLoading,
    error,
    mutate,
  } = useSWR(URL, fetchQuote, {
    revalidateOnFocus: false,
  });

  const formatQuoteNr = (id: number) => id.toString().padStart(3, "0");

  const copyQuote = () => {
    if (!quote) return;
    navigator.clipboard.writeText(quote.advice);
    toast(`Copied advice #${formatQuoteNr(quote.id)} to clipboard`);
  };

  const fetchNewQuote = async () => {
    start();
    await mutate();
    complete();
  };

  return (
    <>
      <div className="quote-generator">
        {isLoading ? (
          <h2>Gathering thoughts...</h2>
        ) : quote && !error ? (
          <h2>Advice #{formatQuoteNr(quote.id)}</h2>
        ) : (
          <h2 className="error">Something went wrong</h2>
        )}
        <blockquote>
          {isLoading ? (
            <QuotePlaceholder />
          ) : quote && !error ? (
            <>
              <p className="quote">{quote.advice}</p>
              <button onClick={copyQuote}>
                <i className="fa-regular fa-copy"></i>
              </button>
            </>
          ) : (
            <p>
              {error?.message || "An unknown error occurred, try reloading"}
            </p>
          )}
        </blockquote>
        <div>
          <hr />
          <i className="fa-solid fa-pause"></i>
        </div>
        <button onClick={fetchNewQuote}>
          <i className="fa-solid fa-dice-five"></i>
        </button>
      </div>
      <ToastContainer transition={Zoom} theme="dark" />
    </>
  );
};
export default QuoteGenerator;

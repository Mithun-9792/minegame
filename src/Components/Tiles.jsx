import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import gem from "../assests/images/gem.svg";
import bomb from "../assests/images/bomb.svg";
import mineEffect from "../assests/images/mineEffect.webp";
import "./tile.css";

const Box = ({ type, onClick }) => {
  return (
    <div className={`box ${type}`} onClick={onClick}>
      {type === "gem" && <img className="p-2" src={gem} alt="" />}
      {type === "bomb" && (
        <div className="bomb-div">
          <img className="mine" src={mineEffect} alt="" />
        </div>
      )}
    </div>
  );
};
function Tiles() {
  const [numBombs, setNumBombs] = useState(3); // Default number of bombs
  const [boxes, setBoxes] = useState(Array(25).fill(null));
  const [revealed, setRevealed] = useState(Array(25).fill(false));
  const [gameStarted, setGameStarted] = useState(false);
  const [diamondClickCount, setDiamondClickCount] = useState(0);
  const [profit, setProfit] = useState(0);

  const handleStartGame = () => {
    setProfit(0);
    setBoxes(
      Array(25)
        .fill(null)
        .map((_, index) => (index < numBombs ? "bomb" : "gem"))
        .sort(() => Math.random() - 0.5)
    );
    setRevealed(Array(25).fill(false));
    setGameStarted(true);
    setDiamondClickCount(0);
  };

  const handleCashOut = () => {
    setGameStarted(false);
    alert(`Profit ${profit} you make`);
    setRevealed(Array(25).fill(true));
  };
  const handleBoxClick = (index) => {
    if (!gameStarted) return; // Don't allow clicking before starting the game

    if (boxes[index] === "bomb") {
      setRevealed(Array(25).fill(true));
      setGameStarted(false);
    } else {
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);
      setProfit(profit + Math.random() * 1);
      if (boxes[index] === "gem") {
        setDiamondClickCount((prevCount) => prevCount + 1);
      }
    }
  };

  const handleNumBombsChange = (event) => {
    setNumBombs(parseInt(event.target.value));
  };
  return (
    <div className="main">
      <Container className="side-section">
        <label className="stacked svelte-1wzq4lo">
          {" "}
          <div className="input-wrap svelte-1u979cd">
            <div className="input-content svelte-1u979cd">
              {" "}
              <div className="after-icon svelte-1u979cd">
                <svg fill="none" viewBox="0 0 96 96" className="svg-icon">
                  {" "}
                  <title></title>{" "}
                  <path
                    d="M95.895 48.105C95.895 74.557 74.451 96 48 96 21.548 96 .105 74.556.105 48.105.105 21.653 21.548.21 48 .21c26.451 0 47.895 21.443 47.895 47.895Z"
                    fill="#F7931A"
                  ></path>
                  <path
                    d="M69.525 42.18c.93-6.27-3.84-9.645-10.38-11.895l2.115-8.505-5.16-1.29-2.1 8.28c-1.365-.345-2.76-.66-4.14-.975l2.1-8.295-5.175-1.29-2.115 8.49c-1.125-.255-2.235-.51-3.3-.78l-7.14-1.785-1.365 5.52s3.84.885 3.75.93a2.763 2.763 0 0 1 2.414 3.011l.001-.01-2.415 9.69c.213.049.394.106.568.174l-.028-.01-.54-.135-3.39 13.5a1.879 1.879 0 0 1-2.383 1.226l.013.004-3.765-.93L24.525 63l6.735 1.665 3.69.96-2.145 8.595 5.175 1.29 2.115-8.505c1.41.375 2.775.735 4.125 1.065l-2.115 8.475 5.175 1.29 2.13-8.58c8.835 1.665 15.465.99 18.255-6.99 2.25-6.42-.105-10.125-4.755-12.54 3.39-.72 5.925-2.955 6.615-7.545ZM57.69 58.755c-1.59 6.435-12.405 3-15.915 2.085L44.61 49.5c3.51.825 14.76 2.565 13.08 9.255Zm1.605-16.665c-1.5 5.85-10.5 2.865-13.38 2.145l2.58-10.32c2.91.72 12.315 2.085 10.8 8.175Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>{" "}
              <input
                autoComplete="on"
                className="input spacing-expanded svelte-1u979cd"
                type="number"
                data-test="input-game-amount"
                data-bet-amount-active-currency="btc"
                step="1e-8"
              />{" "}
            </div>{" "}
            <div className="input-button-wrap svelte-1u979cd">
              <button
                type="button"
                tabIndex="0"
                className=""
                data-testid="amount-halve"
                data-test="amount-halve"
                data-button-root=""
              >
                ½
              </button>{" "}
              <button
                type="button"
                tabIndex="0"
                data-test="amount-double"
                data-testid="amount-double"
                data-button-root=""
              >
                2×
              </button>{" "}
            </div>
          </div>{" "}
          <span className="label-content full-width svelte-1k9rtf3">
            <div className="label-left-wrapper svelte-1u979cd">
              <span slot="label" className="text-span">
                Bet Amount
              </span>{" "}
            </div>{" "}
            <div className="currency-conversion svelte-e4myuj">
              <div className="svelte-e4myuj text-span">$0.00</div>
            </div>
          </span>
        </label>
        <label className="text-span">Mines</label>
        <div className="select">
          <select value={numBombs} onChange={handleNumBombsChange}>
            {[...Array(25).keys()].map((num) => (
              <option key={num} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        {gameStarted && (
          <span className="label-content full-width svelte-1k9rtf3">
            <div className="label-left-wrapper svelte-1u979cd">
              <span slot="label" className="text-span">
                Gems
              </span>{" "}
            </div>{" "}
            <div className="currency-conversion svelte-e4myuj">
              <div className="svelte-e4myuj text-span">{25 - numBombs}</div>
            </div>
          </span>
        )}
        <br />
        {!gameStarted ? (
          <button onClick={handleStartGame}>Bet</button>
        ) : (
          <>
            <span className="label-content full-width svelte-1k9rtf3">
              <div className="label-left-wrapper svelte-1u979cd">
                <span slot="label" className="text-span">
                  Profit
                </span>{" "}
              </div>{" "}
              <div className="currency-conversion svelte-e4myuj">
                <div className="svelte-e4myuj text-span">{profit}</div>
              </div>
            </span>
            <button
              onClick={() => handleBoxClick(Math.floor(Math.random() * 25))}
            >
              Pick a random tile
            </button>
            <button
              onClick={handleCashOut}
              className={diamondClickCount == 0 ? "isDisabled" : ""}
              disabled={diamondClickCount == 0}
            >
              Cash out
            </button>
          </>
        )}
      </Container>
      <Container className="game-container">
        <div className="box-container">
          {boxes.map((type, index) => (
            <Box
              key={index}
              type={revealed[index] ? type : null}
              onClick={() => handleBoxClick(index)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Tiles;

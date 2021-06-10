import React, { useState, useEffect } from "react";
import { Cards } from "./Cards.js";
import _ from "lodash";

import styles from "./styles/Main.css";

const Main = () => {
  const [playerArr, setPlayerArr] = useState([]);
  const [dealerArr, setDArr] = useState([]);
  const [playerTotal, setPlayerTotal] = useState([0]);
  const [dealerTotal, setDealerTotal] = useState([0]);

  useEffect(() => {
    if (playerArr.length > 0) {
      let playerTotalValue = getTotal(playerArr);
      setPlayerTotal(playerTotalValue);
    }
  }, [playerArr]);

  useEffect(() => {
    if (dealerArr.length > 0) {
      let delearTotalValue = getTotal(dealerArr);
      setDealerTotal(delearTotalValue);
    }
  }, [dealerArr]);

  const getInitialCards = () => {
    let getRandomArrPlayer = Cards.sort(() => 0.5 - Math.random()).slice(0, 2);
    let getRandomArrD = Cards.sort(() => 0.5 - Math.random()).slice(0, 1);

    setPlayerArr(getRandomArrPlayer);
    setDArr(getRandomArrD);
  };

  useEffect(() => {
    getInitialCards();
  }, []);

  useEffect(() => {
    if (playerTotal > 21) {
      alert("Busted Dealer Win!");
    }
  }, [playerTotal]);

  useEffect(() => {
    if (dealerTotal > 21) {
      alert("Busted Player Win!");
    }
  }, [dealerTotal]);

  const getTotal = (val) => {
    let total = val.map((item) => item.split(" of ")[0]);
    let totalValue = total.map((item) => {
      if (item === "J" || item === "K" || item === "Q") {
        return (item = 10);
      } else if (item === "A") {
        return (item = 1);
      } else {
        return parseInt(item);
      }
    });
    console.log(totalValue, "totalValue");
    const sum = totalValue.reduce((total, amount) => total + amount);
    return sum;
  };

  const getHitCards = () => {
    if (playerTotal <= 21) {
      let getRandomArrD = Cards.sort(() => 0.5 - Math.random()).slice(0, 1);
      let obj = Object.assign({}, getRandomArrD);
      console.log(obj, "obj");
      setPlayerArr((prevState) => [...prevState, obj[0]]);
    } else {
      alert("Busted Dealer Win!");
    }
  };

  const getStandCards = () => {
    if (dealerTotal <= 21) {
      let getRandomArrD = Cards.sort(() => 0.5 - Math.random()).slice(0, 1);
      let obj = Object.assign({}, getRandomArrD);
      setDArr((prevState) => [...prevState, obj[0]]);
    } else {
      alert("Busted Player Win!");
    }
  };

  const getReset = () => {
    getInitialCards();
  };

  return (
    <div className="main-wrap">
      <div className="button-wrap">
        <button onClick={getHitCards}>Hit</button>
        <button onClick={getStandCards}>Stand</button>
        <button onClick={getReset}>Reset</button>
      </div>

      <h1 className="card-title">Dealer's Card {dealerTotal}</h1>
      <div className="card-wrap">
        {dealerArr && dealerArr.length < 2 && (
          <div className="delar-card">
            <div className="card-number"></div>
          </div>
        )}
        {dealerArr.map((item) => (
          <div className="delar-card">
            <div className="card-number">{item}</div>
            <div className="card-logo">&#9829;</div>
          </div>
        ))}
      </div>

      <h1 className="card-title">Player's Card {playerTotal}</h1>
      <div className="card-wrap">
        {playerArr.map((item) => (
          <div className="delar-card">
            <div className="card-number">{item}</div>
            <div className="card-logo">&#9824;</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;

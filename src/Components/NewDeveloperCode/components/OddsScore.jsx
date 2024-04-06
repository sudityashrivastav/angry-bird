import axios from "axios";
import { useEffect, useState } from "react";
import Bookmaker from "./Bookmaker";
import TeamComponent from "./TeamName";

const OddsScoreComponent = ({ teamNames, comm }) => {
  const [OddsScore, setOddsScore] = useState([]);

  const marketId = localStorage.getItem("market_id");

  async function updateOddsScore() {
    const options = {
      method: "POST",
      url: "https://cricket.scoreswift.in/odds/odds-data",
      headers: {
        "content-type": "application/json",
        "X-ScoreSwift-Key": "Pdt0KONrMM776071J8OL_v2"
      },
      data: {
        marketId: marketId,
      },
    };

    try {
      const response = await axios.request(options);
      setOddsScore(response.data?.data[0]?.betfair_data?.runners);

      setTimeout(() => {
        updateOddsScore();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (marketId) {
      updateOddsScore();
    }
  }, []);

  return (
    <div className="flex fixed top-0 right-0 items-end flex-col gap-1 p-10 text-black font-extrabold">
      {OddsScore?.map((i, key) => (
        <div key={key} className="flex gap-1 items-center justify-end px-4">
          {key === 2 ? (
            <p className="fixshadow text-2xl shadow-md rounded-sm px-2 mr-3">
              DRAW
            </p>
          ) : (
            <TeamComponent teamName={teamNames[key] || "fgfg"} />
          )}

          <div className="flex flex-col bg-[#9868bf] items-center py-2 justify-center rounded-tl-2xl rounded-br-2xl w-24">
            <span className="text-xl ">{i?.price?.back[0]?.price} </span>
            <span className=" text-lg">${i?.price?.back[0]?.size}</span>
          </div>

          <div className="flex flex-col bg-[#5c80cd] py-2 items-center justify-center rounded-tl-2xl rounded-br-2xl w-24">
            <span className=" text-xl">{i?.price?.lay[0]?.price}</span>
            <span className=" text-lg">${i?.price?.lay[0]?.size}</span>
          </div>
        </div>
      ))}

      <Bookmaker comm={comm}/>
    </div>
  );
};

export default OddsScoreComponent;

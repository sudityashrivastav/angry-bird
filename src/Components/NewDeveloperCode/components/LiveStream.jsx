import axios from "axios";
import Test from "./Test";
import Commentary from "./Commentary";
import OddsScoreComponent from "./OddsScore";
import { useState, useEffect } from "react";

function LiveOddsScore() {
  const [teamNames, setteamNames] = useState(["", ""]);
  const [CommentaryValue, setCommentaryValue] = useState("");

  const marketId = localStorage.getItem("market_id");
  const eventId = localStorage.getItem("event_id");
  const balleventId = localStorage.getItem("event_id");
  // ------------------------------------------------------
  console.log("new devloperpage", eventId);
  const getCommentary = async () => {
    var options = {
      method: "POST",
      url: "https://odds.starlaser.live/ws/getScoreData",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `event_id=${eventId || balleventId}`,
    };
    try {
      const { data } = await axios.request(options);
      const regex = /<span class="commantry">(.*?)<\/span>/;
      // Extracting commentary value using regular expression
      const match = data.match(regex);

      // Checking if match is found
      if (match) {
        // Extracted commentary value
        const commentary = match[1];
        setCommentaryValue(commentary);

        setTimeout(() => {
          getCommentary();
        }, 1000);
      } else {
        console.log("Commentary not found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------------------------------------

  async function updateTeamNames() {
    const apiKey = "Pdt0KONrMM776071J8OL_v2";

    const options = {
      method: "GET",
      url: "https://cricket.scoreswift.in/odds/odds-list",
      headers: {
        "X-ScoreSwift-Key": apiKey,
      },
    };

    try {
      const response = await axios.request(options);
      response?.data?.data?.children?.map((item) => {
        if (item.marketId == marketId) {
          const finalTeamNames = [
            item?.runners[0]?.runnerName,
            item?.runners[1]?.runnerName,
          ];
          setteamNames(finalTeamNames);
          return;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (balleventId) {
      getCommentary();
    }
    if (marketId) {
      updateTeamNames();
    }
  }, []);

  return (
    <>
      <div className="">
        <OddsScoreComponent teamNames={teamNames} comm={CommentaryValue} />
        {balleventId && <Commentary comm={CommentaryValue} />}
        <Test eventId={eventId} comm={CommentaryValue} />
      </div>
    </>
  );
}

export default LiveOddsScore;

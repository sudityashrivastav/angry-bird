import axios from "axios";

const getStreamURl = async (key) => {
  const options = {
    method: "GET",
    url: "https://free-cricket-live-score1.p.rapidapi.com/live-stream/match",
    params: {
      key: key,
    },
    headers: {
      "X-RapidAPI-Key": "fdc0299521msh15760484a2e3530p13eb0djsn97ea0bafb2ad",
      "X-RapidAPI-Host": "free-cricket-live-score1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response?.data?.documents[0]["live-match-link"];
  } catch (error) {
    console.error(error);
  }
};


const getTheListOfMarketIds = async () => {
  const options = {
    method: "GET",
    url: "https://free-cricket-live-score1.p.rapidapi.com/odds/odds-list",
    headers: {
      "X-RapidAPI-Key": "fdc0299521msh15760484a2e3530p13eb0djsn97ea0bafb2ad",
      "X-RapidAPI-Host": "free-cricket-live-score1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data.children;
  } catch (error) {
    console.error(error);
  }
};

// OK SO THIS IS THE MATCH WHO'S MARKET ID I WANT
const showOddsScore = async (match, navigate) => {


  console.log("meeeeeeeeeeee here", match);

  var isMatchFound = false
  // GETTING THE LIST OF MARKET ID's TO FIND THE MARKET ID OF SPECIFIC MATCH
  const listOfMarketID = await getTheListOfMarketIds();

  // FIND MARKET ID ON THE BASIS OF TEAM NAME
  if (listOfMarketID) {
    const teamName = match?.teams.t1.name.toLowerCase();

    teamName.split(" ").map((teamNameWords) => {
      listOfMarketID.map((specificMatchMarketId) => {
        specificMatchMarketId?.runners.map((runner) => {
          runner.runnerName
            .toLowerCase()
            .split(" ")
            .map(async (xyz) => {
              if (xyz === teamNameWords) {
                if (!isMatchFound) {
                  isMatchFound = true
                  localStorage.setItem("market_id", specificMatchMarketId.marketId)
                  localStorage.setItem("event_id", specificMatchMarketId.eventId)
                  navigate("/Previewmatch");
                }
              }
            });
        });
      });
    });
  }
};

export default showOddsScore;

import axios from "axios";
import { useEffect, useState } from "react";
import TeamComponent from "./TeamName";

const Bookmaker = ({ comm }) => {
  const [bookmakerScore, setbookmakerScore] = useState([]);

  const eventId = localStorage.getItem("event_id");

  const getBookmakerScore = async (mainMarketID) => {
    var options = {
      method: "POST",
      url: "https://odds.starlaser.live/ws/getMarketDataNew",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `market_ids[]=${mainMarketID}`,
    };
    try {
      const { data } = await axios.request(options);

      let bookmakerArray = data[0].split("|");

      setbookmakerScore(bookmakerArray.slice(19));

      setTimeout(() => {
        getBookmakerScore(mainMarketID);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMarketID = async () => {
    try {
      const { data } = await axios.post(
        `https://api.contra247.com/api/guest/event/${eventId}`
      );
      const mainMarketId = data?.data?.event?.book_makers[0].market_id;
      console.log("mainMarketId", data);
      getBookmakerScore(mainMarketId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (eventId) {
      updateMarketID();
    }
  }, []);

  return (
    <>
      {eventId && (
        <div
          className={`items-center flex-col gap-2 text-black font-extrabold w-96 ${
            comm == "Ball Chalu" ? "hidden" : "flex"
          }`}
        >
          {/* ----------------------------------------------------------------------------- */}

          {bookmakerScore && (
            <div
              className={` justify-end items-center w-[300px] mt-1 ${
                bookmakerScore[9] == "1" && bookmakerScore[10] == "1"
                  ? "hidden"
                  : "flex"
              }`}
            >
              <TeamComponent teamName={bookmakerScore[0] || ""} />
              <div>
                <span className="text-sm lg:text-xl rounded-full items-center flex justify-center h-[40px] w-[40px] bg-[#9868bf] mx-1">
                  {bookmakerScore[5] || ""}{" "}
                </span>
              </div>
              <div>
                <span className=" text-sm lg:text-xl rounded-full items-center flex justify-center h-[40px] w-[40px] bg-[#5c80cd]">
                  {bookmakerScore[7] || ""}
                </span>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------------- */}

          {bookmakerScore && (
            <div
              className={` justify-end items-center w-[300px] mt-1 ${
                bookmakerScore[22] == "1" && bookmakerScore[23] == "1"
                  ? "hidden"
                  : "flex"
              }`}
            >
              <TeamComponent teamName={bookmakerScore[13] || ""} />
              <div>
                <span className="text-sm lg:text-xl rounded-full items-center flex justify-center h-[40px] w-[40px] bg-[#9868bf] mx-1">
                  {bookmakerScore[18] || ""}{" "}
                </span>
              </div>
              <div>
                <span className=" text-sm lg:text-xl rounded-full items-center flex justify-center h-[40px] w-[40px] bg-[#5c80cd]">
                  {bookmakerScore[20] || ""}
                </span>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------------- */}

          {bookmakerScore[30] && (
            <div
              className={`justify-end items-center w-[300px] mt-1 ${
                bookmakerScore[35] == "1" && bookmakerScore[36] == "1"
                  ? "hidden"
                  : "flex"
              }`}
            >
              <TeamComponent teamName={bookmakerScore[26] || ""} />
              <div>
                <span className="text-sm lg:text-xl rounded-full items-center flex justify-center h-[40px] w-[40px] bg-[#9868bf] mx-1">
                  {bookmakerScore[31] || ""}{" "}
                </span>
              </div>
              <div>
                <span className=" text-sm lg:text-xl rounded-full items-center flex justify-center h-[40px] w-[40px] bg-[#5c80cd]">
                  {bookmakerScore[33] || ""}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Bookmaker;

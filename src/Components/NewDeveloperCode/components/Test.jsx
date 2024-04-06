import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FancyName from "./FancyName";

const Test = ({ eventId, comm }) => {
  const [fancyScoreValue, setFancyScoreValue] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const overs = queryParams.get("overs");

  function convertToJSON(data) {
    const jsonData = data.map((item) => {
      const [
        id,
        eventId,
        eventPartId,
        marketId,
        marketType,
        fancyType,
        betType,
        name,
        status,
        matchedAmount,
        maxExposure,
        liability,
        overLimit,
        fancyLimit,
        fancySpreadLimit,
        fancyLimitActive,
        betDelay,
        displayOrder,
        minAmount,
        maxAmount,
        maxStack,
        maxRate,
        maxLoss,
        inplayDelay,
        outplayDelay,
        odds,
        marketDataId,
        inplayType,
        autoActive,
        autoInplay,
        autoOutplay,
        createdDate,
        lastModified,
        fancyLimitAction,
        priority,
        backLayActive,
        rateType,
        minSession,
        maxSession,
        isManualApprovalRequired,
        profitShare,
        modifiedDate,
      ] = item.split("|");

      return {
        id,
        eventId,
        eventPartId,
        marketId,
        marketType,
        fancyType,
        betType,
        name,
        status,
        matchedAmount,
        maxExposure,
        liability,
        overLimit,
        fancyLimit,
        fancySpreadLimit,
        fancyLimitActive,
        betDelay,
        displayOrder,
        minAmount,
        maxAmount,
        maxStack,
        maxRate,
        maxLoss,
        inplayDelay,
        outplayDelay,
        odds,
        marketDataId,
        inplayType,
        autoActive,
        autoInplay,
        autoOutplay,
        createdDate,
        lastModified,
        fancyLimitAction,
        priority,
        backLayActive,
        rateType,
        minSession,
        maxSession,
        isManualApprovalRequired,
        profitShare,
        modifiedDate,
      };
    });

    return jsonData;
  }

  const getFancyScore = async (mainMarketID) => {
    var options = {
      method: "POST",
      url: "https://odds.starlaser.live/ws/getMarketDataNew",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: mainMarketID,
    };
    try {
      const { data } = await axios.request(options);
      const converdData = await convertToJSON(data);
      setFancyScoreValue(converdData);
    } catch (error) {
      console.log(error);
    }
  };

  const adjustMarketId = (data) => {
    let dataToSend = "";

    data?.map((market, i) => {
      if (i === 0) {
        dataToSend += `market_ids[]=${market.market_id}`;
      } else {
        dataToSend += `&market_ids[]=${market.market_id}`;
      }
    });

    getFancyScore(dataToSend);
  };

  const updateFancyId = async () => {
    try {
      const { data } = await axios.post(
        `https://api.contra247.com/api/guest/event/${eventId}`
      );
      const mainMarketId = data?.data?.event?.fancy;
      adjustMarketId(mainMarketId);

      setTimeout(() => {
        updateFancyId();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateFancyId();
  }, []);

  return (
    <div
      className={`text-black font-extrabold flex-col gap-1 ${
        comm == "Ball Chalu" ? "hidden" : "flex"
      }`}
    >
      {fancyScoreValue
        ?.filter((data) => {
          if (overs) {
            const oversArray = overs.split(",");
            return oversArray.some((over) => {
              if (data.name.indexOf(over) != -1) {
                return true;
              } else {
                return false;
              }
            });
          } else {
            return true;
          }
        })
        .map((i, index) => {
          const startsWithNumber = /^\d+\sOver\s/i;

          if (!startsWithNumber.test(i.name)) {
            return <></>;
          }

          if (i.name.indexOf("Run Bhav") !== -1) {
            return <></>;
          }
          if (i.minAmount == "0.00" && i.maxStack == "0.00") {
            return <></>;
          }

          return (
            <div
              key={index}
              className={"gap-3 items-center justify-start flex"}
            >
              <div className="flex flex-col bg-[#5c80cd] py-2 items-center justify-center rounded-tl-2xl rounded-br-2xl w-16 ">
                <span className="text-xl">{i.maxStack}</span>
                <span className="text-lg">{i.maxAmount}</span>
              </div>

              <div className="flex flex-col bg-[#9868bf] items-center py-2 justify-center rounded-tl-2xl rounded-br-2xl w-16">
                <span className="text-xl">{i.minAmount}</span>
                <span className="text-lg">{i.displayOrder}</span>
              </div>
              <FancyName name={i.name} />
            </div>
          );
        })}
    </div>
  );
};

export default Test;

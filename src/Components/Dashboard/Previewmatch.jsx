import { Link} from "react-router-dom";
import Header from "../Header";
import LiveOddsScore from "../NewDeveloperCode/components/LiveStream";

const Previewmatch = () => {
  const EventId = localStorage.getItem("event_id");
  const videoUrl = `https://1xbat.biz/livetv.php?MatchId=${EventId}`;

  return (
    <>
      <Header />
      <div style={{ width: "100%", overflowY: "hidden" }}>
        {videoUrl ? (
          <>
            <div
              className="iframe-container"
              style={{
                width: "100%",
                overflowY: "hidden",
                position: "relative",
              }}
            >
              <iframe
                title="Video Player"
                src={"videoUrl"}
                width="100%"
                height="450"
                allowFullScreen
                style={{ overflowY: "hidden" }}
              ></iframe>
              <div className="Session-wraper">
                <LiveOddsScore />
              </div>
            </div>
          </>
        ) : null}
        <div className="prev-wrapper text-center">
          <Link
            to="/NewMatches"
            className="text-center"
            style={{ fontSize: "26px" }}
          >
            {" "}
            <i class="fa-solid fa-house"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Previewmatch;

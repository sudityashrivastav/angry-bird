import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Context } from "./Context/ContextProvider";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showOddsScore from "./NewDeveloperCode/utils/util";

const NewMatches = () => {
  const { matches, setMatches } = useContext(Context);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [AuthorizeData, SetAuthorize] = useState([]);
  useEffect(() => {
    const CustomerId = sessionStorage.getItem("UserId");
    if (CustomerId) {
      Authorize(CustomerId);
    }
  }, []);

  const Authorize = async (CustomerId) => {
    try {
      const response = await axios.post(
        "https://www.helpingbrother.in/CheckAuthorize",
        { CustomerId }
      );
      SetAuthorize(response.data.Authorize);
      console.log("Authorizedata", response);
      toast.success("Authorize account");
    } catch (error) {
      toast.error("UnAuthorize Account");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const { TeamdetailsAll, SetTeamdetailsAll, drmBaseUrl, setDrmBaseUrl } =
    useContext(Context);
  const { NewVideoData, SetNewVideoData } = useState([]);

  async function fetchData() {
    const url = "https://cricket.scoreswift.in/matches";
    const apiKey = "Pdt0KONrMM776071J8OL_v2";

    try {
      const response = await fetch(url, {
        method: "GET", // Adjust the method as needed
        headers: {
          "X-ScoreSwift-Key": apiKey,
        },
      });

      const result = await response.json();
      console.log("response/matches", result);
      if (result.status === 1) {
        setMatches(result.res.matches);
      } else {
        console.error("No data found");
      }
    } catch (error) {
      alert("there is something wrong");
    }
  }

  useEffect(() => {
    const fetchDataAfterDelay = () => {
      fetchData();
    };

    const timeoutId = setTimeout(fetchDataAfterDelay, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleTeamDetails = async (mainMatch) => {

    if (mainMatch.matchStatus === "Finished") {
      Swal.fire({
        icon: "info",
        title: "Match Finished",
        text: "This match has already finished.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    // if (mainMatch.matchStatus === 'Upcoming') {

    //   Swal.fire({
    //     icon: 'info',
    //     title: 'Coming Soon...',
    //     text: 'You can not seeing upcoming match',
    //     confirmButtonColor: '#3085d6',
    //   });
    //   return;
    // }

  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Are you seen match",
    }).then(async (result) => {
      if (result.isConfirmed) {
        showOddsScore(mainMatch, navigate)
      }
    });
  };

  return (
    <>
      <Header />

      <div></div>

      {matches.length > 0 ? (
        <div className="container mt-5 wrapper-Home-pageMatches">
          <div className="text-center">
            {AuthorizeData ? (
              <Link to="/dash">
                <span
                  className="rounded-pill bg-dark text-white p-2"
                  style={{ fontSize: "12px" }}
                >
                  Dashboard
                </span>
              </Link>
            ) : null}
            <h1
              className="mt-2"
              style={{ fontSize: "18px", fontWeight: "700" }}
            >
              Live Matches
            </h1>
          </div>
          <div className="row">
            {matches.map((match, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <h5 className="text-start">
                  {" "}
                  <span class="badge rounded-pill bg-dark">
                    Format:{match.format}
                  </span>
                </h5>

                <div
                  className="card"
                  style={{ border: "1px solid #d3bebe", borderRadius: "10px" }}
                >
                  <div className="d-flex justify-content-between">
                    <div
                      className="d-flex text-start"
                      style={{ flexDirection: "column" }}
                    >
                      <div>
                        <img
                          src={`https://comm-panel.s3.ap-south-1.amazonaws.com/teams/${match.teams.t1.logo}`}
                          className="card-img-top"
                          alt="Team A"
                          style={{ width: "60px", borderRadius: "50%" }}
                        />
                      </div>

                      <div className="card-body">
                        <h5
                          style={{ fontWeight: "700" }}
                          className="card-title"
                        >
                          {match.teams.t1.name}{" "}
                        </h5>
                        <h5
                          style={{ fontWeight: "700" }}
                          className="card-title"
                        >
                          {match.teams.t1.score}{" "}
                        </h5>
                      </div>
                    </div>

                    <div
                      className="d-flex text-end"
                      style={{ flexDirection: "column" }}
                    >
                      <div>
                        <img
                          src={`https://comm-panel.s3.ap-south-1.amazonaws.com/teams/${match.teams.t2.logo}`}
                          className="card-img-top"
                          alt="Team B"
                          style={{ width: "60px", borderRadius: "50%" }}
                        />
                      </div>
                      <div className="card-body">
                        <h5
                          style={{ fontWeight: "700" }}
                          className="card-title"
                        >
                          {match.teams.t2.name}{" "}
                        </h5>
                        <h5
                          style={{ fontWeight: "700" }}
                          className="card-title"
                        >
                          {match.teams.t2.score}{" "}
                        </h5>
                      </div>
                    </div>
                  </div>
                  {/* <Link className='text-start' to='/TeamsDetailsPage' onClick={(e) => { handleTeamDetails(match.time, match.teams.t1.name, match.teams.t2.name) }}>
                                        <span class="badge rounded-pill bg-primary"><i class="fa-solid fa-eye"></i>&nbsp; Preview</span>
                                    </Link> */}

                  <Link
                    onClick={(e) => {
                      handleTeamDetails(
                        match
                      );
                    }}
                  >
                    <span class="badge rounded-pill bg-primary">
                      {" "}
                      <i class="fa-solid fa-tv fa-bounce"></i>&nbsp;Click to see
                    </span>
                  </Link>

                  {/* <Link  onClick={() => Fetchkeysdata(match.key)}><span class="badge rounded-pill bg-primary"> <i class="fa-solid fa-tv fa-bounce"></i>&nbsp;video</span></Link> */}
                  {/* <Link className='text-start' to={`/TeamsDetailsPage/${match.time}/${match.teams.t1.name}/${match.teams.t2.name}`}>
                        <span class="badge rounded-pill bg-primary"><i class="fa-solid fa-eye"></i>&nbsp; Preview</span>
</Link> */}
                  <div
                    className="card-body"
                    style={{
                      border: "1px solid #d3bebe",
                      borderRadius: "10px",
                      margin: "10px 0px",
                    }}
                  >
                    {/* <h5 className="card-title">{match.teams.t1.logo} vs {match.teams.t2.logo}</h5> */}

                    <p className="card-title">Series:{match.srs}</p>

                    <p className="card-text">
                      <span class="badge rounded-pill bg-secondary">
                        Matchstatus: {match.matchStatus}
                      </span>
                    </p>
                    {match.result && match.result.message ? (
                      <span class="badge rounded-pill bg-warning text-dark">
                        {match.result.message}&nbsp;
                        <i class="fa-solid fa-trophy"></i>
                      </span>
                    ) : (
                      <span class="badge rounded-pill bg-danger">pending</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="wrapper-loader-bgColor">
            <section className="Loading-matches text-center">
              <svg
                class="ip"
                viewBox="0 0 256 128"
                width="256px"
                height="128px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#5ebd3e" />
                    <stop offset="33%" stop-color="#ffb900" />
                    <stop offset="67%" stop-color="#f78200" />
                    <stop offset="100%" stop-color="#e23838" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stop-color="#e23838" />
                    <stop offset="33%" stop-color="#973999" />
                    <stop offset="67%" stop-color="#009cdf" />
                    <stop offset="100%" stop-color="#5ebd3e" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke-linecap="round" stroke-width="16">
                  <g class="ip__track" stroke="#ddd">
                    <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                    <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                  </g>
                  <g stroke-dasharray="180 656">
                    <path
                      class="ip__worm1"
                      stroke="url(#grad1)"
                      stroke-dashoffset="0"
                      d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
                    />
                    <path
                      class="ip__worm2"
                      stroke="url(#grad2)"
                      stroke-dashoffset="358"
                      d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
                    />
                  </g>
                </g>
              </svg>
              <br></br>
              <h1>Loading...</h1>
            </section>
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
};

export default NewMatches;

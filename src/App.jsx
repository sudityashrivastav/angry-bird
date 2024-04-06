import Dashboard from "./Components/Dashboard/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardContent from "./Components/DashboardPages/DashboardContent.jsx";
import Previewmatch from "./Components/Dashboard/Previewmatch";
import Login from "./Components/LoginRegister/Login";
import NewMatches from "./Components/NewMatches";
import { ContextProvider } from "./Components/Context/ContextProvider";
import Videoplayer from "./Components/Videoplayer";
import Registration from "./Components/Users/Registration";
import AddUsers from "./Components/DashboardPages/AddUsers.jsx";
import Dash from "./Components/DashboardPages/Dash.jsx";
import EditUsers from "./Components/DashboardPages/EditUsers.jsx";
// import TeamsDetailsPage from "./Components/TeamsDetailsPage";
// import LiveStreaming from "./Components/Dashboard/LiveStreaming";
function App() {
  const userId = sessionStorage.getItem("UserId");
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/DashboardContent" element={<DashboardContent />} />
            <Route path="/Videoplayer" element={<Videoplayer />} />
            <Route path="/" element={<Login />} />
            <Route path="/NewMatches" element={<NewMatches />} />
            <Route path="/UserRegistration" element={<Registration />} />
            {/* <Route path='/users' element={<Dashboard/>}/> */}
            <Route
              path="/AddUsers"
              element={
                <Dashboard>
                  <AddUsers />
                </Dashboard>
              }
            />
            {/* <Route path='/Dash' element={<Dashboard><Dash/></Dashboard>}/> */}

            <Route
              path="/Dash"
              element={
                <Dashboard>
                  <Dash />
                </Dashboard>
              }
            />
            <Route path="/Previewmatch" element={<Previewmatch />} />

            <Route
              path="/Edituser/:id"
              element={
                <Dashboard>
                  <EditUsers />
                </Dashboard>
              }
            />
            {/* <Route path='/TeamsDetailsPage' element={<TeamsDetailsPage />} /> */}

            {/* <Route path='/LiveStreaming/:id' element={<Dashboard><LiveStreaming/></Dashboard>}/> */}
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>

    // </div>
  );
}

export default App;

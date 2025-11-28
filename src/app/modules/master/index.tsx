import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../../admin/layout/core";
import Symptoms from "./Symptoms";
import HungerOrCravings from "./HungerOrCravings";
import Discharge from "./Discharge";
import CycleStages from "./CycleStages";
import MotivationalQuotes from "./MotivationalQuotes";
const ProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="symptoms"
        element={
          <>
            <PageTitle>Symptoms</PageTitle>
            <Symptoms />
          </>
        }
      />
      <Route
        path="hunger-or-cravings"
        element={
          <>
            <PageTitle>Hunger / Cravings</PageTitle>
            <HungerOrCravings />
          </>
        }
      />
      <Route
        path="discharge"
        element={
          <>
            <PageTitle>Discharge</PageTitle>
            <Discharge />
          </>
        }
      />
      <Route
        path="cycle-stages"
        element={
          <>
            <PageTitle>Cycle Stages</PageTitle>
            <CycleStages />
          </>
        }
      />
      <Route
        path="motivational-quotes"
        element={
          <>
            <PageTitle>Motivational Quotes</PageTitle>
            <MotivationalQuotes />
          </>
        }
      />
      <Route
        path="*"
        element={<Navigate to="/error/404" />}
      />
    </Route>
  </Routes>
);
export default ProfilePage;

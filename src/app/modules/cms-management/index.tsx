import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../../admin/layout/core";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import CycleStages from "./CycleStages";
import FAQs from "./FAQs";
import Instructions from "./Instructions";
import Overview from "./Overview";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndCondition from "./TermsAndCondition";
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
        path="terms-and-conditions"
        element={
          <>
            <PageTitle>
              Terms and Conditions
            </PageTitle>
            <TermsAndCondition />
          </>
        }
      />
      <Route
        path="privacy-policy"
        element={
          <>
            <PageTitle>
              Privacy Policy
            </PageTitle>
            <PrivacyPolicy />
          </>
        }
      />
      <Route
        path="about-us"
        element={
          <>
            <PageTitle>
              About Us
            </PageTitle>
            <AboutUs />
          </>
        }
      />
      <Route
        path="overview"
        element={
          <>
            <PageTitle>
              Overview
            </PageTitle>
            <Overview />
          </>
        }
      />
      <Route
        path="instructions"
        element={
          <>
            <PageTitle>
              Instructions
            </PageTitle>
            <Instructions />
          </>
        }
      />
      <Route
        path="cycle-stages"
        element={
          <>
            <PageTitle>
              Cycle Stages
            </PageTitle>
            <CycleStages />
          </>
        }
      />
      <Route
        path="contact-us"
        element={
          <>
            <PageTitle>Contact Us</PageTitle>
            <ContactUs />
          </>
        }
      />
      <Route
        path="faqs"
        element={
          <>
            <PageTitle>FAQ's</PageTitle>
            <FAQs />
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

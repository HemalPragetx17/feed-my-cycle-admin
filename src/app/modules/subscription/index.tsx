import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../../admin/layout/core";
import SubscriptionList from "./SubscriptionList";
import SubscriptionEdit from "./SubscriptionEdit";

const SubscriptionModule = () => (
  <>
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          element={
            <>
              <PageTitle>Subscription Pages</PageTitle>
              <SubscriptionList />
            </>
          }
        />
        <Route
          path="add"
          element={
            <>
              <PageTitle>Subscription - Add</PageTitle>
              <SubscriptionEdit />
            </>
          }
        />
        <Route
          path="edit/:id"
          element={
            <>
              <PageTitle>Subscription - Edit</PageTitle>
              <SubscriptionEdit />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  </>
);

export default SubscriptionModule;

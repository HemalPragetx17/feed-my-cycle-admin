import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../../admin/layout/core";
import UserManagementList from "./UserManagementList";
import UserManagementView from "./UserManagementView";


const UserManagementModule = () => (
  <>
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          element={
            <>
              <PageTitle>User Management Pages</PageTitle>
              <UserManagementList />
            </>
          }
        />
        <Route
          path="view"
          element={
            <>
              <PageTitle>User Management - View Details</PageTitle>
              <UserManagementView />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  </>
);

export default UserManagementModule;



import { FC, lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../admin/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../admin/assets/ts/_utils";
import { WithChildren } from "../../admin/helpers";
import Dashboard from "../modules/dashboard/Dashboard";
import { PageTitle } from "../../admin/layout/core";
const PrivateRoutes = () => {
  const UserManagement = lazy(() => import("../modules/user-management/index"));
  const Subscription = lazy(() => import("../modules/subscription/index"));
  const Blog = lazy(() => import("../modules/blog/index"));
  const Master = lazy(() => import("../modules/master/index"));
  const CMSManagement = lazy(() => import("../modules/cms-management/index"));
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route
          path="auth/*"
          element={<Navigate to="/dashboard" />}
        />
        {/* Pages */}
        <Route
          path="dashboard"
          element={
            <>
              <PageTitle>Dashboard</PageTitle>
              <Dashboard />
            </>
          }
        />
        <Route
          path="user-management/*"
          element={
            <SuspensedView>
              <UserManagement />
            </SuspensedView>
          }
        />
        <Route
          path="subscription/*"
          element={
            <SuspensedView>
              <Subscription />
            </SuspensedView>
          }
        />
        <Route
          path="blog/*"
          element={
            <SuspensedView>
              <Blog />
            </SuspensedView>
          }
        />
        <Route
          path="master/*"
          element={
            <SuspensedView>
              <Master />
            </SuspensedView>
          }
        />
        <Route
          path="cms-management/*"
          element={
            <SuspensedView>
              <CMSManagement />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route
          path="*"
          element={<Navigate to="/error/404" />}
        />
      </Route>
    </Routes>
  );
};
const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};
export { PrivateRoutes };

import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../../admin/layout/core";
import BlogList from "./BlogList";
import BlogCreate from "./BlogCreate";
import BlogView from "./BlogView";
import BlogEdit from "./BlogEdit";


const BlogModule = () => (
  <>
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          element={
            <>
              <PageTitle>Blog Pages</PageTitle>
              <BlogList />
            </>
          }
        />
        <Route
          path="create"
          element={
            <>
              <PageTitle>Blog - Add</PageTitle>
              <BlogCreate />
            </>
          }
        />
        <Route
          path="view"
          element={
            <>
              <PageTitle>Blog - View Details</PageTitle>
              <BlogView />
            </>
          }
        />
        <Route
          path="edit"
          element={
            <>
              <PageTitle>Blog - Edit</PageTitle>
              <BlogEdit />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  </>
);

export default BlogModule;



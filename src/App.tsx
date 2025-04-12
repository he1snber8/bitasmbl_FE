import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import MyUserProfilePage from "./pages/MyUserProfilePage";
import HomePage from "./pages/HomePage";
import PasswordResetForm from "./components/User/PasswordRecoveryAndReset/PasswordResetForm";
import UserProjectsPage from "./pages/UserProjectsPage";

import PublicUserProfilePage from "./pages/PublicUserProfilePage";

import CreatePostPage from "./pages/CreatePostPage";
import PasswordRecoveryForm from "./components/User/PasswordRecoveryAndReset/PasswordRecoveryForm";
import ManageProjectPage from "./components/Project/ManageProjectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
  },
  {
    path: "/password-reset",
    element: <PasswordResetForm />,
  },
  {
    path: "/password-recovery",
    element: <PasswordRecoveryForm />,
  },
  {
    path: "/home",
    element: <AuthenticatedLayout />,
    children: [
      { path: "", element: <HomePage /> },

      {
        path: "profile",
        element: <MyUserProfilePage />,
      },
      {
        path: "profile/:projectId/manage",
        element: <ManageProjectPage />,
      },
      { path: "profile/projects", element: <UserProjectsPage /> },
      { path: "profile/:userId", element: <PublicUserProfilePage /> },
    ],
  },
  { path: "/home/projects/create", element: <CreatePostPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
  // return <Chat />;
}

export default App;

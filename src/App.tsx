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
import LeaderBoardPage from "./components/LEADERBOARD";
import PROJECTS from "./components/PROJECTS";
import HOMEPAGE2 from "./pages/HOMEPAGE2";
import CollaborationPage from "./components/CollaborationPage";
import UserCustomProjectsPage from "./components/UserOwnedProjectsPage";
import MYUSERPROFILEPAGE2 from "./pages/MYUSERPROFILEPAGE2";
import UserOnboardingProcess from "./pages/UserOnboardingProcess";
import { LinkedInCallback } from "react-linkedin-login-oauth2";

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
      // { path: "", element: <HomePage /> },
      { path: "projects", element: <HOMEPAGE2 /> },
      { path: "leaderboard", element: <LeaderBoardPage /> },
      { path: "collab", element: <CollaborationPage /> },
      { path: "userprojects", element: <UserCustomProjectsPage /> },

      {
        path: "profile",
        element: <MYUSERPROFILEPAGE2 />,
      },
      // {
      //   path: "profile/:projectId/manage",
      //   element: <ManageProjectPage />,
      // },
      // { path: "profile/projects", element: <UserProjectsPage /> },
      // { path: "profile/:userId", element: <PublicUserProfilePage /> },
    ],
  },
  { path: "/home/projects/create", element: <CreatePostPage /> },
  { path: "/onboarding", element: <UserOnboardingProcess /> },
]);

function App() {
  return <RouterProvider router={router} />;
  // return <Chat />;
}

export default App;

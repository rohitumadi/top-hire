import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/theme-provider";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Job from "./pages/Job";
import Joblisting from "./pages/Joblisting";
import MyJobs from "./pages/MyJobs";
import Onboarding from "./pages/Onboarding";
import PostJob from "./pages/PostJob";
import SavedJobs from "./pages/SavedJobs";
import Applications from "./pages/Applications.tsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: <Joblisting />,
      },
      {
        path: "/job/:id",
        element: <Job />,
      },
      {
        path: "/applications/:jobId",
        element: <Applications />,
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

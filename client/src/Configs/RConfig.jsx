import { createBrowserRouter } from "react-router-dom";
import Analytics from "../components/Analytics";
import RevokeAccess from "../components/RevokeAccess";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/analytics",
    element: <Analytics/>,
  },
  {
    path: "/revoke",
    element: <RevokeAccess/>,
  },
]);

export default router;


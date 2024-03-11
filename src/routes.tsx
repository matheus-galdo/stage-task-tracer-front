import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateArea from "./pages/Areas/CreateArea";
import ViewArea from "./pages/Areas/ViewArea";
import Process from "./pages/Process/Index";

const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/areas/criar", element: <CreateArea/>},
    {path: "/areas/:areaId", element: <ViewArea/>},
    {path: "/processo/:id", element: <Process/>},
]);

export default router;
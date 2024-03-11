import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateArea from "./pages/Areas/CreateArea";

const router = createBrowserRouter([
    {path: "/", element: <Home/>},
    {path: "/areas/criar", element: <CreateArea/>},
]);

export default router;
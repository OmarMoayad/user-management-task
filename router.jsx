import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './src/Layout/MainLayout';
import Home from './src/assets/pages/Home';
import Details from './src/assets/pages/Details';
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />

            },
            {
                path: "details/:id",
                element: <Details />
            }
        ]
    },
]);

export default router;

import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./RootLayout.tsx";
import Home from "./pages/Home.tsx";
import Students from "./pages/StudentsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/students",
        element: <Students />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

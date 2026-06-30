import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./RootLayout.tsx";
import Home from "./pages/Home.tsx";
import Students from "./pages/StudentsPage.tsx";
import ClassesPage from "./pages/ClassesPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LessonsPage from "./pages/LessonsPage.tsx";
import TeachersPage from "./pages/TeachersPage.tsx";

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
      {
        path: "/classes",
        element: <ClassesPage />,
      },
      {
        path: "/lessons",
        element: <LessonsPage />,
      },
      {
        path: "/teachers",
        element: <TeachersPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

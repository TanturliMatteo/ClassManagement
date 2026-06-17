import { Outlet } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Header from "./components/layout/Header.tsx";
import Footer from "./components/layout/Footer.tsx";

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="rootLayout">
        <Header />
        <main className="mainLayout">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default RootLayout;

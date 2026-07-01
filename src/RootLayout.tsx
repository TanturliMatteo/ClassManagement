import { Outlet } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Header from "./components/layout/Header.tsx";
import Footer from "./components/layout/Footer.tsx";
import { useState, useEffect } from "react";
import { supabase } from "./services/supabase.ts";
import type { User } from "@supabase/supabase-js";
import LoginPage from "./pages/LoginPage.tsx";

const queryClient = new QueryClient();

function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="rootLayout" style={{ color: "white", padding: "2rem" }}>
        Caricamento...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="rootLayout">
        {!user ? (
          <LoginPage />
        ) : (
          <>
            <Header />
            <main className="mainLayout">
              <Outlet />
            </main>
            <Footer />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default RootLayout;

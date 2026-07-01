import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Email o password non valide. Riprova.");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="mainLayout">
      <form onSubmit={handleLogin} className="login-container">
        <h2>Accedi</h2>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errorMsg && (
          <div
            style={{
              color: "#ff4d4d",
              fontWeight: "bold",
            }}
          >
            {errorMsg}
          </div>
        )}

        <button type="submit" disabled={loading} className="login-button">
          {loading ? "Accesso in corso..." : "Accedi"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

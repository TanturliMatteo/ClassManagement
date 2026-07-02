import { Link } from "react-router";
import { useGetStudents } from "../hooks/useGetStudents";
import { useGetTeachers } from "../hooks/useGetTeachers";
import { useGetClasses } from "../hooks/useGetClasses";
import { useGetLessons } from "../hooks/useGetLessons";
import logo from "../assets/logo.png";

const HomePage = () => {
  const { data: students } = useGetStudents();
  const { data: teachers } = useGetTeachers();
  const { data: classes } = useGetClasses();
  const { data: lessons } = useGetLessons();
  const todayStr = new Date().toLocaleDateString("sv-SE");

  const stats = [
    {
      label: "🎓 Totale Studenti",
      value: students?.length ?? 0,
      path: "/students",
      color: "#3b82f6",
    },
    {
      label: "🏫 Classi Attive",
      value: classes?.length ?? 0,
      path: "/classes",
      color: "#10b981",
    },
    {
      label: "👨‍🏫 Insegnanti",
      value: teachers?.length ?? 0,
      path: "/teachers",
      color: "#f59e0b",
    },
    {
      label: "📅 Lezioni Oggi",
      value:
        lessons?.filter(
          (l) =>
            l.date && new Date(l.date).toLocaleDateString("sv-SE") === todayStr,
        ).length ?? 0,
      path: "/lessons",
      color: "#ef4444",
    },
  ];

  return (
    <div className="dashboard-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <Link
            key={i}
            to={stat.path}
            className="stat-card"
            style={{ borderTop: `4px solid ${stat.color}` }}
          >
            <span className="stat-label">{stat.label}</span>
            {/* 🌟 Coloriamo anche il numero per dare un richiamo visivo forte */}
            <span className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

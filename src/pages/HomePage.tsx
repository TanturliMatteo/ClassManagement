import { Link, useOutletContext } from "react-router";
import { useGetStudents } from "../hooks/useGetStudents";
import { useGetTeachers } from "../hooks/useGetTeachers";
import { useGetClasses } from "../hooks/useGetClasses";
import { useGetLessons } from "../hooks/useGetLessons";
import logo from "../assets/logo.png";

const HomePage = () => {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();
  const { data: students } = useGetStudents();
  const { data: teachers } = useGetTeachers();
  const { data: classes } = useGetClasses();
  const { data: lessons } = useGetLessons();
  const todayStr = new Date().toLocaleDateString("sv-SE");

  const stats = [
    {
      label: "🏫 Active Classes",
      value: classes?.length ?? 0,
      path: "/classes",
      color: "#10b981",
    },
    {
      label: "🎓 Totale Studenti",
      value: students?.length ?? 0,
      path: "/students",
      color: "#3b82f6",
      className: "stat-card-label",
    },
    {
      label: "📅 Today Lessons",
      value:
        lessons?.filter(
          (l) =>
            l.date && new Date(l.date).toLocaleDateString("sv-SE") === todayStr,
        ).length ?? 0,
      path: "/lessons",
      color: "#ef4444",
    },
    {
      label: "👨‍🏫 Teachers",
      value: teachers?.length ?? 0,
      path: "/teachers",
      color: "#f59e0b",
    },
  ];

  return (
    <div className="dashboard-container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="stats-grid">
        {stats.map((stat, i) => {
          const content = (
            <>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </span>
            </>
          );
          const style = { borderTop: `4px solid ${stat.color}` };

          // La pagina Teachers è riservata agli admin: per gli altri la
          // scheda resta visibile (layout a 4) ma non è cliccabile.
          if (stat.path === "/teachers" && !isAdmin) {
            return (
              <div key={i} className="stat-card stat-card--static" style={style}>
                {content}
              </div>
            );
          }

          return (
            <Link key={i} to={stat.path} className="stat-card" style={style}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;

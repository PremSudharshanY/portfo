import "./styles/TechStack.css";
import {
  SiPython,
  SiMysql,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";
import { 
  FaChartLine, 
  FaWater, 
  FaChartPie, 
  FaFileExcel, 
  FaChartBar, 
  FaChartArea 
} from "react-icons/fa";

const skills = [
  { name: "Python", icon: <SiPython />, color: "#3776AB" },
  { name: "SQL", icon: <SiMysql />, color: "#F7931E" },
  { name: "Power BI", icon: <FaChartBar />, color: "#F2C811" },
  { name: "Tableau", icon: <FaChartArea />, color: "#E97627" },
  { name: "Excel", icon: <FaFileExcel />, color: "#217346" },
  { name: "Pandas", icon: <SiPandas />, color: "#150458" },
  { name: "NumPy", icon: <SiNumpy />, color: "#4DABCF" },
  { name: "Matplotlib", icon: <FaChartLine />, color: "#11557C" },
  { name: "Seaborn", icon: <FaWater />, color: "#444876" },
  { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
  { name: "Scikit-learn", icon: <SiScikitlearn />, color: "#EE4C2C" },
  { name: "Statistics", icon: <FaChartPie />, color: "#8B5CF6" },
];

const TechStack = () => {
  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>
      <div className="tech-grid">
        {skills.map((skill, i) => (
          <div
            className="tech-ball"
            key={skill.name}
            style={
              {
                "--ball-color": skill.color,
                "--delay": `${i * 0.15}s`,
              } as React.CSSProperties
            }
          >
            <div className="tech-ball-inner">
              <span className="tech-icon">{skill.icon}</span>
              <span className="tech-name">{skill.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;

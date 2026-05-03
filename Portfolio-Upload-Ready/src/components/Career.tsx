import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BE in ECE</h4>
                <h5>Dr. T. Thimmaiah Institute of Technology</h5>
              </div>
              <h3>2021-2025</h3>
            </div>
            <p>
              Bachelor of Engineering in Electronics and Communication. KGF, Karnataka, India.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AIML Intern</h4>
                <h5>Rooman Technology</h5>
              </div>
              <h3>2024-2025</h3>
            </div>
            <p>
              I have completed an AI/ML internship at Rooman Technologies, where I gained hands-on experience in machine learning, data analysis, and building real-world projects using Python and SQL, which strengthened my problem-solving skills and enhanced my ability to apply AI concepts to real-world scenarios.

            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Course</h4>
                <h5>Besant Technologies</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Completed a comprehensive 6-month Data Science course covering Python
              programming, statistical analysis, machine learning algorithms, data
              visualization with Power BI and Tableau, SQL for data manipulation, and
              hands-on project work with real-world datasets to build end-to-end
              analytical solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

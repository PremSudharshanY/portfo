import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { createPortal } from "react-dom";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [isKfcModalOpen, setIsKfcModalOpen] = useState(false);
  const [isAmexModalOpen, setIsAmexModalOpen] = useState(false);
  const [isOlaModalOpen, setIsOlaModalOpen] = useState(false);

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        pinSpacing: true, // Explicitly set to true to prevent overlapping
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Refresh ScrollTrigger after a slight delay to ensure correct height calculation
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <>
      <div className="work-section" id="work">
        <div className="work-container section-container">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-flex">
            <div 
              className="work-box" 
              onClick={(e) => {
                e.preventDefault();
                setIsKfcModalOpen(true);
              }} 
              style={{ cursor: "pointer" }}
            >
              <div className="work-info" style={{ pointerEvents: "none" }}>
                <div className="work-title">
                  <h3>01</h3>
                  <div>
                    <h4>KFC Sales Trend Analysis</h4>
                    <p>Dashboard Overview</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>SQL, Python, Power BI</p>
                <p style={{ color: "var(--accentColor)", marginTop: "10px", fontSize: "14px", fontWeight: "bold" }}>
                  📁 Click to view project details
                </p>
              </div>
              <div style={{ pointerEvents: "none" }}>
                <WorkImage image="https://raw.githubusercontent.com/PremSudharshanY/KFC-Sales-Analysis/main/KFC-Sales-Analysis/Dashboard/Screenshots/Screenshot%202026-05-03%20123337.png" alt="KFC Sales Analysis Overview" />
              </div>
            </div>

            <div 
              className="work-box"
              onClick={(e) => {
                e.preventDefault();
                setIsAmexModalOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="work-info" style={{ pointerEvents: "none" }}>
                <div className="work-title">
                  <h3>02</h3>
                  <div>
                    <h4>Amex Risk Analysis</h4>
                    <p>Risk Analysis</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>Pandas, NumPy, Power BI</p>
                <p style={{ color: "var(--accentColor)", marginTop: "10px", fontSize: "14px", fontWeight: "bold" }}>
                  📁 Click to view project details
                </p>
              </div>
              <div style={{ pointerEvents: "none" }}>
                <WorkImage image="https://github.com/user-attachments/assets/f7eed633-a79a-4230-8c68-f7312dcb1f0c" alt="Amex Risk Analysis Home Dashboard" />
              </div>
            </div>

            <div 
              className="work-box" 
              onClick={(e) => {
                e.preventDefault();
                setIsOlaModalOpen(true);
              }} 
              style={{ cursor: "pointer" }}
            >
              <div className="work-info" style={{ pointerEvents: "none" }}>
                <div className="work-title">
                  <h3>03</h3>
                  <div>
                    <h4>Ola Ride Analysis</h4>
                    <p>Dashboard Overview</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>SQL, Python, Power BI</p>
                <p style={{ color: "var(--accentColor)", marginTop: "10px", fontSize: "14px", fontWeight: "bold" }}>
                  📁 Click to view project details
                </p>
              </div>
              <div style={{ pointerEvents: "none" }}>
                <WorkImage image="https://github.com/user-attachments/assets/ea69f809-a3aa-4883-b70b-40ef576434c0" alt="Ola Ride Data Analysis Overview" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isKfcModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="project-modal" onClick={() => setIsKfcModalOpen(false)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsKfcModalOpen(false)}>×</button>
            <div className="project-modal-header">
              <h2>KFC Sales Trend Analysis</h2>
              <div className="project-overview-points" style={{ textAlign: "left", marginBottom: "20px" }}>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px", color: "var(--white)", lineHeight: "1.6" }}>
                  <li>Analyzed sales performance and order trends.</li>
                  <li>Identified peak demand periods and customer growth.</li>
                  <li>Evaluated top and low performing products.</li>
                  <li>Monitored delivery efficiency and delays.</li>
                  <li>Tracked category-wise revenue contribution.</li>
                </ul>
              </div>
              <a href="https://github.com/PremSudharshanY/KFC-Sales-Analysis" target="_blank" rel="noreferrer" className="github-link">
                View on GitHub
              </a>
            </div>
            <div className="project-screenshots">
              <div style={{ marginBottom: "30px" }}>
                <img src="https://raw.githubusercontent.com/PremSudharshanY/KFC-Sales-Analysis/main/KFC-Sales-Analysis/Dashboard/Screenshots/Screenshot%202026-05-03%20123337.png" alt="Overview Dashboard" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Overview Dashboard displaying key KPIs including sales, orders, customer count, and average order value.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://raw.githubusercontent.com/PremSudharshanY/KFC-Sales-Analysis/main/KFC-Sales-Analysis/Dashboard/Screenshots/Screenshot%202026-05-03%20123408.png" alt="Sales Analysis" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Sales Analysis showing category-wise sales distribution and daily revenue trends.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://raw.githubusercontent.com/PremSudharshanY/KFC-Sales-Analysis/main/KFC-Sales-Analysis/Dashboard/Screenshots/Screenshot%202026-05-03%20123432.png" alt="Order Analysis" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Order Analysis providing insights into order volume, delivery performance, and delay metrics.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://raw.githubusercontent.com/PremSudharshanY/KFC-Sales-Analysis/main/KFC-Sales-Analysis/Dashboard/Screenshots/Screenshot%202026-05-03%20123459.png" alt="Product Analysis" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Product Analysis analyzing top and low performing products and their contribution to total sales.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://raw.githubusercontent.com/PremSudharshanY/KFC-Sales-Analysis/main/KFC-Sales-Analysis/Dashboard/Screenshots/Screenshot%202026-05-03%20123535.png" alt="Summary Dashboard" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Summary Dashboard presenting an overall performance summary with KPIs and growth insights.</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isAmexModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="project-modal" onClick={() => setIsAmexModalOpen(false)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsAmexModalOpen(false)}>×</button>
            <div className="project-modal-header">
              <h2>American Express Risk Analysis</h2>
              <div className="project-overview-points" style={{ textAlign: "left", marginBottom: "20px" }}>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px", color: "var(--white)", lineHeight: "1.6" }}>
                  <li>Conducted analysis of banking and financial risk data.</li>
                  <li>Focused on loan and deposit performance metrics.</li>
                  <li>Developed customer segmentation based on financial behavior.</li>
                  <li>Created comprehensive dashboards for summary evaluation.</li>
                </ul>
              </div>
              <a href="https://github.com/PremSudharshanY/American-Express-Risk-Analysis" target="_blank" rel="noreferrer" className="github-link">
                View on GitHub
              </a>
            </div>
            <div className="project-screenshots">
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/f7eed633-a79a-4230-8c68-f7312dcb1f0c" alt="Home Dashboard" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Home Dashboard presenting an overview of financial risk indicators.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/237f5aa2-4f0e-4221-b301-da5aeb24d1e8" alt="Loan Analysis" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Detailed Loan Analysis dashboard highlighting default rates and loan performance.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/7d6aa343-8297-4cfd-afd4-ef70d1ab1b7e" alt="Deposit Analysis" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Deposit Analysis breakdown exploring customer deposit behaviors.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/7992219f-d62e-4d9e-a637-df4e6e27dc63" alt="Summary Dashboard" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>A high-level Summary Dashboard aggregating insights across risk domains.</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isOlaModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="project-modal" onClick={() => setIsOlaModalOpen(false)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsOlaModalOpen(false)}>×</button>
            <div className="project-modal-header">
              <h2>Ola Ride Analysis</h2>
              <div className="project-overview-points" style={{ textAlign: "left", marginBottom: "20px" }}>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px", color: "var(--white)", lineHeight: "1.6" }}>
                  <li>Performed end-to-end data analysis of Ola ride bookings.</li>
                  <li>Focused on customer behavior and driver performance.</li>
                  <li>Analyzed revenue trends and cancellation rates.</li>
                  <li>Delivered insights into vehicle type usage and ratings.</li>
                </ul>
              </div>
              <a href="https://github.com/PremSudharshanY/Ola-Ride-Analysis" target="_blank" rel="noreferrer" className="github-link">
                View on GitHub
              </a>
            </div>
            <div className="project-screenshots">
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/ea69f809-a3aa-4883-b70b-40ef576434c0" alt="Overview" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Overall dashboard providing a bird's-eye view of ride statistics.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/7664bfec-82b9-445d-befd-2f224f87ab26" alt="Vehicle Type Analysis" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Analysis breaking down ride data by vehicle type and popularity.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/5181f97b-d9b0-45f4-a225-c032ef7a08a8" alt="Revenue Analysis" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Revenue trends highlighting peak earning periods and patterns.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/f4eedde4-3de6-4199-8169-f43f2edb3382" alt="Cancellation Analysis" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Insights into ride cancellations, reasons, and operational impact.</p>
              </div>
              <div style={{ marginBottom: "30px" }}>
                <img src="https://github.com/user-attachments/assets/b780142d-ef39-4879-a1ee-32e087eae0ca" alt="Ratings Overview" style={{ marginBottom: "10px" }} />
                <p style={{ color: "var(--white)", fontSize: "16px", textAlign: "center" }}>Driver and customer ratings overview to evaluate service quality.</p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Work;

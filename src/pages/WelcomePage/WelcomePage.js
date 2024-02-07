import "./WelcomePage.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom"

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate("/main")
  }

  return (
    <>
      <div className="page-container">
        <div className="page-main">
          <Header />
          <section className="welcome">
          <div className="welcome-title">
            Get fast and easy health advice without any jargon.
          </div>

          <div className="welcome-text">
            Health advice and consultation can be difficult to obtain.
            <p className="welcome-p">
              Many do not have a family doctor, walk-in clinics and EMR have long wait times, and the information available online can be overwhelming to sift through.
            </p>
            <p className="welcome-p">
              Your personal health assistant is designed to give you health and well-being advice anywhere and anytime, in easy-to-understand terms.
            </p>
            <p className="welcome-p">
              You can ask any question related to your health and wellness and
              get a fast and actionable reply. No more wait times or confusing
              jargon.
            </p>
          </div>
          <button onClick={handleClick} className="button-start" > Start </button>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

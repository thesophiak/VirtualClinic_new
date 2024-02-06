import "./Footer.scss";
import likeIcon from "../../assets/icons/likes.svg"

function Header() {
  return (
    <>
      <section className="medical-service-header">
        <div className="container">
          <h1 className="disclaimer-title">*Disclaimer:</h1>
          <p className="disclaimer">
            The AI-provided medical advice is for informational purposes only
            and is not a substitute for professional medical advice, diagnosis,
            or treatment. Always consult a healthcare professional for medical
            concerns.
          </p>
          <p className="built-by">Built with care <img className="heart" src={likeIcon} alt="heart icon"/> by Sophia Kapchinsky </p>
          <p className="learn-more">Learn more about Sophia at <a>www.TheSophiaK.com</a></p>
        </div>
      </section>
    </>
  );
}

export default Header;

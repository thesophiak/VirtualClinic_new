import "./Header.scss";
import homeIcon from "../../assets/icons/home.svg"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <section className="medical-service-header">

        <div className="container">
        <div className="home-title-icon">
        <Link to="/"> <img src={homeIcon} alt="home icon" className="home-icon" /></Link>
        
          <h1 className="title">Your Trusted Virtual Clinic</h1>
          </div>
          <p className="subtitle">
            Providing expert* care for your health and well-being
          </p>
        </div>
      </section>
    </>
  );
}

export default Header;

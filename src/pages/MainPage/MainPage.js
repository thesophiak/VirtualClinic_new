import Header from "../../components/Header/Header";
import Advice from "../../components/Advice/Advice";
import Footer from "../../components/Footer/Footer";
import "./MainPage.scss";

function MainPage() {
  return (
    <>
      <div className="page-container">
        <div className="page-main">
          <Header />
          <Advice />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainPage;

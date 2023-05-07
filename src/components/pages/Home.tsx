import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../structure/SearchBar";
import "../../css/fade-in.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSubmit = (value: string) => {
    navigate(`./analyze?search=${value}`);
  };

  return (
    <div
      className={isMobile ? "mt-3" : "mt-5"}
      style={{
        marginTop: "50px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Container
        className={
          "d-flex flex-column justify-content-center align-items-center " +
          isMobile
            ? "mb-4"
            : "mb-5"
        }
      >
        <h1
          className="text-center"
          style={{
            fontSize: isMobile ? "50px" : "60px",
            fontFamily: "Playfair Display, serif",
            fontWeight: 900,
          }}
        >
          Sentimentor
        </h1>
        <h4
          className="text-center"
          style={{
            fontSize: isMobile ? "18px" : "22px",
            fontFamily: "Playfair Display, serif",
            fontWeight: "light",
          }}
        >
          by REMLA23 Group 19
        </h4>
      </Container>
      <Container
        className={`d-flex flex-column justify-content-center align-items-center mb-4${
          loaded ? " fade-in-down" : ""
        }`}
        style={{
          backgroundColor: "#444a46",
          paddingTop: "20px",
          paddingBottom: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
          borderRadius: "15px",
        }}
      >
        <h3
          className="text-center font-weight-bold mb-2"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#c4ccbe",
          }}
        >
          Info 📰
        </h3>
        <p
          className={`text-center font-weight-bold ${
            isMobile ? "mb-3" : "mb-4"
          }`}
          style={{
            fontSize: isMobile ? "16px" : "18px",
          }}
        >
          Some information / placeholder
        </p>
      </Container>
      <Container
        className={`d-flex flex-column justify-content-center align-items-center${
          loaded ? " fade-in-down" : ""
        }`}
        style={{
          backgroundColor: "#4f4d4a",
          paddingTop: "20px",
          paddingBottom: "10px",
          paddingLeft: "20px",
          paddingRight: "20px",
          borderRadius: "15px",
        }}
      >
        <h3
          className="text-center font-weight-bold mb-2"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#ccc6be",
          }}
        >
          Analysis Tool 🔍
        </h3>
        <p
          className="text-center font-weight-bold mb-4"
          style={{
            fontSize: isMobile ? "16px" : "18px",
          }}
        >
          Query the service model here:
        </p>
        <SearchBar placeholderText="Enter query" onSearch={handleSubmit} initialValue="" />
      </Container>
    </div>
  );
}

export default Home;

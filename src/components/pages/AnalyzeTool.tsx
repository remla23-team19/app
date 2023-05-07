import SearchBar from "../structure/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

function AnalyzeTool() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search") || "-";

    const navigate = useNavigate();

    const handleSubmit = (value: string) => {
        navigate(`/analyze?search=${value}`);
    };

    return (
        <>
            <Container className="d-flex flex-column justify-content-center align-items-center mt-4">
            <SearchBar  placeholderText="Enter new query" onSearch={handleSubmit} initialValue={searchValue} />
            </Container>
            <Container className="d-flex flex-column justify-content-center align-items-center mt-2">
            <h4>{"Query: " + searchValue}</h4>
            </Container>
        </>
    );
}

export default AnalyzeTool;
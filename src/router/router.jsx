import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Mint from "../pages/mint"

function RouterLink() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/mint" element={<Mint />} />

            </Routes>
        </>
    );
}

export default RouterLink;

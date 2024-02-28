import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import { MintGreat, MintBaby } from "../pages/mint"

function RouterLink() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/mint" element={<Navigate to="/mint/great" />} />
                <Route path="/mint/great" element={<MintGreat />} />
                <Route path="/mint/baby" element={<MintBaby />} />
            </Routes>
        </>
    );
}

export default RouterLink;

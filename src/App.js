import TopBar from "./TopBar";
import Seats from "./Seats";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage";
import Movie from "./Hours";
import GlobalStyle from "./GlobalStyles";
import Success from "./Success";

export default function App() {
    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <TopBar />
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/sessoes/:idFilme" element={<Movie/>} />
                    <Route path="/assentos/:idFilme" element={<Seats/>} />
                    <Route path="/sucesso" element={<Success/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
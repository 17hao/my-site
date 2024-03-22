import React from "react";
import BasicRouter from "./basic-router";
import Footer from "./footer";

export default function App() {
    const style = {
        minHeight: "calc(100vh - 25px)"
    }

    return (
        <div>
            <div className="app" style={style}>
                <BasicRouter />
            </div>
            <Footer />
        </div>
    );
}

import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from 'react-modal-hook';
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./components/App";
import LoginForm from "./components/login-form";
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById("root"));
root.render(
    <ModalProvider>
        <App />
    </ModalProvider>
);
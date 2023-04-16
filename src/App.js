import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/home";
import { routes } from "./routes/Routes";
import store from './store/store';
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path="*" element={<Navigate to={routes.home} />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

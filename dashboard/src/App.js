import React, { useEffect, useState } from "react";
import { Joystick } from "react-joystick-component";
import Switch from "@mui/material/Switch";
import axios from "axios";
import RecordComponent from "./RecordComponent.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AIApp from "./pages/ai";
import JoystickApp from "./pages/joystick";
import MapApp from "./pages/map.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={null} />
        <Route path="/joystick" element={<JoystickApp />} />
        <Route path="/ai" element={<AIApp />} />
        <Route path="/map" element={<MapApp />} />
      </Routes>
    </Router>
  );
}

export default App;

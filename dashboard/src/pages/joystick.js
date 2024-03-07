import React, { useEffect, useState } from "react";
import { Joystick } from "react-joystick-component";
import Switch from "@mui/material/Switch";
import axios from "axios";
import RecordComponent from "../RecordComponent.tsx";

function JoystickApp() {
  const [leftJoystickData, setLeftJoystickData] = useState({ x: 0.0, y: 0.0 });
  const [rightJoystickData, setRightJoystickData] = useState({
    x: 0.0,
    y: 0.0,
  });
  const [switchState, setSwitchState] = useState(false); // false for off, true for on
  const url = "https://motion.avatour.duckdns.org";

  const sendDataToServer = (data) => {
    console.log(data);

    axios
      .post(url, data)
      .then((response) => {
        console.log("Success!", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    let data = {
      // content: `(${x}, ${y})`
      content: {
        Mode: switchState ? 1 : 0,
        leftJoystick: leftJoystickData,
        rightJoystick: rightJoystickData,
      },
    };
    sendDataToServer(data);
  }, [leftJoystickData, rightJoystickData, switchState]);

  const leftOnMove = (e) => {
    const x = e.x;
    const y = e.y;
    setLeftJoystickData({ x: x, y: y });
  };
  const leftStop = () => {
    setLeftJoystickData({ x: 0.0, y: 0.0 });
  };
  const rightOnMove = (e) => {
    const x = e.x;
    const y = e.y;
    setRightJoystickData({ x: x, y: y });
  };
  const rightStop = () => {
    setRightJoystickData({ x: 0.0, y: 0.0 });
  };

  const handleSwitchChange = (event) => {
    const newSwitchState = event.target.checked;
    setSwitchState(newSwitchState);
  };

  return (
    <div
      style={{
        position: "absolute", // Use absolute positioning
        left: 0, // Align the container to the left edge of the parent
        right: 0, // Align the container to the right edge of the parent
        bottom: "0%", // Position the container at the bottom of the parent
        display: "flex", // Use flexbox for layout
        justifyContent: "space-between", // Space out the child elements
        alignItems: "center", // Align items vertically in the center
        paddingBottom: "20px", // Add some padding at the bottom
      }}
    >
      <div style={{ width: "30%", display: "flex", justifyContent: "center" }}>
        <Joystick
          size={100}
          baseColor="rgba(245, 245, 245, 0.5)"
          stickColor="rgba(128, 128, 128, 0.7)"
          move={leftOnMove}
          stop={leftStop}
        />
      </div>

      <div>
        <Switch
          checked={switchState ? true : false}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <div>
        <RecordComponent />
      </div>

      <div style={{ width: "30%", display: "flex", justifyContent: "center" }}>
        <Joystick
          size={100}
          baseColor="rgba(245, 245, 245, 0.5)"
          stickColor="rgba(128, 128, 128, 0.7)"
          move={rightOnMove}
          stop={rightStop}
        />
      </div>
    </div>
  );
}

export default JoystickApp;

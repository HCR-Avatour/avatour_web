import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";

const OnOffButton = () => {
  const [status, setStatus] = useState(false);

  return (
    <Button
      style={{
        borderRadius: "60px",
        width: "100px",
        height: "100px",
        borderStyle: "solid",
        borderWidth: "5px",
        borderColor: "black",
      }}
      variant={status ? "success" : "danger"}
      size="lg"
      onClick={() => {
        setStatus(!status);
      }}
    >
      {status ? (
        <img src={require("../static_assets/happy_robot.png")} width={50} />
      ) : (
        <img src={require("../static_assets/dead_robot.png")} width={50} />
      )}
    </Button>
  );
};

export default OnOffButton;

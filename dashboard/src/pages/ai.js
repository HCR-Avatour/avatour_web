import { useEffect, useState, useRef } from "react";
import "../index.css";
import { Helmet } from "react-helmet";
// import RecordComponent from "../RecordComponent.tsx";

export default function AIApp() {
  const [data, setData] = useState(null);
  const [isWalking, setIsWalking] = useState(false);
  const [counter, setCounter] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  // const { loading_audio } = RecordComponent();

  var res;

  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://assistant.avatour.duckdns.org/log", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        res = await response.json();

        setData(res.transcript);
        setCounter((prevCounter) => prevCounter + 1);
        setAudioUrl(res.audioUrl);


        console.log("isWalking:", isWalking);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially when the component mounts
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    console.log("data changed");
    // printData();
    setIsWalking(false);
    setCounter(0);
  }, [data]);

  useEffect(() => {
    console.log("counter changed");
    console.log("counter: ", counter);
    if (counter > 2) {
      console.log("greater than 5");
      setIsWalking(true);
      setCounter(0); // Reset the counter
    }
    // console.log("loading_audio: ", loading_audio);
  }, [counter]);

  useEffect(() => {
    // Add an event listener to play the audio when the src changes
    if(audioUrl != null && audioRef.current != null){
      audioRef.current.play();
    }
  }, [audioUrl]);

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    overflow: "clip",
  };

  const gridItem = {
    fontSize: "11px",
    textAlign: "center",
    overflow: "clip",
  };

  const nodContent = `
      <model-viewer 
          src='RobotExpressive.glb'
          autoplay
          animation-name="Yes"
          animation-loop
          animation-playback-controls>
      </model-viewer>
    `;

  const walkingContent = `
      <model-viewer 
          src='RobotExpressive.glb'
          autoplay
          animation-name="Walking"
          animation-loop
          animation-playback-controls>
      </model-viewer>
    `;

  return (
    <div className="AI">
      {/* NEED TO CHANGE BROWSER PRIVACY SETTINGS TO ALLOW AUDIO AUTOPLAY */}

      <audio ref={audioRef}/>
       <source src={audioUrl} type="audio/wav" />
      {/* <audio src={audioUrl} ref={audioRef}/> */}
      <div style={gridContainer}>
        <div style={gridItem}>
          <div className="box3 sb13">
            {/* loadingAUDIO: {String(loading_audio)}
            {loading_audio ?  "Loading..." : data} */}
            {data}
          </div>
        </div>
        <div style={gridItem}>
          <Helmet>
            <script
              type="module"
              src="https://unpkg.com/@google/model-viewer"
            ></script>
          </Helmet>
          {isWalking ? (
            <div
              style={{ height: "fit-content" }}
              dangerouslySetInnerHTML={{ __html: walkingContent }}
            ></div>
          ) : (
            <div
              style={{ height: "fit-content" }}
              dangerouslySetInnerHTML={{ __html: nodContent }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

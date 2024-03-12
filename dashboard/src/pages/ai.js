import { useEffect, useState, useRef } from "react";
import "../index.css";
import { Helmet } from "react-helmet";

export default function AIApp() {
  const [data, setData] = useState(null);
  const [isWalking, setIsWalking] = useState(false);
  const [counter, setCounter] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isIdle, setIsIdle] = useState(true);

  var res;
  const msg = new SpeechSynthesisUtterance();

  msg.pitch = 1;
  msg.rate = 1;
  msg.volume = 1;
  // console.log(window.speechSynthesis.getVoices())
  msg.voice = window.speechSynthesis.getVoices()[159];


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
        setLoading(res.loading);

        // console.log("isWalking:", isWalking);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []); 


  useEffect(() => {
    console.log("data changed");
    // printData();
    setIsWalking(false);
    setIsIdle(false);
    setCounter(0);
    msg.text = data;
    window.speechSynthesis.speak(msg);

  }, [data]);

  useEffect(() => {
    console.log("loading changed");
    // printData();
    setIsWalking(false);
    setIsIdle(true);
    setCounter(0);
  }, [loading == true]);

  useEffect(() => {
    // console.log("counter changed");
    // console.log("counter: ", counter);
    if (counter > 2) {
      // console.log("greater than 5");
      setIsWalking(true);
      setCounter(0); // Reset the counter
    }
  }, [counter]);

  // useEffect(() => {
  //   // Add an event listener to play the audio when the src changes
  //   console.log("audio changed")
    
  //   if(audioUrl != null && audioRef.current != null){
  //     audioRef.current.play();
  //   }
  // }, [audioUrl]);

  

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "700px 300px",
    overflow: "clip",
    justifyItems: "end",
    padding: "2px",
  };

  const gridItem = {
    fontSize: "11px",
    textAlign: "center",
    overflow: "clip",
    align: "right",
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

  const idleContent = `
    <model-viewer 
            src='RobotExpressive.glb'
            autoplay
            animation-name="Idle"
            animation-loop
            animation-playback-controls>
        </model-viewer>
    `;

  return (
    <div className="AI">
      {/* NEED TO CHANGE BROWSER PRIVACY SETTINGS TO ALLOW AUDIO AUTOPLAY */}
     {/*<audio ref={audioRef} src={audioUrl}/>*/}
      <div style={gridContainer}>
        <div style={gridItem}>
          <div className="box3 sb13">
            {loading ? "Thinking..." : data}
          </div>
        </div>
        <div style={gridItem}>
          <Helmet>
            <script
              type="module"
              src="https://unpkg.com/@google/model-viewer"
            ></script>
          </Helmet>
          {isIdle ? (
            <div
              style={{ height: "fit-content" }}
              dangerouslySetInnerHTML={{ __html: idleContent }}
            ></div>
          ) : (
            isWalking ? (
              <div
                style={{ height: "fit-content" }}
                dangerouslySetInnerHTML={{ __html: walkingContent }}
              ></div>
            ) : (
              <div
                style={{ height: "fit-content" }}
                dangerouslySetInnerHTML={{ __html: nodContent }}
              ></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

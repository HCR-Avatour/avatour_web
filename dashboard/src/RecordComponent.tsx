import * as React from 'react';
import { createContext, useState, useContext } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export default function RecordComponent() {
  const [counter, setCounter] = React.useState(0);

  const handleButtonClick = async (blob: Blob) => {
    try {
      const formData = new FormData();
  
      // Assuming your blob is named 'audioBlob', adjust accordingly
      formData.append('audioFile', blob, 'audio'+counter+'.webm');
      formData.append('fileCounter', counter.toString());
      
      const startResponse = await fetch('https://assistant.avatour.duckdns.org/load', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type if sending JSON data
        },
        body: JSON.stringify({load: "start"}), // Convert sharedBool to JSON and send it in the request body
      });

      if (!startResponse.ok) {
        throw new Error('Failed to send data to the server');
      }

      console.log('Sending audio to server ', 'audio'+counter+'.webm');
      const response = await fetch('https://speech.avatour.duckdns.org/synth', { // update IP here with container IP (if run in wsl, get wsl ip through "wsl hostname -I")
        method: 'POST',
        body: formData
        }
      );
      // const response = {
      //   ok: true,
      //   text: 'Success'
      // }
      // setTimeout(() => {
      //   // Run code
      // }, 5000);
      
      if (response.ok) {
        console.log('Server response:', response.text);

        const stopResponse = await fetch('https://assistant.avatour.duckdns.org/load', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({load: "end"}), 
        });

        if (!stopResponse.ok) {
          throw new Error('Failed to send data to the server');
        }
       
      } else {
        const stopResponse = await fetch('https://assistant.avatour.duckdns.org/load', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({load: "end"}),
        });

        if (!stopResponse.ok) {
          throw new Error('Failed to send data to the server');
        }

        console.error('handleButtonClick Failed to communicate with the server');
      }

      
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    // const audio = document.createElement('audio');
    // audio.src = url;
    // audio.controls = true;
    // console.log('Audio duration:', audio.duration);

    // Call the speech_pipeline API
    handleButtonClick(blob);
    setCounter(counter + 1);
  };

  // TODO: check how to get the audio duration for ffmpeg to not error when calling the python functions
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  // const react =  ( 
  return (
    <div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          sampleRate: 16000,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="webm" // for mp3 and wav, must set cross origin isolation
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer={true}
        recorderControls={recorderControls}
      />
    </div>
  );

  // return { react, loading_audio}
}

import * as React from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export const useLoadingShared = () => {
  const [loading_audio, setLoadingAudio] = React.useState(false);

  const setLoadingFalse = () => {
    console.log('Setting loading to false');
    setLoadingAudio(false);
  }

  const setLoadingTrue = () => {
    console.log('Setting loading to true');
    setLoadingAudio(true);
  }

  return { loading_audio, setLoadingFalse, setLoadingTrue};
};

export default function RecordComponent() {

  const [counter, setCounter] = React.useState(0);
  const { setLoadingFalse, setLoadingTrue } = useLoadingShared();
  const [loading_audio, setLoadingAudio] = React.useState(false);

  const handleButtonClick = async (blob: Blob) => {
    try {
      const formData = new FormData();
  
      // Assuming your blob is named 'audioBlob', adjust accordingly
      formData.append('audioFile', blob, 'audio'+counter+'.webm');
      formData.append('fileCounter', counter.toString());

      setLoadingTrue();
      setLoadingAudio(true);
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
        // setLoadingFalse();
        setLoadingAudio(false);
      } else {
        console.error('handleButtonClick Failed to communicate with the server');
        // setLoadingFalse();
        setLoadingAudio(false);
      }
      
    } catch (error) {
      console.error('Error:', error);
      setLoadingFalse();
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

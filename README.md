# Avatour Web App

## Description
This project is the web app that allows users to control Spot and view the 360 Livestream from the RICOH Theta. Other more advanced features include the AI Assistant (Ava) and maps interface.

## Features
- `dashboard` (all components can be found in their respective routes in the React app)
  - Joysticks and Switch
  - AI assistant
  - Maps interface
- `stream_feed`
  - Displays 360 livestream

## Person responsible
Kert Laansalu: Control panel, including joysticks and switch

Charmaine Louie: AI Assistant and assistant server

Chris Myers: Display of 360 stream and map interface

## Notes
To run locally, ensure all iframe links are changed to `localhost` in `stream_feed/index.html`

To run dashboard:
```
cd dashboard
npm install
npm start
```

To run the server for the AI Assistant:
```
cd dashboard/server
node server.js
```

To run web app:
```
cd stream_feed
npx http-server
```






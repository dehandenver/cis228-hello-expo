# CIS228 Hello Expo

## Project Description

`cis228-hello-expo` is a React Native app built with Expo for CIS 228. It started from the Expo template and was customized into an interactive greeting app with extra challenge features.

## Features

- Custom heading and styled interface
- Name input with character counter
- Greeting alert button
- Random greeting generator
- Theme toggle (`Midnight` / `Sunrise`)
- Greeting history with clear action
- Reset name button
- Counter with `Increment` and `Decrement` (never below `0`)
- Mini to-do list with add/remove actions

## Installation

1. Open the project folder:

   ```bash
   cd cis228-hello-expo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Run the App

Start the Expo development server:

```bash
npm start
```

Then choose a target from the Expo terminal:

- Press `w` to run on web.
- Press `a` to run on Android emulator/device.
- Scan the QR code with Expo Go to run on your phone.

## Main File

Core app UI and logic are in:

- `app/(tabs)/index.tsx`

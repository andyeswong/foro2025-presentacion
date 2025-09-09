# Remote Control Hub - Glassmorphic Presentation

## Overview
The Remote Control Hub allows you to remotely control your presentation slides in real-time using Pusher WebRTC technology.

## How to Use

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Access the Presentation
- **Main Presentation**: `http://localhost:3000`
- **Admin Control Panel**: `http://localhost:3000/admin`

### 3. Control Your Presentation
From the admin panel (`/admin`), you can:
- **Navigate slides**: Use Previous/Next buttons or dropdown selector
- **View keypoints**: See extracted key points and relevant text for each slide
- **Real-time sync**: Changes are instantly reflected on the main presentation

### 4. Features
- **Connection Status**: Green dot indicates successful Pusher connection
- **Slide Preview**: View keypoints and content for the current slide
- **Raw Content**: Expandable section to view the original markdown content
- **Responsive Design**: Works on desktop and mobile devices

## Technical Details

### Pusher Configuration
- **App ID**: 2010178
- **Key**: 88a05f4588ff1360bb15
- **Cluster**: us3
- **Channel**: presentation-channel
- **Event**: slide-change

### File Structure
- `app/admin/page.tsx` - Admin control panel
- `app/api/pusher/route.ts` - Pusher API endpoint
- `app/page.tsx` - Main presentation (with Pusher listener)
- `public/presentation-content.md` - Presentation content source

### Dependencies
- `pusher` - Server-side Pusher integration
- `pusher-js` - Client-side Pusher integration
- Next.js 14+ with App Router

## Usage Tips
1. Keep both the presentation and admin panel open in separate browser windows/tabs
2. The admin panel shows a connection status indicator (green = connected)
3. Slide changes are bidirectional - manual navigation on the main presentation won't sync back to admin (by design)
4. The system parses markdown content to extract keypoints automatically

## Troubleshooting
- If connection shows "disconnected", check your internet connection
- Ensure the development server is running on both ends
- Check browser console for any JavaScript errors
- Verify Pusher credentials are correct in the code 
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "2010178",
  key: "88a05f4588ff1360bb15",
  secret: "6c57c9225057f8f39819",
  cluster: "us3",
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { slide } = await request.json();
    
    // Trigger slide change event
    await pusher.trigger("presentation-channel", "slide-change", {
      slide: slide,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, slide });
  } catch (error) {
    console.error("Pusher error:", error);
    return NextResponse.json({ error: "Failed to send slide change" }, { status: 500 });
  }
} 
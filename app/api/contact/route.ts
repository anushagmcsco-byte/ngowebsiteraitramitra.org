import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Process contact form submission (simulation of database logging or email sending)
    console.log("Contact submission received:", { name, email, phone, subject, message });

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your message has been received. Our team will contact you soon.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

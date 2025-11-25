/**
 * Server-side endpoint for AI-powered product questions
 * Uses Google Gemini AI to generate responses
 */

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Extract prompt from request body
    const { prompt } = await req.json();

    // Ensure API Key is present
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key missing in server environment" },
        { status: 500 },
      );
    }

    // Initialize Google AI client
    const ai = new GoogleGenAI({ apiKey });

    // Generate AI response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}

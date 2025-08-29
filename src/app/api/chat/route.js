import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const lowerMsg = message?.toLowerCase() || "";

    let reply;

    // --- Smart Mock AI Brain ---
    if (!message) {
      reply = "Please type something so I can help! 😊";
    } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      reply = "Hey there! 👋 How’s your day going?";
    } else if (lowerMsg.includes("how are you")) {
      reply = "I’m just code, but I feel great! 😄 How about you?";
    } else if (lowerMsg.includes("your name")) {
      reply = "I’m your friendly shopping assistant bot 🤖";
    } else if (lowerMsg.includes("cart")) {
      reply =
        "🛒 I can help you with your cart! Try checking out when you're ready.";
    } else if (lowerMsg.includes("payment")) {
      reply =
        "💳 Our payment process is simple! Fill in your billing details and confirm.";
    } else if (lowerMsg.includes("joke")) {
      const jokes = [
        "Why don’t skeletons fight each other? They don’t have the guts. 😂",
        "Why did the computer go to the doctor? It caught a virus! 🖥️",
        "I asked my laptop for a snack, but it only gave me cookies. 🍪",
      ];
      reply = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (lowerMsg.includes("bye")) {
      reply = "Goodbye! 👋 Hope to chat with you again soon!";
    } else {
      // Default smart fallback
      const responses = [
        `Interesting! Tell me more about "${message}" 🤔`,
        `Ohh, I see! "${message}" sounds important.`,
        `Let me think about "${message}"... 🤓`,
        `Hmm, "${message}"... can you explain a bit more?`,
      ];
      reply = responses[Math.floor(Math.random() * responses.length)];
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ reply: "Something went wrong! ❌" });
  }
}

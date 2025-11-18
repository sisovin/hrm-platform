import { handlers } from "@/lib/auth";

// Provide fallback handlers if NextAuth fails to initialize
const GET = handlers?.GET || (async () => new Response("Auth not configured", { status: 503 }));
const POST = handlers?.POST || (async () => new Response("Auth not configured", { status: 503 }));

export { GET, POST };

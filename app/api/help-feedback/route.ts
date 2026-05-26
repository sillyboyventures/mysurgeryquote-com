import { NextResponse } from "next/server";

// Phase 4: log feedback to the function logs. Full persistence lands in Phase 5.
export async function POST(req: Request) {
  try {
    const { slug, helpful } = await req.json();
    console.log(
      `[help-feedback] ${JSON.stringify({
        slug,
        helpful: Boolean(helpful),
        at: new Date().toISOString(),
      })}`,
    );
  } catch {
    /* ignore malformed bodies */
  }
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text, src, target} = await request.json();

  let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${src}|${target}`;
  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json({ data });
}

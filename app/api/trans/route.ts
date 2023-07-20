import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text, src, target} = await request.json();

  let url = `https://groupe4.pythonanywhere.com/translate`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      inputText: text,
      src: src,
      target
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}

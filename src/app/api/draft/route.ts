import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret');
  const disable = searchParams.get('disable');
  const slug = searchParams.get('slug') ?? '/';

  // Turn on draft mode
  if (!disable) {
    if (!secret || secret !== process.env.DRAFT_MODE_KEY) {
      return new Response("Missing or invalid secret", { status: 401 });
    }
    draftMode().enable();
    redirect(slug);
  }

  // Turn off draft mode
  draftMode().disable();
  redirect(slug);
}
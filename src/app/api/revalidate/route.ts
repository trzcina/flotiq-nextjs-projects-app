import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const providedKey = request.headers.get('x-revalidate-key');
  const path = request.nextUrl.searchParams.get('path') ?? '/'

  if (providedKey !== process.env.REVALIDATE_KEY) {
    return Response.json({ message: 'Invalid revalidate key'}, { status: 401 })
  }

  revalidatePath(path, 'page');

  return Response.json({ path: path, now: Date.now() });
}
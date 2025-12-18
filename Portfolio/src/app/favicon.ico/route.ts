import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export function GET() {
  try {
    const imgPath = join(process.cwd(), 'public', 'avatar.png')
    const img = readFileSync(imgPath)
    return new NextResponse(img, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}

export const dynamic = 'force-static'

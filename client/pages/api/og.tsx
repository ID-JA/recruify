import {ImageResponse} from '@vercel/og'
import {NextRequest} from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default function handler(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('company')
    const title = hasTitle ? searchParams.get('company') : 'Google'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            backgroundColor: 'white',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontStyle: 'normal',
              color: 'black',
              marginTop: 30,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
            <b>{title} is hiring</b>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
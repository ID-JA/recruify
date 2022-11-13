import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge',
}

export default function (req: { url: string | URL }) {
  const searchPrams = new URL(req.url)
  const companyName = searchPrams.searchParams.get('companyName') ?? 'GOOGLE'
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          fontWeight: 700,
          background: 'white',
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            FastRecruiter
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '0 42px',
            fontSize: 40,
            width: 'auto',
            maxWidth: 550,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {companyName} is hiring!
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}

import { verifyLogin } from 'models/user.server'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'method not allowed' })

  const user = await verifyLogin(req.body.email, req.body.password)
  if (!user) {
    res.status(400).json({ message: 'Invalid email or password', ok: false })
    return
  }
  const token = jwt.sign(
    { sub: user.id, ...user },
    process.env.SECRET_TOKEN_KEY ? process.env.SECRET_TOKEN_KEY : 'demoKey',
    {
      expiresIn: '7d',
    }
  )

  return res.status(200).json({
    ...user,
    token,
    ok: true,
  })
}

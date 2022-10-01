import { createUser, getUserByEmail } from 'models/user.server'
import type { NextApiRequest, NextApiResponse } from 'next'
/**
 * [x] validate request method (should be POST)
 * [x] check if email already exist
 * [x] add user to database
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'method not allowed' })

  const existingUser = await getUserByEmail(req.body.email)
  if (existingUser) {
    res.status(422).json({ message: 'email already taken', ok: false })
    return
  }
  await createUser(req.body)
  return res.status(200).json({ message: 'Created user!', ok: true })
}

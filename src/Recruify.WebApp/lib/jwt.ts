import "server-only"

import { jwtVerify } from "jose"

import { APP_DOMAIN } from "./constants"

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: APP_DOMAIN,
      audience: APP_DOMAIN,
    })
    return payload
  } catch (error) {
    console.log(error)
    return null
  }
}

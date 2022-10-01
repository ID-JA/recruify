import type { Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '../db.server'

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } })
}

export async function deleteUserByEmail(email: User['email']) {
  return prisma.user.delete({ where: { email } })
}

export async function verifyLogin(
  email: User['email'],
  password: Password['hash']
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      password: true,
    },
  })
  if (!user || !user.password) {
    return null
  }
  const isValid = await bcrypt.compare(password, user.password.hash)

  if (!isValid) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = user

  return userWithoutPassword
}

export async function createUser({
  name,
  email,
  password,
  companyName,
  location: companyLocation,
  position,
  zipCode,
  phoneNumber,
}: {
  name: string
  email: string
  password: string
  companyName: string
  location: string
  position: string
  zipCode: string
  phoneNumber: string
}) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      email,
      name,
      Employer: {
        create: {
          companyLocation,
          phoneNumber,
          companyName,
          position,
          zipCode,
        },
      },
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })
}

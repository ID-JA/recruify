/* eslint-disable @typescript-eslint/no-unused-vars */
import type * as P from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { createUser } from './seed-utils'

const prisma = new PrismaClient()

async function seed() {
  const email = 'idaissa@gmail.com'

  await prisma.user.deleteMany({ where: {} })
  await prisma.job.deleteMany({ where: {} })
  await prisma.application.deleteMany({ where: {} })

  const hashedPassword = await bcrypt.hash('fastRecruiter', 10)

  const users = await Promise.all(
    Array.from({ length: 100 }, async () => {
      const userData = createUser()
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: {
            create: {
              hash: bcrypt.hashSync('superSecretKey@2022'.toUpperCase(), 10),
            },
          },
        },
      })
      return user
    })
  )

  const idaissaUser = createUser()

  await prisma.user.create({
    data: {
      email,
      name: 'idaissa',
      imageUrl: idaissaUser.imageUrl,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

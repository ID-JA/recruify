import { faker } from '@faker-js/faker'
import type * as P from '@prisma/client'

export function createUser(): Omit<P.User, 'id' | 'createdAt' | 'updatedAt'> {
  const gender = faker.helpers.arrayElement(['female', 'male']) as
    | 'female'
    | 'male'

  const firstName = faker.name.firstName(gender)
  const lastName = faker.name.lastName()
  const imageGender = gender === 'female' ? 'women' : 'men'
  const imageNumber = faker.datatype.number({ min: 0, max: 99 })

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName}-${lastName}@example.com`,
    imageUrl: `https://randomuser.me/api/portraits/${imageGender}/${imageNumber}.jpg`,
  }
}

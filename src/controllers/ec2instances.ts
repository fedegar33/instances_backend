import { Request, Response } from 'express'
import faker from '@faker-js/faker'

export function getAll(req: Request, res: Response) {
  const instances = generateRandomInstances(200)
  res.json(instances)
}

type EC2Instance = {
  name: string
  id: string
  type: string
  size: string
  state: string
  az: string
  publicIp: string
  privateIp: string
}

enum InstanceSizes {
  Micro = "micro",
  Small = "small",
  Medium = "medium",
  Large = "large",
  XLarge = "xlarge"
}

enum InstanceStates {
  Running = 'Running',
  Pending = 'Pending',
  Stopping = 'Stopping',
  Stopped = 'Stopped'
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function getSize(type: string): string {
  const size = type.split('.')[1]
  switch (size) {
    case InstanceSizes.Micro:
      return 'XS'
    case InstanceSizes.Small:
      return 'S'
    case InstanceSizes.Medium:
      return 'M'
    case InstanceSizes.Large:
      return 'L'
    case InstanceSizes.XLarge:
      return 'XL'
    default:
      return ''
  }
}

const sizes = Object.values(InstanceSizes)
const states = Object.values(InstanceStates)
const zones = ['us-west', 'us-east', 'europe', 'japan', 'latam']

function generateRandomInstances(length: number): EC2Instance[] {
  return Array.from({ length }, () => {
    const type = `${faker.random.alpha({ count: 1, upcase: false})}${faker.datatype.number({ max: 9 })}.${randomItem(sizes)}`
    return {
      id: `i${faker.random.alphaNumeric(16, { bannedChars: ['g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']})}`,
      name: type.replace('.', ' ').toUpperCase(),
      type,
      size: getSize(type), 
      state: randomItem(states),
      az: `${randomItem(zones)}-${faker.datatype.number(20)}`,
      publicIp: faker.internet.ipv4(),
      privateIp: faker.internet.ipv4()
    }
  })
}

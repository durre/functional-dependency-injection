import fs from 'fs'
import { Logger } from 'pino'
import { logger } from './logger'
import axios from 'axios'
import { CatFact } from './types'

type GetCatFact = () => Promise<string>
type SaveCatFact = (fact: string) => void

const getCatFact: GetCatFact = async () => {
  const {
    data: { fact },
  } = await axios.get<CatFact>('https://catfact.ninja/fact')

  if (!fact) {
    throw new Error('No cat fact found')
  }

  return fact
}

const saveCatFact: SaveCatFact = (fact: string) => {
  fs.appendFileSync('cat-facts.txt', fact + '\n')
}

type Dependencies = {
  getCatFact: GetCatFact
  saveCatFact: SaveCatFact
  logger: Logger
}

export const createGetAndSaveCatFact =
  ({ getCatFact, saveCatFact, logger }: Dependencies) =>
  async (maxFactLength: number) => {
    // Gets a random fact about cats
    const fact = await getCatFact()

    if (fact.length > maxFactLength) {
      throw new Error(`Cat fact was too long: ${fact.length}`)
    } else {
      saveCatFact(fact)
      logger.info({ msg: 'Cat fact saved!', fact })
      return fact
    }
  }

export const getAndSaveCatFact = createGetAndSaveCatFact({
  getCatFact,
  saveCatFact,
  logger: logger,
})

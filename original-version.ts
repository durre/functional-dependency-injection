import fs from 'fs'
import axios from 'axios'
import { logger } from './logger'
import { CatFact, GetAndSaveCatFact } from './types'

export const getAndSaveCatFact: GetAndSaveCatFact = async (
  maxFactLength: number
) => {
  try {
    // Step1: Get a random fact about cats
    const {
      data: { fact },
    } = await axios.get<CatFact>('https://catfact.ninja/fact')

    if (!fact) {
      throw new Error('No cat fact found')
    }

    // Step 2: Some kind of bussiness logic, like checking the length of the cat fact
    if (fact.length > maxFactLength) {
      logger.error('Cat fact was too long')
      throw new Error(`Cat fact was too long: ${fact.length}`)
    } else {
      // Step 3: Write fact to file, or send it to a database
      fs.appendFileSync('cat-facts.txt', fact + '\n')

      return fact
    }
  } catch (error) {
    logger.error(error)
    return null
  }
}

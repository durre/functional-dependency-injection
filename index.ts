import { logger } from './logger'
import { getAndSaveCatFact } from './refactored-version'

const maxLength = 120
;(async () => {
  const savedCatFact = await getAndSaveCatFact(maxLength)

  if (!savedCatFact) {
    logger.info('No cat fact was saved')
  } else {
    logger.info('Successfully saved a cat fact!', { savedCatFact })
  }
})()

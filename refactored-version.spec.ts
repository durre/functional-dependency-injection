import { expect, test, mock } from 'bun:test'
import type { Logger } from 'pino'
import { createGetAndSaveCatFact } from './refactored-version'

const logger = {
  error: mock(),
  info: mock(),
} as Logger

const getCatFact = mock(() => Promise.resolve('some fact'))
const saveCatFact = mock()

const getAndSave = createGetAndSaveCatFact({
  logger,
  getCatFact,
  saveCatFact,
})

test('get and save cat', async () => {
  const fact = await getAndSave(120)
  expect(fact).toBe('some fact')
  expect(saveCatFact).toHaveBeenCalled()
  expect(logger.info).toHaveBeenCalled()
  expect(logger.error).not.toHaveBeenCalled()
})

export type GetAndSaveCatFact = (maxLength: number) => Promise<string | null>

export type CatFact = {
  fact: string
}

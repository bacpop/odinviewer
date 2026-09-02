import type { ModelDetails } from '@/utils/types.ts'

export const getModelData = async (modelId: string): Promise<ModelDetails> => {
  const response = await fetch(`https://www.biomodels.org/${modelId}?format=json`)
  return await response.json()
}

export const searchModels = async (query: string): Promise<ModelSearchResult> => {
  const response = await fetch(`https://www.biomodels.org/search?query=${query}&format=json`)
  return await response.json()
}

export const getAvailableModels = async () => {
  const response = await fetch('/models/file_names.txt')
  const data = await response.text()
  const models: string[] = data.split('\n').slice(0, -1).map(file => file.split('\r').at(0))

  return models.map((model, index) => {
    return {
      value: model,
      label: 'Loading...'
    }
  })
}

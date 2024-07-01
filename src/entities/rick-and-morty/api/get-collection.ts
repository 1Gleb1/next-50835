import { RaMInstance } from './instance'

export const getAllCharacter = async () => {
  const response = await RaMInstance.get('/character')
  return response.data.results
}

export const getAllLocation = async () => {
  const response = await RaMInstance.get('/location')
  return response.data.results
}

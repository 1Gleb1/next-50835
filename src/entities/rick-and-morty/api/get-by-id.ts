import { RaMInstance } from './instance'

export const getCharacterById = async (id: string) => {
  const response = await RaMInstance.get('/character/' + id)
  return response.data
}

export const getLocationById = async (id: string) => {
  const response = await RaMInstance.get('/location/' + id)
  return response.data
}

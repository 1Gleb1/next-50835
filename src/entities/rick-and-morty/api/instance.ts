import axios from 'axios'

export const RaMInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
})

import { UserLogin } from '../types'

const baseURL = 'https://reqres.in'

export const LoginAPI = async (data: UserLogin) => {
  try {
    const response: Response = await fetch(`${baseURL}/api/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log(result)
    return result
  } catch (error) {
    console.error('Error during login', error)
  }
}

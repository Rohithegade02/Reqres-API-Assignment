import { User, UserData, UserLogin } from '../types'

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
    return result
  } catch (error) {
    console.error('Error during login', error)
  }
}

export const getAllUsersByPage = async (page: number) => {
  try {
    const response: Response = await fetch(
      `${baseURL}/api/users?page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: UserData = await response.json()
    return result
  } catch (error) {
    console.error('Error during login', error)
  }
}

export const updateUserById = async (userId: User['id'], formData: User) => {
  try {
    const response: Response = await fetch(`${baseURL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: UserData = await response.json()
    return result
  } catch (error) {
    console.error('Error during login', error)
  }
}

export const deleteUserById = async (userId: User['id']) => {
  try {
    const response: Response = await fetch(`${baseURL}/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('Error during login', error)
  }
}

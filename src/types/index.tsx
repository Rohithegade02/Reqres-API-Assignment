export declare interface UserLogin {
  email: string
  password: string
}

export interface UserData {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
  support: Support
}
export declare interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export interface Support {
  url: string
  text: string
}

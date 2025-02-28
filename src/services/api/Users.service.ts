import { User } from "../../interfaces/UserInterface"
import { AxiosService } from "../Axios.service"

export const UsersService = {
  async getAll() {
    try {
      const users = await AxiosService.get("/users")
      return users.data
    } catch (error) {
      throw new Error(`${error}`)
    }
  },
  
  async create(data: User) {
    const response = await AxiosService.post("/users", data)
    return response
  },
  
  async getByEmail(email: string) {
    const response = await AxiosService.get("/users")
    const data = response.data
    const userFound = data.filter((user: User) => user.email === email)
    return userFound
  },
  
  async deleteById(id: number) {
    const response = await AxiosService.delete(`/users/${id}`)
    return response
  },
  
  async updateById(id: number, data: User) {
    const response = await AxiosService.put(`/users/${id}`, data)
    return response
  }
}
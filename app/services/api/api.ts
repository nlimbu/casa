import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import AsyncStorage from '@react-native-community/async-storage'
import Config from 'react-native-config'
// import { Alert } from 'react-native'
// import _ from 'lodash'

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  async setup() {
    // construct the apisauce instance
    let tokenData = {}
    try {
      const token = await AsyncStorage.getItem('@bearer_token')
      // console.log(`apisauce setup: `, token)
      if (tokenData) tokenData = { Authorization: `Bearer ${token}` }
    } catch (e) {
      // saving error
    }
    this.apisauce = create({
      baseURL: Config.API_URL,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        ...tokenData
      },
    })
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async login(username: string, password: string,): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/users/login`, { username, password })
    // the typical ways to die when calling an api
    if (response.ok) {
      await AsyncStorage.setItem('@bearer_token', response.data.token)
    }
    return response
  }

  /**
   * Gets a single user by ID
   */

  async registerUser(username: string, password: string,): Promise<any> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(`/users/signup`, { username, password })
    // the typical ways to die when calling an api
    if (response.ok) {
      await AsyncStorage.setItem('@bearer_token', response.data.token)
    }
    return response
  }
}

type Tokens = {
  access_token: string
  refresh_token: string
}

export interface IJwtTokenService {
  getRefreshToken: () => string | null
  getAccessToken: () => string | null
  updateAccessToken: (at: string) => void
  updateRefreshToken: (rt: string) => void
  updateTokens: (tokens: Tokens) => void
  removeTokens: () => void
}

import { ILocalStorage, LocalStorageService } from '../local-storage-service'
import { IJwtTokenService } from './jwt-token.service.interface'

class JwtTokenService implements IJwtTokenService {
  constructor(private storage: ILocalStorage) {}

  getRefreshToken(): string | null {
    return this.storage.get('rt') as string | null
  }

  getAccessToken(): string | null {
    return this.storage.get('at') as string | null
  }

  updateAccessToken(at: string) {
    this.storage.set('at', at)
  }

  updateRefreshToken(rt: string) {
    this.storage.set('at', rt)
  }

  updateTokens(tokens) {
    this.storage.set('at', tokens.access_token)
    this.storage.set('rt', tokens.refresh_token)
    return
  }

  removeTokens() {
    this.storage.remove('at')
    this.storage.remove('rt')
  }
}

export const jwtTokenService = new JwtTokenService(new LocalStorageService())

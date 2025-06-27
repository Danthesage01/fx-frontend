

export enum UserRole {
 USER = 'USER',
 ORG_ADMIN = 'ORG_ADMIN',
 PLATFORM_ADMIN = 'PLATFORM_ADMIN'
}

export interface StoredUser {
 accessToken: string
 email: string
 isAuthenticated:
 boolean
 refreshToken: string
 user: object
 userId: string
 role: UserRole | null
 organizationId: string | null
}
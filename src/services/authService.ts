import apiClient from '../config/axios';
import { AUTH_ENDPOINTS, AUTH_CONFIG } from '../config/endpoints';
import { handleApiError } from '../utils/apiErrorHandler';
import {
  type LoginCredentials,
  type LoginResponse,
  type RegisterData,
  type RegisterResponse,
  type ForgotPasswordData,
  type ForgotPasswordResponse,
  type ResetPasswordData,
  type ResetPasswordResponse,
  type User
} from '../types/auth';

class AuthService {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Mock response for development
      if (process.env.NODE_ENV === 'development') {
        return this.mockLogin(credentials);
      }

      const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, {
        username: credentials.username,
        password: credentials.password,
        remember_me: credentials.rememberMe
      });

      if (response.data.success) {
        this.storeAuthData(response.data);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      // Mock response for development
      if (process.env.NODE_ENV === 'development') {
        return this.mockRegister(data);
      }

      const response = await apiClient.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, {
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName
      });

      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Forgot password request
   */
  async forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse> {
    try {
      // Mock response for development
      if (process.env.NODE_ENV === 'development') {
        return this.mockForgotPassword();
      }

      const response = await apiClient.post<ForgotPasswordResponse>(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
        email: data.email
      });

      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordData): Promise<ResetPasswordResponse> {
    try {
      // Mock response for development
      if (process.env.NODE_ENV === 'development') {
        return this.mockResetPassword();
      }

      const response = await apiClient.post<ResetPasswordResponse>(AUTH_ENDPOINTS.RESET_PASSWORD, {
        token: data.token,
        password: data.password
      });

      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      if (token) {
        // Call logout endpoint if available
        try {
          await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
        } catch (error) {
          console.warn('Logout endpoint call failed:', error);
        }
      }
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<LoginResponse> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.REFRESH, {
        refresh_token: refreshToken
      });

      if (response.data.success) {
        this.storeAuthData(response.data);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearAuthData();
      throw handleApiError(error);
    }
  }

  /**
   * Get current authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }

  /**
   * Get current refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
  }

  /**
   * Get current user data
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Store authentication data in localStorage
   */
  private storeAuthData(authData: LoginResponse): void {
    localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, authData.token);
    localStorage.setItem(AUTH_CONFIG.REFRESH_TOKEN_KEY, authData.refreshToken);
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(authData.user));
  }

  /**
   * Clear authentication data from localStorage
   */
  private clearAuthData(): void {
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
  }

  /**
   * Mock login for development
   */
  private async mockLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const mockResponse: LoginResponse = {
        success: true,
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@jne.gob.pe',
          firstName: 'Administrador',
          lastName: 'Sistema',
          role: 'admin',
          permissions: ['expedientes:read', 'expedientes:write', 'users:manage'],
          isActive: true,
          lastLogin: new Date().toISOString()
        },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: 3600
      };

      this.storeAuthData(mockResponse);
      return mockResponse;
    } else if (credentials.username === 'user' && credentials.password === 'user123') {
      const mockResponse: LoginResponse = {
        success: true,
        user: {
          id: '2',
          username: 'user',
          email: 'usuario@jne.gob.pe',
          firstName: 'Usuario',
          lastName: 'Estándar',
          role: 'user',
          permissions: ['expedientes:read'],
          isActive: true,
          lastLogin: new Date().toISOString()
        },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: 3600
      };

      this.storeAuthData(mockResponse);
      return mockResponse;
    } else {
      throw new Error('Credenciales inválidas. Use admin/admin123 o user/user123');
    }
  }

  /**
   * Mock register for development
   */
  private async mockRegister(data: RegisterData): Promise<RegisterResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (data.username === 'admin' || data.username === 'user') {
      throw new Error('El nombre de usuario ya existe');
    }

    return {
      success: true,
      message: 'Usuario registrado exitosamente. Revise su email para verificar la cuenta.',
      user: {
        id: 'mock-id-' + Date.now(),
        username: data.username,
        email: data.email,
        role: 'user',
        isActive: false
      }
    };
  }

  /**
   * Mock forgot password for development
   */
  private async mockForgotPassword(): Promise<ForgotPasswordResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: 'Se ha enviado un enlace de recuperación a su email.'
    };
  }

  /**
   * Mock reset password for development
   */
  private async mockResetPassword(): Promise<ResetPasswordResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: 'Contraseña actualizada exitosamente.'
    };
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
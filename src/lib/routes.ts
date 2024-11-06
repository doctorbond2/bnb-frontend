export default class ROUTES {
  // Public
  static PUBLIC = {
    PROPERTY_BY_ID:
      process.env.NEXT_PUBLIC_PROPERTY_BY_ID || '/api/property/:id',
    PROPERTIES: process.env.NEXT_PUBLIC_PROPERTIES || '/api/property',
    LOGIN: process.env.NEXT_PUBLIC_LOGIN || '/api/auth/login',
    REGISTER: process.env.NEXT_PUBLIC_REGISTER || '/api/auth/register',
    LOGOUT: process.env.NEXT_PUBLIC_LOGOUT || '/api/auth/logout',
    REFRESHTOKEN:
      process.env.NEXT_PUBLIC_REFRESHTOKEN || '/api/auth/refreshToken',
  };

  // Admin
  static ADMIN = {
    BOOKINGS: process.env.NEXT_PUBLIC_ADMIN_BOOKINGS || '/api/admin/bookings',
    PROPERTIES:
      process.env.NEXT_PUBLIC_ADMIN_PROPERTIES || '/api/admin/properties',
    USERS: process.env.NEXT_PUBLIC_ADMIN_USERS || '/api/admin/users',
    USERS_ID: process.env.NEXT_PUBLIC_ADMIN_USERS_ID || '/api/admin/users/:id',
    PROPERTIES_ID:
      process.env.NEXT_PUBLIC_ADMIN_PROPERTIES_ID ||
      '/api/admin/properties/:id',
    BOOKINGS_ID:
      process.env.NEXT_PUBLIC_ADMIN_BOOKINGS_ID || '/api/admin/bookings/:id',
  };

  // Secret
  static SECRET_ROUTE =
    process.env.NEXT_PUBLIC_SECRET_ROUTE || '/api/createAdmin';

  // User Protected
  static USER = {
    MAIN: process.env.NEXT_PUBLIC_USER_MAIN || '/api/protected/user',
    BOOKINGS:
      process.env.NEXT_PUBLIC_USER_BOOKINGS || '/api/protected/user/bookings',
    PROPERTIES:
      process.env.NEXT_PUBLIC_USER_PROPERTIES ||
      '/api/protected/user/properties',
    PROPERTIES_BY_ID:
      process.env.NEXT_PUBLIC_USER_PROPERTIES_BY_ID ||
      '/api/protected/user/properties/:id',
    BOOKINGS_BY_ID:
      process.env.NEXT_PUBLIC_USER_BOOKINGS_BY_ID ||
      '/api/protected/user/bookings/:id',
  };

  // General Protected
  static GENERAL_PROTECTED = {
    BOOKINGS:
      process.env.NEXT_PUBLIC_PROTECTED_BOOKINGS || '/api/protected/booking',
    PROPERTIES:
      process.env.NEXT_PUBLIC_PROTECTED_PROPERTIES || '/api/protected/property',
    PROPERTY_BY_ID:
      process.env.NEXT_PUBLIC_PROTECTED_PROPERTIES_BY_ID ||
      '/api/protected/property/:id',
    BOOKING_BY_ID:
      process.env.NEXT_PUBLIC_PROTECTED_BOOKINGS_BY_ID ||
      '/api/protected/booking/:id',
    BOOKING_DECIDE_ID:
      process.env.NEXT_PUBLIC_PROTECTED_BOOKING_DECIDE_ID ||
      '/api/protected/booking/:id/decide',
  };

  static logMissingEnv() {
    Object.entries(ROUTES).forEach(([key, value]) => {
      if (
        typeof value === 'string' &&
        value.includes('/api') &&
        !process.env[`NEXT_PUBLIC_${key}`]
      ) {
        console.warn(
          `Warning: Environment variable NEXT_PUBLIC_${key} is not defined`
        );
      }
    });
  }

  static getRoute(key: keyof typeof ROUTES) {
    return ROUTES[key];
  }
}

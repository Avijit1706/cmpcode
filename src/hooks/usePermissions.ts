import { useAuth } from '../contexts/AuthContext';

export function usePermissions() {
  const { user } = useAuth();

  const can = (permission: string) => user?.permissions.includes(permission) ?? false;

  return { can, permissions: user?.permissions ?? [] };
}

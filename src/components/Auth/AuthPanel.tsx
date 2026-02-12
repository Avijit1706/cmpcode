import { useAuth } from '../../contexts/AuthContext';

export function AuthPanel() {
  const { isAuthenticated, login, logout } = useAuth();

  return isAuthenticated ? (
    <button className="btn muted" onClick={logout}>Sign out</button>
  ) : (
    <button className="btn primary" onClick={login}>Sign in</button>
  );
}

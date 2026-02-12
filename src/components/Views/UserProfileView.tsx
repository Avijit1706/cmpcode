import { useAuth } from '../../contexts/AuthContext';

export function UserProfileView() {
  const { user } = useAuth();
  if (!user) return <section className="panel">Please sign in to view profile.</section>;

  return (
    <section className="panel profile">
      <h3>User Profile</h3>
      <div className="profile-grid">
        <div><span>Username</span><strong>{user.username}</strong></div>
        <div><span>Name</span><strong>{user.name}</strong></div>
        <div><span>Email</span><strong>{user.email}</strong></div>
        <div><span>Permissions</span><strong>{user.permissions.join(', ')}</strong></div>
      </div>
    </section>
  );
}

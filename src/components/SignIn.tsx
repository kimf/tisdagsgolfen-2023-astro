import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const { signIn } = useAuth();

  return (
    <div>
      <input
        type="email"
        placeholder=""
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoCapitalize="none"
        autoFocus
      />

      <button type="submit" onClick={() => signIn(email, 'password')}>
        Sign in
      </button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import supabase from '../utils/supabase';

const initialContext = {
  signIn: (email: string, password: string) => {},
  signOut: () => {},
  session: null as Session | null,
};

const AuthContext = React.createContext(initialContext);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider(props: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isDone, setIsDone] = useState(false);

  async function signInWithEmail(email: string, password: string) {
    await supabase.auth.signUp({ email, password });
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    const waitForSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsDone(true);
    };

    waitForSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isDone) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) => signInWithEmail(email, password),
        signOut: () => signOut(),
        session,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

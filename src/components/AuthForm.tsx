'use client';
import React, { useState } from 'react';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';

function AuthForm() {
  const [authState, setAuthState] = useState<boolean>(true);
  const handleStateChage = () => {
    setAuthState((prev) => !prev);
  };
  return (
    <>
      {authState ? (
        <SignupForm handleStateChage={handleStateChage} />
      ) : (
        <LoginForm handleStateChage={handleStateChage} />
      )}
    </>
  );
}

export default AuthForm;

import { Button } from '@mantine/core';
import { signIn } from 'next-auth/react';
import React from 'react';

const Signin = () => {
  const handleSignin = () => {
    signIn('google', { callbackUrl: '/admin/dashboard' });
  };

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <Button onClick={() => handleSignin()}>Đăng nhập bằng Google</Button>
    </div>
  );
};

export default Signin;

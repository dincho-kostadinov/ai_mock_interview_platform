import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  /**
  * check if user is authenticated with the help of isAuthenticated() from /lib/actions/auth.action
  */
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect('/');
  }

  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default AuthLayout
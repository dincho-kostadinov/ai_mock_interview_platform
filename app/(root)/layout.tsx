import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
  /**
  * check if user is authenticated with the help of isAuthenticated() from /lib/actions/auth.action
  */
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect('sign-in');
  }

  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className='flex items-center gap-2'>
          <Image src="/logo.svg" alt="Logo" width={35} height={32} />
          <h2 className='text-primary-100'>AI Interviewer</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout
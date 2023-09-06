'use client'
import { SignInButton } from '@clerk/nextjs'
import { useState } from 'react'
import Image from 'next/image'
const LoginPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [active, setActive] = useState<'login' | 'signup'>('login')
  return (
    <div className="font-SamsungSharpSans flex flex-col items-center gap-6 ">
      <div className="font-SamsungSharpSansBold rounded-[12px] p-1 dark:bg-[#121212] bg-[#EAEAEA]">
        <button
          onClick={() => setActive('login')}
          className={`w-[162px] sm:w-[195px] p-3 rounded-[9px] dark:text-white ${
            active === 'login' ? 'bg-white dark:bg-black' : ''
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActive('signup')}
          className={`w-[162px] sm:w-[195px] p-3 rounded-[9px] dark:text-white ${
            active === 'signup' ? 'bg-white dark:bg-black' : ''
          }`}
        >
          Signup
        </button>
      </div>
      <SignInButton mode="modal">
        <button
          className={`w-[325px] sm:w-[389px] font-SamsungSharpSansMedium  text-sm p-3 border-2 rounded-[12px] flex justify-center gap-2 border-black dark:border-white dark:text-white`}
        >
          <Image src="/goolge-icon.png" alt="google" width={20} height={20} />
          Continue with Google
        </button>
      </SignInButton>
      <div className="flex items-center">
        <div className="w-[155px] sm:w-[185px] border h-0 border-[#787878]" />{' '}
        <span className="mx-1 dark:text-white">or</span>
        <div className="w-[155px] sm:w-[185px] border h-0 border-[#787878]" />
      </div>
      <div className="font-semibold">
        <label htmlFor="emailAddress" className="text-[#787878] text-sm  ">
          Email Address
        </label>
        <br />
        <input
          type="text"
          name="emailAddress"
          placeholder="enter email address"
          className="w-[325px] sm:w-[389px] p-3 text-sm text-[#787878] rounded-[12px] border-2 border-[#787878] outline-none dark:bg-black"
        />
      </div>
      {active === 'signup' && (
        <div className="font-semibold">
          <label
            htmlFor="username"
            className="text-[#787878] text-sm font-semibold "
          >
            Create Username
          </label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="enter username"
            className="w-[325px] sm:w-[389px] p-3 text-sm text-[#787878] rounded-[12px] border-2 border-[#787878] outline-none dark:bg-black "
          />
        </div>
      )}
      <div className="font-semibold">
        <label
          htmlFor="password"
          className="text-black text-sm dark:text-white"
        >
          Password
        </label>
        <br />
        <div>
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            name="password"
            placeholder="enter password"
            className="w-[325px] sm:w-[389px] p-3 px-4 text-sm text-black rounded-[12px] border-2  outline-none  dark:bg-black dark:border-white dark:text-white"
          />

          {/* <Image
            height={30}
            width={30}
            alt="eye"
            src={`${
              showPassword
                ? `${theme === 'light' ? '/openEye1.png' : '/openEye.png'}`
                : `${theme === 'light' ? '/notEye1.png' : '/notEye.png'}`
            }`}
          /> */}
        </div>
      </div>
      {active === 'login' ? (
        <button className="w-[325px] sm:w-[389px] font-SamsungSharpSansBold  p-3 text-center rounded-[12px] font-bold dark:bg-white dark:text-black text-white bg-black">
          Login
        </button>
      ) : (
        <button className="font-SamsungSharpSansBold w-[325px] sm:w-[389px] p-3 text-center rounded-[12px] font-bold dark:bg-white dark:text-black text-white bg-black">
          Signup
        </button>
      )}
    </div>
  )
}
export default LoginPassword

'use client'
import Image from 'next/image'
import ThemeSwitcher from '@/components/theme-switcher'
import LoginPassword from '@/components/login-password'

const Login = () => {
  return (
    <section className="flex flex-col sm:flex-row relative  h-screen">
      <div className="min-w-[325px] max-md:hidden">
        <Image
          src="/big-bg.png"
          alt="mask-group"
          width={325}
          height={325}
          className="h-[100vh] w-full object-cover dark:grayscale"
        />
      </div>

      <div className="sm:hidden absolute top-0 left-0 w-full z-10">
        <Image
          src="/bg1.png"
          alt="mask-group"
          width={300}
          height={300}
          className=" w-full object-cover dark:grayscale"
        />
      </div>

      <div className="w-full relative ">
        <Image
          src="/X.png"
          alt="X"
          width={66}
          height={66}
          className="absolute right-4 top-4 z-10"
        />

        <div className="absolute right-6 top-24 z-10">
          <ThemeSwitcher />
        </div>
        <div className="flex sm:h-screen mb-10 justify-center items-center mt-[300px] sm:mt-0">
          <LoginPassword />
        </div>
      </div>
    </section>
  )
}
export default Login

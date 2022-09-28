import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function NavLink({ to, children, isBackgr, onClick }) {
  return (
    <a
      onClick={onClick}
      href={to}
      className={`mx-4 p-[5px] font-medium ${
        isBackgr ? 'rounded-md bg-blue-500 text-white' : ''
      }`}
    >
      {children}
    </a>
  )
}

function MobileNav({ open, setOpen }) {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen transform bg-white ${
        open ? '-translate-x-0' : '-translate-x-full'
      } drop-shadow-md filter transition-transform duration-300 ease-in-out `}
    >
      <div className="flex h-20 items-center justify-center bg-white drop-shadow-md filter">
        {' '}
        {/*logo container*/}
        <a className=" text-xl font-semibold" href="/">
          LOGO
        </a>
      </div>
      <div className="ml-4 flex flex-col">
        <a
          className="my-4 text-xl font-normal text-blue-500"
          href="/feed"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open)
            }, 100)
          }
        >
          Feed
        </a>
        <a
          className="my-4 text-xl font-normal text-blue-500"
          href="/"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open)
            }, 100)
          }
        >
          SignOut
        </a>
        <a
          className="my-4 text-xl font-normal text-blue-500"
          href="/register"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open)
            }, 100)
          }
        >
          Register
        </a>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const [token, setToken] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'))
    }
  })
  console.log(token)

  return (
    <nav className="sticky top-0 z-50 flex h-20 items-center bg-white px-4 py-4 drop-shadow-md filter">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="flex w-3/12 items-center">
        <a className="text-2xl font-semibold" href="/">
          LOGO
        </a>
      </div>
      <div className="flex w-9/12 items-center justify-end">
        <div
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-between md:hidden"
          onClick={() => {
            setOpen(!open)
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full transform rounded-lg bg-black transition duration-300 ease-in-out ${
              open ? 'translate-y-3.5 rotate-45' : ''
            }`}
          />
          <span
            className={`h-1 w-full rounded-lg bg-black transition-all duration-300 ease-in-out ${
              open ? 'w-0' : 'w-full'
            }`}
          />
          <span
            className={`h-1 w-full transform rounded-lg bg-black transition duration-300 ease-in-out ${
              open ? '-translate-y-3.5 -rotate-45' : ''
            }`}
          />
        </div>

        {token ? (
          <div className="hidden md:flex">
            <NavLink to="/feed">Feed</NavLink>
            <NavLink to="/historiques">Historique</NavLink>
            <NavLink
              isBackgr="true"
              onClick={() => {
                localStorage.removeItem('token')
              }}
              // onClick={() => {
              //   dispatch(removeToken())
              // }}
              to="/"
            >
              SignOut
            </NavLink>
          </div>
        ) : (
          <NavLink isBackgr={true} to="/register">
            SignUp
          </NavLink>
        )}
      </div>
    </nav>
  )
}

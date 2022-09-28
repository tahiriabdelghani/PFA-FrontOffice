import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Feed from './Feed'
import useHttp from '../store/requests.js'
import { digitalHost } from '../store/requests.js'
import axios from 'axios'
import { Router, useRouter } from 'next/router'

const initialState = {
  email: '',
  password: '',
}

export default function Login() {
  const [user, setUser] = useState(initialState)
  const router = useRouter()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = user
    if (!email || !password) {
      alert('email or password is null')
      return
    }
    const currentUser = { email, password }
    loginUser(currentUser)
  }

  //Login User
  const loginUser = async (currentUser) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/login',
        currentUser
      )
      const { token } = data

      router.push('/feed')
      localStorage.setItem('token', token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <section className="h-screen">
        <div className="h-full w-full  text-gray-800">
          <div className="g-6 -mt-24 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center">
            <div className="shrink-1 mb-12 hidden  grow-0 basis-auto md:mb-0  md:block md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full "
                alt="Sample image"
              />
            </div>
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
              <form onSubmit={onSubmit}>
                <h1 className="mt-20 mb-5 text-center  text-xl font-semibold">
                  Login
                </h1>

                <div className="mb-6">
                  <input
                    onChange={handleChange}
                    value={user.email}
                    type="email"
                    name="email"
                    className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>

                <div className="mb-6">
                  <input
                    value={user.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    placeholder="Password"
                  />
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-gray-800">
                    Forgot password?
                  </a>
                </div>

                <div className="align-center  justify-center  text-center ">
                  <button
                    type="submit"
                    className="w-32 rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  >
                    Login
                  </button>

                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
                    <p className="mx-4 mb-0 text-center font-semibold">Or</p>
                  </div>
                </div>
              </form>
              <div className="align-center  justify-center  text-center ">
                <button
                  type="button"
                  className="W-40 inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                >
                  <Link href="/register" title="login">
                    Créer un compte
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

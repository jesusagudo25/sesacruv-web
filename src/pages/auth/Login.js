import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FooterSmall from '../../components/auth/FooterSmall'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const login = async () => {
    axios.get('sanctum/csrf-cookie')
      .then(response => {
        axios.post('api/login', {
          email: email,
          password: password
        }).then(response => {
          if (response.data.status === 'success') {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
            navigate('/dashboard')
          }
          else {
            setMessage(response.data.message)
          }
        }).catch(error => {
          error.response.data.message ? setMessage(error.response.data.message) : setErrors(error.response.data.errors)
        })
      });
  }

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url(" + require("../../assets/img/register_bg_2.png") + ")",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in with credentials
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          min="1"
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <span>{errors.email}</span>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <span>{errors.password} {message}</span>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={login}
                        >
                          Sign In
                        </button>
                      </div>

                      <div className="flex flex-wrap mt-6">
                        <div className="w-1/2">
                          <a
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            className="text-gray-900"
                          >
                            <small>Forgot password?</small>
                          </a>
                        </div>
                        <div className="w-1/2 text-right">
                          <a
                            href="/register"
                            className="text-gray-900"
                          >
                            <small>Create new account</small>
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    </>

  )
}

export default Login
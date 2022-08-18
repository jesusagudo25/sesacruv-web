import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FooterSmall from '../../components/auth/FooterSmall'
const Register = () => {

  const [name, setName] = useState('')
  const [phone_number, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const register = async (e) => {
    axios.get('sanctum/csrf-cookie')
      .then(response => {
        axios.post('api/register', {
          name: name,
          phone_number: phone_number,
          email: email,
          password: password,
        }).then(response => {
          if (response.data.status === 'success') {
            console.log(response.data.message)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
            navigate('/dashboard')
          }
        }).catch(error => {
          setErrors(error.response.data.errors)
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
                        Sign up with
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                      <div className="relative w-full mb-3">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Name"
                            style={{ transition: "all .15s ease" }}
                            />
                            <span>{errors.name}</span>
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="gridphone_number-password"
                          >
                            Phone number
                          </label>
                          <input
                            type="number"
                            id="phone_number"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            autoComplete="telephone"
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Phone number"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span>{errors.phone_number}</span>
                        </div>
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
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                        <span>{errors.email}</span>
                      </div>


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
                      <span>{errors.password}</span>  
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={register}
                        >
                          Sign Up
                        </button>
                      </div>
                      <div className="flex flex-wrap mt-6">

                        <div className="w-full text-right">
                          <a
                            href="/login"
                            className="text-gray-900"
                          >
                            <small>Al ready account? Log in</small>
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

export default Register
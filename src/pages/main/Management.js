import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../../components/auth/Navbar";
import Sidebar from "../../components/auth/Sidebar";
function Management() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        {/* Header */}
        <div className="relative bg-pink-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap">
            </div>
          </div>
        </div>
        {/* Content */}
        <div className='px-4 md:px-10 mx-auto w-full -m-24'>
          <div className='w-full xl:w-full mb-12 xl:mb-0 px-4'>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-col justify-center items-center">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500 mb-4">
                            <i className="far fa-chart-bar"></i>
                      </div>
                      <Link to={'users'} className="font-semibold text-xl text-blueGray-700">
                            Usuarios
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                    <div className="flex flex-col justify-center items-center">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500 mb-4">
                      <i className="fas fa-chart-pie"></i>
                      </div>
                      <Link to={'students'} className="font-semibold text-xl text-blueGray-700">
                          Estudiantes
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                    <div className="flex flex-col justify-center items-center">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500 mb-4">
                            <i className="fas fa-users"></i>
                          </div>
                      <Link to={'standbys'} className="font-semibold text-xl text-blueGray-700">
                      Lista de espera
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                    <div className="flex flex-col justify-center items-center">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500 mb-4">
                            <i className="fas fa-percent"></i>
                          </div>
                      <Link to={'periods'} className="font-semibold text-xl text-blue">
                      Periodos
                          </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        </div>

        </div>
        </div>
      </>
  )
}

export default Management
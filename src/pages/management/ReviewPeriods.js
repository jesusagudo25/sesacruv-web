import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Navbar from "../../components/auth/Navbar";
import Sidebar from "../../components/auth/Sidebar";
function ReviewPeriods() {

  const [periods, setPeriods] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [start_date, setStartDate] = React.useState('');
  const [end_date, setEndDate] = React.useState('');
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const showData = async () => {
    const response = await axios.get('/api/reviewperiods');
    setPeriods(response.data);
  }

  React.useEffect(() => {
    showData();
  }
    , [])

  const columns = [
    {
      name: 'Start Date',
      selector: row => row.start_date
    },
    {
      name: 'End Date',
      selector: row => row.end_date
    },
    /*     {
          cell: row => <button onClick={() => handleEdit(row)}>Edit</button>
        } */
  ];

  // const handleEdit = (row) => {

  //   setShowModal(true);
  // }

  const createReviewPeriod = async (e) => {
    axios.post('api/reviewperiods', {
      start_date: start_date,
      end_date: end_date
    }).then(response => {
      showData();
      setShowModal(false);
    }).catch(error => {
      error.response.data.message ? setMessage(error.response.data.message) : setErrors(error.response.data.errors)
    })
  }

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        {/* Header */}
        <div className="relative bg-pink-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div className="flex flex-wrap px-4 md:px-5">
            <button
            className='bg-white text-black active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
            onClick={() => setShowModal(true)}
          >Open regular modal
          </button>
            </div>
          </div>
        </div>
        {/* Content */}
        
        <div className='px-4 md:px-10 mx-auto w-full -m-24'>
        <div className='w-full xl:w-full mb-12 xl:mb-0 px-4'>
            <div className='relative flex flex-col p-5 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
          <DataTable
            title='Datatable of Review Periods'
            columns={columns}
            data={periods}
            pagination={true}
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 50]}
            paginationComponentOptions={{
              rowsPerPageText: 'Rows per page:',
              rangeSeparatorText: 'of',
              noRowsPerPage: 'No rows per page',
              showTotal: true,
              totalRows: periods.length,
              pageText: 'Page',
              ofText: 'of'
            }}
          />
          </div>
          </div>
        </div>
      </div>

      {showModal ? (
            <>
              <div
                className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
              >
                <div className='relative w-1/2 my-6 mx-auto max-w-3xl'>
                  {/*content*/}
                  <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    {/*header*/}
                    <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                    <h3 className="text-xl font-semibold uppercase">
                        Create Review Period
                      </h3>
                      <button
                        className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                        onClick={() => setShowModal(false)}
                      >
                        <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className='relative p-6 flex-auto'>
                      <div className='relative mb-4'>

                        <label htmlFor='start_date' className='leading-7 text-sm text-gray-600'>Start date</label>
                        <input
                          type='date'
                          id='start_date'
                          name='start_date'
                          value={start_date}
                          onChange={(e) => setStartDate(e.target.value)}
                          className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>
                        </input>
                        <span>{errors.start_date}</span>
                      </div>
                      <div className='relative mb-4'>
                        <label htmlFor='end_date' className='leading-7 text-sm text-gray-600'>End date</label>
                        <input
                          type='date'
                          id='end_date'
                          name='end_date'
                          value={end_date}
                          onChange={(e) => setEndDate(e.target.value)}
                          className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>
                        </input>
                        <span>{errors.end_date}</span>
                      </div>
                      {message ? <div className='text-red-500 text-sm'>{message}</div> : null}
                    </div>
                    {/*footer*/}
                    <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                      <button
                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={() => createReviewPeriod()}
                      >
                        Crear periodo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
            </>
          ) : null}

    </div>
  )
}


export default ReviewPeriods
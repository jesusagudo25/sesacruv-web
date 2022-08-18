import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import { getCalendarEvents } from '../../components/schedule/getCalendarEvents'
import axios from 'axios'
import Navbar from "../../components/auth/Navbar";
import Sidebar from "../../components/auth/Sidebar";

const Schedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [dateRequest, setDateRequest] = useState('');
  const [dateReview, setDateReview] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [status, setStatus] = useState(null);

  const handleEventClick = async (clickInfo) => {
    setTitle(clickInfo.event.title);
    setId(clickInfo.event.id);
    const response = await axios.get(`/api/reviews/${clickInfo.event.id}`);
    setDateRequest(response.data.review.date_request);
    setDateReview(response.data.review.date_review);
    setStudentId(response.data.review.studentId);
    setStudentPhone(response.data.review.student.phone_number);
    setStatus(response.data.review.status);
    setShowModal(true);
  }

  const updateReview = async (status) => {
    await axios.put(`/api/reviews/${id}`, {
      status: status,
    });
    setShowModal(false);
  }

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
            <div className='relative flex flex-col p-5 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
            <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale={esLocale}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        weekends={false}
        events={getCalendarEvents()}
        eventClick={handleEventClick}
      />
          </div>
        </div>

        </div>
      </div>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold uppercase">
                    Información
                  </h3>
                  <button
                    className="p-2 rounded-xl ml-auto border-0  float-right text-lg leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="grid grid-cols-2 gap-5 justify-center content-center text-center">
                    <label className="text-m block">
                      Número de revisión                      
                    </label>
                    <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-300 rounded text-sm outline-none focus:outline-none focus:ring w-full pl-5 border-gray-300 shadow" disabled type="text" value={id} />
                    <label className="text-m block">
                      Nombre                    
                    </label>
                    <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-300 rounded text-sm outline-none focus:outline-none focus:ring w-full pl-5 border-gray-300 shadow" disabled type="text" value={title} />
                    <label className="text-m block">
                      Fecha de solicitud                    
                    </label>
                    <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-300 rounded text-sm outline-none focus:outline-none focus:ring w-full pl-5 border-gray-300 shadow" disabled type="text" value={dateRequest} />
                    <label className="text-m block">
                      Fecha de revisión                   
                    </label>
                    <input className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-300 rounded text-sm outline-none focus:outline-none focus:ring w-full pl-5 border-gray-300 shadow" disabled type="text" value={dateReview} />
                  </div>
        
                  <div className='mt-5'>
                  <p className='text-center mb-5'>Ingresa a la conversación con el estudiante</p>
                  
                  <a href={"http://api.whatsapp.com/send?phone=" + studentPhone} className='flex w-1/3 align-center justify-center text-white bg-pink-500 border-0 py-2 px-6 mx-auto focus:outline-none hover:bg-pink-600 rounded' target="_blank" rel="noopener noreferrer">
                    Enviar mensaje
                  </a>
                  </div>


                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      updateReview(!status);
                    }}
                  >
                    {status ? 'Activar' : 'Finiquitar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default Schedule


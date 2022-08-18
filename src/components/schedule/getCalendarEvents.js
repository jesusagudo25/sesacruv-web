import axios from 'axios';
import React from 'react'

export const getCalendarEvents = () => (info, successCallback, failureCallback) => {
    const id = localStorage.getItem('id');
    const response = axios.get(`api/schedule/${info.startStr.split('T')[0]}/${info.endStr.split('T')[0]}/${id}`);

    response.then(response => {
        successCallback(
            response?.data?.map(event => {
                return {
                    title: event.student.name,
                    start: event.date_review,
                    id: event.id,
                    color: event.status === 0 ? '#22c55e' : '#ef4444'
                }
            }) || []
        )
    }).catch(error => {
        failureCallback(error);
    }).finally(() => {
    })
};
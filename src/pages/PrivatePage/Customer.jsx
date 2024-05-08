import axios from 'axios';
import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { tokenDecode } from '../../utils/tokenHashAndDecode';
import PaginationTable from '../../components/PaginationTable';

export default function Customer() {
    const token = jwtDecode(tokenDecode())
    const DATA = [
        {
            changeDataName: [
                {
                    name: 'ünvan',
                    type: 'title',
                },
                {
                    name: 'adres',
                    type: 'address',
                },
                {
                    name: 'telefon',
                    type: 'phone',
                },
                {
                    name: 'E-posta',
                    type: 'email',
                },
            ],
            visualDataName: ['title', 'address', 'phone', 'email', 'adedd_by', 'created_at'],
            headDataName: ['ünvan', 'adres', 'telefon', 'e-posta', 'ekleyen', 'eklenme tarihi'],
            getUrl: 'getallcustomer',
            searchAndGetUrl: 'searchcustomer',
        }
    ]

    const axiosInstance = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${tokenDecode()}`,
        },
    });

    const removeData = async (id) => {
        try {
            await axiosInstance.post(`/deletecustomer/${id}`)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const addData = async (event) => {
        event.preventDefault()
        try {
            const body = {
                "title": event.target.elements.title.value,
                "address": event.target.elements.address.value,
                "phone": event.target.elements.phone.value,
                "email": event.target.elements.email.value,
                "adedd_by": token.role
            }
            await axiosInstance.post('/addcustomer', body)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const updateData = async (event, id) => {
        event.preventDefault()
        try {
            const body = {
                "title": event.target.elements.title.value ? event.target.elements.title.value : event.target.elements.title.placeholder,
                "address": event.target.elements.address.value ? event.target.elements.address.value : event.target.elements.address.placeholder,
                "phone": event.target.elements.phone.value ? event.target.elements.phone.value : event.target.elements.phone.placeholder,
                "email": event.target.elements.email.value ? event.target.elements.email.value : event.target.elements.email.placeholder,
            }
            await axiosInstance.post(`/updatecustomer/${id}`, body)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (

        <PaginationTable dataAction={DATA} addData={addData} updateData={updateData} deleteData={removeData} />
    )
}

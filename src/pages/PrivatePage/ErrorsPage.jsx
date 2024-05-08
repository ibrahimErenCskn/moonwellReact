import axios from 'axios';
import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { tokenDecode } from '../../utils/tokenHashAndDecode';
import PaginationTable from '../../components/PaginationTable';

export default function ErrorsPage() {
    const token = jwtDecode(tokenDecode())
    const DATA = [
        {
            changeDataName: [
                {
                    name: 'turu',
                    type: 'turu',
                },
                {
                    name: 'kodu',
                    type: 'kod',
                },
                {
                    name: 'acıklama',
                    type: 'aciklama',
                },
            ],
            visualDataName: ['turu', 'kod', 'aciklama', 'yayin_durum', 'ekleyen', 'created_at'],
            headDataName: ['turu', 'kodu', 'aciklaması', 'yayın durumu', 'ekleyen', 'eklenme tarihi'],
            getUrl: 'geterrorpagination',
            searchAndGetUrl: 'searcherrors',
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
            const body = {
                "id": id
            }
            await axiosInstance.post('/removeerror', body)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const addData = async (event) => {
        event.preventDefault()
        try {
            const body = {
                "turu": event.target.elements.turu.value,
                "kod": event.target.elements.kod.value,
                "aciklama": event.target.elements.aciklama.value,
                "yayin_durum": "1",
                "ekleyen": token.role
            }
            await axiosInstance.post('/adderror', body)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const updateData = async (event, id) => {
        event.preventDefault()
        try {
            const body = {
                "turu": event.target.elements.turu.value ? event.target.elements.turu.value : event.target.elements.turu.placeholder,
                "kod": event.target.elements.kod.value ? event.target.elements.kod.value : event.target.elements.kod.placeholder,
                "aciklama": event.target.elements.aciklama.value ? event.target.elements.aciklama.value : event.target.elements.aciklama.placeholder,
            }
            await axiosInstance.post(`/errorupdate/${id}`, body)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (

        <PaginationTable dataAction={DATA} getUrl={'geterrorpagination'} addData={addData} updateData={updateData} deleteData={removeData} />
    )
}


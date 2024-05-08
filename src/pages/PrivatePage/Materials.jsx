import axios from 'axios';
import React from 'react'
import { tokenDecode } from '../../utils/tokenHashAndDecode';
import PaginationTable from '../../components/PaginationTable';

export default function Materials() {

    const axiosInstance = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenDecode()}`,
            'Content-Type': 'multipart/form-data'
        },
    });

    const DATA = [
        {
            changeDataName: [
                {
                    name: 'İsmi',
                    type: 'name',
                },
                {
                    name: 'Acıklaması',
                    type: 'description',
                },
                {
                    name: 'stok sayısı',
                    type: 'stock_count',
                },
                {
                    name: 'stok tipi',
                    type: 'stock_type',
                },
                {
                    name: 'resmi',
                    type: 'image',
                },
            ],
            visualDataName: ['name', 'description', 'stock_count', 'stock_type', 'image', 'created_at'],
            headDataName: ['ismi', 'açıklaması', 'stok sayısı', 'stok tipi', 'resmi', 'eklenme tarihi'],
            getUrl: 'getmaterials',
            searchAndGetUrl: 'searchmaterial',
        }
    ]

    const removeData = async (id) => {
        try {
            await axiosInstance.post(`/deletematerial/${id}`)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const addData = async (event) => {
        event.preventDefault()
        try {
            const body = {
                "name": event.target.elements.name.value,
                "description": event.target.elements.description.value,
                "image": event.target.elements.image.files[0],
                "materialgroup_id": 1,
                "stock_count": event.target.elements.stock_count.value,
                "stock_type": event.target.elements.stock_type.value,
            }
            await axiosInstance.post('/addmaterial', body)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const updatePost = async (event, id) => {
        event.preventDefault()
        try {
            const body = {
                "name": event.target.elements.name.value ? event.target.elements.name.value : event.target.elements.name.placeholder,
                "description": event.target.elements.description.value ? event.target.elements.description.value : event.target.elements.description.placeholder,
                "image": event.target.elements.image.files[0] ? event.target.elements.image.files[0] : null,
                "materialgroup_id": 1,
                "stock_count": event.target.elements.stock_count.value ? event.target.elements.stock_count.value : event.target.elements.stock_count.placeholder,
                "stock_type": event.target.elements.stock_type.value ? event.target.elements.stock_type.value : event.target.elements.stock_type.placeholder,
            }
            await axiosInstance.post(`/updatematerial/${id}`, body)
            document.location.reload(true);
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (
        <PaginationTable dataAction={DATA} addData={addData} updateData={updatePost} deleteData={removeData} />
    )
}

import React from 'react'
import { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import axios from 'axios';
import ModalCustom from '../modal/ModalCustom';
import { useEffect } from 'react';
import { tokenDecode } from '../../utils/tokenHashAndDecode';
import ReactPaginate from 'react-paginate';
import { IoMdClose } from "react-icons/io";

export default function PaginationTable({ deleteData, updateData, addData, dataAction }) {
    const [paginateData, setPaginateData] = useState()
    const [page, setPage] = useState(1)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [perPage, setPerPage] = useState(10)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const axiosInstance = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenDecode()}`,
            'Content-Type': 'multipart/form-data'
        },
    });
    const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }

    const searchAndGetData = async () => {
        try {
            setLoading(true)
            const body = {
                "search": search,
                "per_page": perPage
            }
            const response = await axiosInstance.post(`/${dataAction[0].searchAndGetUrl}?page=${page}`, body)
            setPaginateData(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error.response.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (search.length > 0) {
            const timer = setTimeout(() => {
                searchAndGetData()
            }, 650);

            return () => clearTimeout(timer);
        }
        else {
            searchAndGetData()
        }
    }, [search])

    useEffect(() => {
        searchAndGetData()
    }, [page, perPage])
    return (
        <div className='flex flex-col gap-2'>
            {loading ? <div className='absolute z-10 left-0 right-0 top-[50%] h-20 flex justify-center items-center bg-slate-400 font-extrabold text-3xl'>Yükleniyor...</div> : null}
            <div className='flex justify-between'>
                <Button onClick={onOpen} className='w-24'>Veri Ekle</Button>
                <div className='relative'>
                    {
                        search && <button onClick={() => setSearch("")} className='absolute right-2 top-[10px]'><IoMdClose size={20} /></button>
                    }
                    <input className='w-72 h-10 border-2 px-2 border-[#2F323E] rounded-sm' type="text" placeholder='Ara' onChange={(e) => setSearch(e.target.value)} value={search} />
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Malzeme Ekle</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={(e) => addData(e)}>
                            <FormControl isRequired className='flex flex-col gap-10'>
                                {
                                    dataAction[0].changeDataName.map((v, i) => {
                                        return (
                                            <div key={i}>
                                                {
                                                    v?.type === 'image' ? (
                                                        <>
                                                            <FormLabel>{v.name}</FormLabel>
                                                            <Input name='image' accept="image/*" type='file' id='image' />
                                                        </>
                                                    ) :
                                                        (
                                                            <>
                                                                <FormLabel>{v?.name?.toUpperCase()}</FormLabel>
                                                                <Input name={v.type} type='text' id={v.type} />
                                                            </>
                                                        )
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <Button type='submit'>Kaydet</Button>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            {
                                dataAction[0].headDataName.map((v, i) => (
                                    <Th key={i} className='text-xl font-bold'>
                                        {v}
                                    </Th>
                                ))
                            }
                            <Th>
                                İşlemler
                            </Th>
                        </Tr>
                    </Thead>
                    {paginateData?.data?.map((v, i) => (
                        <Tbody key={i}>
                            <Tr>
                                {dataAction[0].visualDataName.map((name, index) => {
                                    return (
                                        <Td key={index}>
                                            {
                                                name === 'created_at' ? new Date(v?.[name]).toLocaleString() :
                                                    name === 'image' ? <a href={`${process.env.SERVER_URL}${v?.image.slice(15, v.image.length)}`} target='_blank'><img src={`${process.env.SERVER_URL}${v?.image.slice(15, v.image.length)}`} alt="" className='w-24 h-12' /></a> : v?.[name]
                                            }
                                        </Td>
                                    )
                                })}
                                <Td className='flex gap-1'>
                                    <ModalCustom title={'Düzenle'} modalName={'Düzenle'}>
                                        <form onSubmit={(e) => updateData(e, v.id, v.image)}>
                                            <FormControl className='flex flex-col gap-10'>
                                                {
                                                    dataAction[0].changeDataName.map((name, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {
                                                                    name?.type === 'image' ? (
                                                                        <>
                                                                            <FormLabel>{name?.name?.toUpperCase()}</FormLabel>
                                                                            <Input name='image' accept="image/*" type='file' id='image' />
                                                                        </>
                                                                    ) :
                                                                        (
                                                                            <>
                                                                                <FormLabel>{name?.name?.toUpperCase()}</FormLabel>
                                                                                <Input placeholder={v?.[name.type]} name={name.type} type='text' id={name.type} />
                                                                            </>
                                                                        )
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <Button type='submit'>Kaydet</Button>
                                            </FormControl>
                                        </form>
                                    </ModalCustom>
                                    <ModalCustom color={'red'} title={'Sil'} modalName={'Eminmisiniz'}>
                                        <div className='flex w-full justify-center items-center'>
                                            <Button onClick={() => deleteData(v.id)}>Evet</Button>
                                        </div>
                                    </ModalCustom>
                                </Td>
                            </Tr>
                        </Tbody>
                    ))}
                    <Tfoot>
                        <Tr>
                            <Th>
                                <select value={perPage} onChange={(e) => setPerPage(e.target.value)}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </Th>
                            <Th>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="Sonraki >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    pageCount={paginateData?.last_page ? Math.ceil(paginateData?.last_page) : 0}
                                    previousLabel="< Önceki"
                                    renderOnZeroPageCount={null}
                                    className='flex gap-2 items-center'
                                    activeClassName={'flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white'}
                                    pageClassName='w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center'
                                    activeLinkClassName='w-8 h-8 rounded-full flex items-center justify-center'
                                    pageLinkClassName='w-8 h-8 rounded-full flex items-center justify-center'
                                    disabledClassName='opacity-25'
                                />
                            </Th>
                            <Th>
                                Toplam Veri Sayısı: {paginateData?.total}
                            </Th>
                            <Th>
                                Toplam Sayfa Sayısı: {paginateData?.last_page}
                            </Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    )
}

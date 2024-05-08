import React from 'react'
import { Outlet } from 'react-router-dom'
import { ROUTE_DATA } from '../utils/leftSideRoute'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slice/authSlice'
import { jwtDecode } from 'jwt-decode'
import { tokenDecode } from '../utils/tokenHashAndDecode'
import { CiLogout } from "react-icons/ci";
import { useSizeObserver } from '../hooks/SizeObserver'
import { FaList } from 'react-icons/fa'
import { IoIosSearch } from "react-icons/io";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    Button,
    PopoverFooter
} from '@chakra-ui/react'
import { CiUser, CiSettings } from "react-icons/ci";


export default function Layout() {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const ref = React.useRef();
    const size = useSizeObserver(ref);
    const logoutUser = async () => {
        dispatch(logout({ data: {} }))
        document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        navigation('/login')
    }
    const decodeToken = jwtDecode(tokenDecode())
    return (
        <div className='flex relative'>
            <div ref={ref} className='h-screen bg-[#2f323e] w-16 py-5 transition-all duration-200 ease-in-out hover:w-64 fixed top-0 left-0 z-50'>
                {size?.width > 160 ?
                    (
                        <div className='flex flex-col items-center px-4'>
                            <div className='flex gap-2 items-center mb-10'>
                                <FaList size={24} color='white' />
                                <p className='text-white text-2xl'>Navigation</p>
                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                {
                                    ROUTE_DATA.map((v, i) => (
                                        v.role ? v.role.includes(jwtDecode(tokenDecode())?.role) &&
                                            <div key={i} className='flex gap-1 text-white'>
                                                {v.renderIcons}
                                                <button onClick={() => navigation(v.route)}>{v.name}</button>
                                            </div> :
                                            <div key={i} className='flex gap-1 text-white'>
                                                {v.renderIcons}
                                                <button onClick={() => navigation(v.route)}>{v.name}</button>
                                            </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) :
                    (
                        <div className='flex flex-col items-center justify-center'>
                            <FaList size={24} color='white' className='mb-10' />
                            <div className='flex flex-col items-center gap-4'>
                                {
                                    ROUTE_DATA.map((v, i) => (
                                        v.role ? v.role.includes(jwtDecode(tokenDecode())?.role) &&
                                            <div key={i}>
                                                {v.renderIcons}
                                            </div> :
                                            <div key={i}>
                                                {v.renderIcons}
                                            </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='flex flex-col h-screen w-full ml-16'>
                <div className='bg-[#2cabe3] h-16 min-h-16 flex justify-between items-center px-2 sticky top-0 z-20'>
                    <div>
                        <span className='text-white font-bold'>
                            Moonwell Admin Panel
                        </span>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex gap-1 items-center relative'>
                            <IoIosSearch className='absolute right-0' size={20} />
                            <input type="text" className='outline-none h-10 rounded-lg pl-2 pr-4' placeholder='Search' />
                        </div>
                        <Popover>
                            <PopoverTrigger >
                                <Button>
                                    <img src="https://www.moonwell.com.tr/wp-content/uploads/2018/09/Moonwell-logo-011.png.webp" alt="moonwell" className='w-12' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>
                                    <div className='flex gap-2 items-center'>
                                        <span>{decodeToken?.name}</span>
                                        <span><span className='text-black font-bold'>Yetkin: </span>{decodeToken?.role?.toUpperCase()}</span>
                                    </div>
                                </PopoverHeader>
                                <PopoverBody>
                                    <div className='flex flex-col gap-1'>
                                        <button className='flex items-center' onClick={() => navigation('/profile')}>
                                            <CiUser size={20} />
                                            Profile
                                        </button>
                                        <button className='flex items-center' onClick={() => navigation('/account-settings')}>
                                            <CiSettings size={20} />
                                            Account Settings
                                        </button>
                                    </div>
                                </PopoverBody>
                                <PopoverFooter>

                                    <div className='flex justify-end w-full'>
                                        <button onClick={logoutUser} className='flex gap-1 items-center'>
                                            <span className='text-black'>Logout</span>
                                            <CiLogout size={24} color='black' />
                                        </button>
                                    </div>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>

                    </div>
                </div>
                <div className='h-full p-6'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

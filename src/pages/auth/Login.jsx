import React from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginReq } from '../../redux/slice/authSlice';
import { jwtDecode } from 'jwt-decode';
import { tokenDecode } from '../../utils/tokenHashAndDecode';
import { useEffect } from 'react';
import { useState } from 'react';
import { Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Geçersiz Mail').required('Mail Alanı Zorunlu'),
    password: Yup.string().required('Şifre Alanı Zorunlu'),
});

export default function Login() {
    const [payload, setPayload] = useState(false)
    const { type } = useSelector((state) => state.auth)
    const [authantication, setAuthantication] = useState(jwtDecode(tokenDecode())?.isAuthantication)
    const dispatch = useDispatch()
    const loginFunc = async (values) => {
        try {
            const data = await dispatch(loginReq({
                data: {
                    email: values.email,
                    password: values.password
                }
            }))
            setPayload(data.payload)
        } catch (error) {
            console.log("deneme")
        }
    }

    useEffect(() => {
        setAuthantication(jwtDecode(tokenDecode())?.isAuthantication)
    }, [payload])

    const notify = () =>
        toast.error("Kullanıcı Adı Veya Şifre Hatalı", {
            position: "top-right",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            autoClose: 2000,
        });
    return (
        authantication ? <Navigate to='/' /> :
            (
                <div className='flex'>
                    <div className='w-[502px] h-screen border-r-[1px]'>
                        <div className='w-full h-full flex justify-center items-center'>
                            <img src="https://www.moonwell.com.tr/wp-content/uploads/2018/09/Moonwell-logo-011.png.webp" alt="moonwell" className='w-1/2 p-2' />
                        </div>
                    </div>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            loginFunc(values)
                            if (!type) {
                                notify()
                            }
                        }}

                    >
                        {props => (
                            <div className='flex flex-1 justify-center items-center h-screen'>
                                <form onSubmit={props.handleSubmit}>
                                    <div className='flex flex-col gap-6 w-96'>
                                        <div className='flex flex-col w-96'>
                                            <span className='text-xl font-bold'>
                                                SIGN IN TO ADMİN
                                            </span>
                                            <span className='text-sm'>
                                                Enter your details below
                                            </span>
                                        </div>
                                        <CustomInput handleChange={props.handleChange("email")} handleValue={props.values.email} handleType={"email"} placeholder={"Email"} />
                                        {props.errors.email && props.touched.email && <span className='text-red-500'>{props.errors.email}</span>}
                                        <CustomInput handleChange={props.handleChange("password")} handleValue={props.values.password} handleType={"password"} placeholder={"Password"} />
                                        {props.errors.password && props.touched.password && <span className='text-red-500'>{props.errors.password}</span>}
                                        <CustomButton text={'LOG IN'} />
                                        <span className='text-sm text-center'>Already have an account? <a className='text-[#2cabe3]' href="/register">Sıgn Up</a></span>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Formik>
                    <ToastContainer />
                </div>
            )
    )
}

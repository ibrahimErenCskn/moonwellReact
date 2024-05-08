import React from 'react'
import {
    Select
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerReq } from '../../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { tokenDecode } from '../../utils/tokenHashAndDecode'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalCustom from '../../components/modal/ModalCustom'

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Çok Kısa!')
        .max(50, 'Çok Uzun!')
        .required('İsim Alanı Zorunlu'),
    email: Yup.string().email('Geçersiz Mail').required('Mail Alanı Zorunlu'),
    checkbox: Yup.boolean().oneOf([true], 'Zorunlu'),
    role: Yup.string()
        .min(2, 'Çok Kısa!')
        .max(50, 'Çok UZun!')
        .required('Rol Alanı Zorunlu'),
    password: Yup.string().required('Şifre Alanı Zorunlu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Şifreler Eşleşmeli')
});
export default function Register() {
    const { redirect } = useSelector((state) => state.auth)
    const authantication = jwtDecode(tokenDecode())?.isAuthantication
    const dispatch = useDispatch()
    const navigation = useNavigate()
    useEffect(() => {
        if (redirect) navigation("/login")
    }, [redirect])
    return (
        authantication ? <Navigate to='/' /> : (
            <div className='flex'>
                <div className='w-[502px] h-screen border-r-[1px]'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <img src="https://www.moonwell.com.tr/wp-content/uploads/2018/09/Moonwell-logo-011.png.webp" alt="moonwell" className='w-1/2 p-2' />
                    </div>
                </div>
                <Formik initialValues={{ name: "", email: "", password: "", confirmPassword: "", checkbox: false, role: "" }} validationSchema={SignupSchema} onSubmit={(values) =>
                    dispatch(registerReq({
                        data: values
                    }))
                }>
                    {props => (
                        <div className='flex flex-1 justify-center items-center h-screen'>
                            <form onSubmit={props.handleSubmit}>
                                <div className='flex flex-col gap-6 w-96'>
                                    <div className='flex flex-col w-96'>
                                        <span className='text-xl font-bold'>
                                            SIGN UP TO ADMİN
                                        </span>
                                        <span className='text-sm'>
                                            Enter your details below
                                        </span>
                                    </div>
                                    <CustomInput handleChange={props.handleChange("name")} handleValue={props.values.name} placeholder={"Name"} />
                                    {props.errors.name && props.touched.name ? <p className='text-red-500'>{props.errors.name}</p> : null}
                                    <CustomInput handleChange={props.handleChange("email")} handleValue={props.values.email} handleType={"email"} placeholder={"Email"} />
                                    {props.errors.email && props.touched.email ? <p className='text-red-500'>{props.errors.email}</p> : null}
                                    <CustomInput handleChange={props.handleChange("password")} handleValue={props.values.password} handleType={"password"} placeholder={"Password"} />
                                    {props.errors.password && props.touched.password ? <p className='text-red-500'>{props.errors.password}</p> : null}
                                    <CustomInput handleChange={props.handleChange("confirmPassword")} handleValue={props.values.confirmPassword} handleType={"password"} placeholder={"Confirm Password"} />
                                    {props.errors.confirmPassword && props.touched.confirmPassword ? <p className='text-red-500'>{props.errors.confirmPassword}</p> : null}
                                    <div className='w-96'>
                                        <Select value={props.values.role} onChange={props.handleChange("role")} placeholder='Select option' name='select'>
                                            <option value='superadmin'>Super Admin</option>
                                            <option value='admin'>Admin</option>
                                            <option value='teknik'>Teknik Servis</option>
                                            <option value='bayi'>Bayi</option>
                                            <option value='musteri'>Müşteri</option>
                                            <option value='arge'>Ar-Ge</option>
                                        </Select>
                                        {props.errors.role && props.touched.role ? <p className='text-red-500'>{props.errors.role}</p> : null}
                                    </div>
                                    <div className='w-96 flex items-center gap-2'>
                                        <input onChange={props.handleChange("checkbox")} value={props.values.checkbox} type='checkbox' className='w-4 h-4' />
                                        <span className='text-[12px] font-bold'>
                                            I AGREE TO ALL
                                            <button className='ml-1 text-[#2cabe3]'>
                                                <ModalCustom title={'TERMS'} modalName={'Terms'} buttonStyle={'w-10'}>
                                                    TERMS
                                                </ModalCustom>
                                            </button>
                                        </span>
                                        {props.errors.checkbox && props.touched.checkbox ? <p className='text-red-500'>{props.errors.checkbox}</p> : null}
                                    </div>
                                    <CustomButton text={'SIGN UP'} />
                                    <span className='text-sm text-center'>Already have an account? <a className='text-[#2cabe3]' href="/login">Sıgn In</a></span>
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


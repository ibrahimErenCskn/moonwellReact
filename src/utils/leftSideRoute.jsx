import { FaHome, FaProductHunt } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { BiError } from "react-icons/bi";
import { SiMaterialdesignicons } from "react-icons/si";
import { IoPersonSharp } from "react-icons/io5";

export const ROUTE_DATA = [
    {
        name: 'Ana Sayfa',
        route: '/',
        renderIcons: <FaHome size={24} color='white' />,
    },
    {
        name: 'Hata Kodları',
        route: '/error-codes',
        renderIcons: <BiError size={24} color='white' />,
        role: [
            'admin',
            'superadmin'
        ]
    },
    {
        name: 'Malzemeler',
        route: '/materials',
        renderIcons: <SiMaterialdesignicons size={24} color='white' />,
        role: [
            'admin',
            'superadmin'
        ]
    },
    {
        name: 'Müşteriler',
        route: '/customers',
        renderIcons: <IoPersonSharp size={24} color='white' />,
        role: [
            'admin',
            'superadmin'
        ]
    },
    {
        name: 'Ürünler',
        route: '/products',
        renderIcons: <FaProductHunt size={24} color='white' />,
        role: [
            'admin',
            'superadmin'
        ]
    },
    {
        name: 'Mesajlar',
        route: '/message',
        renderIcons: <FaRegMessage size={24} color='white' />,
        role: [
            'admin',
            'user',
            'superadmin'
        ]
    }
]

export const PUBLIC_ROUTE = [
    '/profile',
    '/account-settings'
]
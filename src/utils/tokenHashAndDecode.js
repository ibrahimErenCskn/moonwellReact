import { jwtDecode } from "jwt-decode"
import CryptoJS from 'crypto-js';

const key = "s3cr3tm00nwe11";

const tokenSave = (token) => {
    const tokenDecode = jwtDecode(token)
    const expires = (new Date((tokenDecode?.exp * 1000)).toUTCString())
    document.cookie = "token" + "=" + tokenHash(token) + ";" + "expires=" + expires + ";path=/"
}

const tokenHash = (token) => {
    const encrypt =  CryptoJS.AES.encrypt(token, key).toString();
    return encrypt
}
const tokenDecode = () => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    if(token){
        const decrypt = CryptoJS.AES.decrypt(token, key).toString(CryptoJS.enc.Utf8);
        return decrypt
    }else{
        return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc0F1dGhhbnRpY2F0aW9uIjpmYWxzZX0.KkWGVu6fdPn-sdvmyiKGAViSmMeNz9gXMejo4MtQZrc"
    }
}

export { tokenHash, tokenDecode,tokenSave }
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { tokenDecode, tokenSave } from '../../utils/tokenHashAndDecode'

export const loginReq = createAsyncThunk(
  'users/loginReq',
  async ({data}) => {
    try {
      const response = await axios.post('https://tsp.sarimese.com/tsp/public/api/login', data)
      if(response.data?.status === 'success'){
        tokenSave(response.data.authorisation.token)
        return true
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
)
export const registerReq = createAsyncThunk(
  'users/registerReq',
  async ({data}) => {
    try {
      await axios.post('https://tsp.sarimese.com/tsp/public/api/register', data)
      return true
    } catch (error) {
      console.log(error)
    }
  },
)
export const logout = createAsyncThunk(
  'users/logout',
  async ({data}) => {
    try {
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${tokenDecode()}` 
      }
      const response = await axios.post('https://tsp.sarimese.com/tsp/public/api/logout',data,{headers:headers})
      if(response.data.status ==='success') {
        return false
      }
    } catch (error) {
      console.log(error.response.data)
    }
  },
)
export const getUser = createAsyncThunk(
  'users/getUser',
  async () => {
    try {
      const response = await axios.post('https://tsp.sarimese.com/tsp/public/api/user')
      if(response.data?.status === 'success'){
        console.log(response.data)
        return true
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
)
export const checkToken = createAsyncThunk(
  'users/checkToken',
  async () => {
    try {
      if(document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1])
        {
        return true
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
)

const initialState = {
  type: true,
  redirect : false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loginReq.fulfilled, (state, action) => {
      state.type = action.payload
    })
    builder.addCase(loginReq.rejected, (state, action) => {
      state.type = action.payload
    }),
    builder.addCase(registerReq.fulfilled, (state, action) => {
      state.redirect = action.payload
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.type = action.payload
    })
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.type = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.type = action.payload
    })
  },
})
export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer
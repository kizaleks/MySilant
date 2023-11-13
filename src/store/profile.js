import { createAsyncThunk, createSlice, createReducer } from '@reduxjs/toolkit'
import axiosInstance from "./axiosInstance";

export const loginFetch = async (data) => {
    const response = await axiosInstance.post('/account/token-auth/', data);
    return response
}

export const profileFetch = async () => {
    const response = await axiosInstance.get('account/info');
    return response
}


export const getCompanyInfo = createAsyncThunk(
    'getCompanyInfo',
    async () => {
        state.token = null;
            state.user_id = null;
            state.user_name = null;
            state.сategory = null;
            state.company_id = null;
            state.company_name = null;         
        return 
    }
)
export const signIn = createAsyncThunk(
    'signIn',
    async (data, thunk) => {
        const profResponse = await loginFetch(data)        
        localStorage.setItem('Token', profResponse.token)
        localStorage.setItem('is_authorized', true)
        localStorage.setItem('user_id', profResponse.user_id)
        localStorage.setItem('user_name', profResponse.user_name)
        localStorage.setItem('сategory', profResponse.сategory)
        localStorage.setItem('company_id', profResponse.company_id)
        localStorage.setItem('company_name', profResponse.company_name)
       
           
        return profResponse
    }
)
export const profile = createSlice({
    name: 'profile',
    initialState: { 
        //is_authorized: false,            
        status: 'pending'
    },
    reducers: { 
        signOut: (state) => { 
            localStorage.removeItem('is_authorized');            
            localStorage.removeItem('Token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('user_name');
            localStorage.removeItem('сategory');
            localStorage.removeItem('company_id');
            localStorage.removeItem('company_name'); 
            //is_authorized= false,
            state.status = 'pending'       
        
        },
        dropStatus: (state) => {
            state.status = 'done'
        },
       
    },
    extraReducers: (builder) => {
        builder
        .addCase(signIn.pending, (state)=>{            
            state.status = 'pending'            
        })
        .addCase(signIn.fulfilled, (state, action)=> { 
            //state.is_authorized=action.payload;
            state.status = 'done';
        }) 
        .addCase(getCompanyInfo.pending, (state)=>{
            state.status = 'done'
        })
        .addCase(getCompanyInfo.fulfilled, (state, action)=> {
            state.is_authorized=action.payload;
            state.status = 'done';
        })      
        
        .addCase(signIn.rejected, (state)=>{           
            state.status = 'error'
        })
    }
  })
  
  export const {signOut, dropStatus,chengetoken} = profile.actions
  export default profile.reducer

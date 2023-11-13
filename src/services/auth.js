import axiosInstance from ".";
/**
 * 
 * {login:string, password:string}
 * @returns ({accessToken:string, expire:string})
 */
export const loginFetch = async (data) => {
    const response = await axiosInstance.post('/account/token-auth/', data);
    return response
}


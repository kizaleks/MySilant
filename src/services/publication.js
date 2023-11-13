import axiosInstance from ".";

export const publicationFetch = async (data) => {
    const response = await axiosInstance.post('objectsearch', data);
    return response
}
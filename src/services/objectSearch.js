import axiosInstance from ".";

export const histogramsFetch = async (data) => {
    const response = await axiosInstance.post('objectsearch/histograms', data);
    return response
}
import axios from 'axios';
export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async(url) =>{
    const { data }= await axios.get((url), {
        headers: {
            'X-RapidAPI-Key': '8bb084027fmsh31b11e738243d38p1470a9jsn7bec293f9dbd',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
          }

    });
    return data ;
}
import axios from "axios";
import { IGetBookResponse } from '../store/slices/book.slice'

export const BookService = {
    async getBooks(toms: string, sortType: string, filterType: string, startIndex: number = 0) {
        const response = await axios.get<IGetBookResponse>(`https://www.googleapis.com/books/v1/volumes?q=${toms}${filterType !== 'all' ? `+subject:${filterType}` : ""}&orderBy=${sortType}&startIndex=${startIndex}&maxResults=30&key=${import.meta.env.VITE_API_KEY}`)        

        return response.data
    }
}



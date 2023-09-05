import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BookService } from "../../api/books.service"
import { FILTER_OPTIONS, SORT_OPTIONS } from "../../consts/selectOptions"

export interface IBook {
    id: string,
    etag: string,
    searchInfo: {
        textSnippet: string
    },
    volumeInfo: {
        title: string,
        authors: string[],
        imageLinks: {
            thumbnail: string,
            smallThumbnail: string,
        },
        publisher: string,
        publishedDate: string,
        categories: string[]
    },
}

interface IBookSlice {
    books: IBook[],
    total: string,
    isLoading: boolean,
    isEnd: boolean,
    toms: string,
    sortType: string,
    filterType: string,
    isError: boolean
}

export interface IGetBookResponse {
    totalItems: string,
    items: IBook[]
}

interface IGetBookRequest {
    toms: string,
    sortType: string,
    filterType: string,
    startIndex?: number
}

const initialState: IBookSlice = {
    books: [],
    total: "0",
    isLoading: false,
    isEnd: false,
    toms: '',
    sortType: SORT_OPTIONS[0].value,
    filterType: FILTER_OPTIONS[0].value,
    isError: false,
}

export const getBooks = createAsyncThunk<IGetBookResponse, IGetBookRequest>('books/getBooks', async (data) => await BookService.getBooks(data.toms, data.sortType, data.filterType))
export const getNextPage = createAsyncThunk<IGetBookResponse, IGetBookRequest>('book/getNextPage', async(data) => await BookService.getBooks(data.toms, data.sortType, data.filterType, data.startIndex))

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        changeToms(state, action: PayloadAction<string>) {
            state.toms = action.payload
        },
        changeSortType(state, action: PayloadAction<string>) {
            state.sortType = action.payload
        },
        changeFilterType(state, action: PayloadAction<string>) {
            state.filterType = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(getBooks.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBooks.fulfilled, (state, action) => {
            state.total = action.payload.totalItems
            state.books = action.payload.items
            state.isLoading = false
            state.isEnd = false
            state.isError = false
        })
        .addCase(getBooks.rejected, (state) => {
            state.isError = true
            state.isLoading = false
            
        })

        builder.addCase(getNextPage.fulfilled, (state, action) => {
            if(action.payload.items) {
                state.books = state.books.concat(action.payload.items)
                return
            }

            state.isEnd = true
        })
        .addCase(getNextPage.rejected, (state) => {
            state.isError = true
        })

    },
})


export const { changeToms, changeSortType, changeFilterType } = booksSlice.actions
export default booksSlice.reducer
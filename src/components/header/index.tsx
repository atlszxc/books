import { useState } from "react"
import { FILTER_OPTIONS, SORT_OPTIONS } from "../../consts/selectOptions"
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook"
import { changeFilterType, changeSortType, changeToms, getBooks } from "../../store/slices/book.slice"
import Input from "../UI/input"
import Select from "../UI/select"
import { Link } from "react-router-dom"

const Header = () => {
    const dispatch = useAppDispatch()
    const { toms, filterType, sortType } = useAppSelector(store => store.books)

    const [isEmptyToms, setIsEmptyToms] = useState<boolean>(false)

    const handleGetBooks = () => {
        if(!toms.length) {
            setIsEmptyToms(true)
            return
        }
        isEmptyToms && setIsEmptyToms(false)
        dispatch(getBooks({ toms, filterType, sortType }))
    }

    return (
        <header
            className="flex flex-col justify-between items-center bg-slate-400 py-4 w-[100vw]"
        >
            <Link to="/" className="text-5xl text-white font-semibold">Search for book</Link>
            <Input placeholder="Search books" isEmpty={isEmptyToms} changeFn={changeToms} handleFn={handleGetBooks} />
            <div 
                className="container mx-auto flex flex-col sm:flex-row justify-around items-center"
            >
                <Select options={FILTER_OPTIONS} title="Categories" change={changeFilterType} />
                <Select options={SORT_OPTIONS} title="Sorting by" change={changeSortType} />
            </div>
        </header>
    )
}

export default Header
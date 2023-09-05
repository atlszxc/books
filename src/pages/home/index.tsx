import Card from "../../components/card"
import Loader from "../../components/loader"
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook"
import { getNextPage } from "../../store/slices/book.slice"

const Home = () => {
    const dispatch = useAppDispatch()
    const { isLoading, books, total, isEnd, toms, filterType, sortType, isError } = useAppSelector(store => store.books)

    return (
        <>
        {
            !isLoading?
            <section className="pt-9">
                {
                    isError ?
                        <section className="flex justify-center items-center">
                            <h2 className="font-bold text-red-400 text-3xl">Whooops we have big big trouble!</h2>
                        </section> : null
                }
                { books.length ?
                <>
                    <header className="container mx-auto flex justify-center px-4 py-3">
                    <h2 className="text-slate-600 text-3xl font-semibold">Founded: {total} results</h2>
                    </header>
                    <main className="container mx-auto grid sm:grid-cols-1 sm:place-content-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 py-8">
                    {
                        books.map(book => <Card book={book} key={book.id+book.etag} />)
                    }
                    </main>
                </> : null
                }
                {
                    (!isEnd && books.length) ?
                    <section 
                        className="flex justify-center items-center py-4 hover:bg-gray-600 bg-gray-400 duration-150" 
                        onClick={() => dispatch(getNextPage({ toms, filterType, sortType, startIndex:books.length }))}
                    >
                        <h2 className="font-semibold text-white text-xl">Load more</h2>
                    </section> : null
                }
            </section>
            :
            <Loader />
        }
        </>
    )
}

export default Home
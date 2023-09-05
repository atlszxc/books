import { useParams } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux.hook"
import { useMemo } from "react"

const Detail = () => {
    const { id } = useParams()
    const { books } = useAppSelector(store => store.books)

    const book = useMemo(() => books.find(it => it.id === id), [])

    return (
        <section className="container mx-auto flex flex-col md:flex-row justify-between py-9">
            { 
                book?.volumeInfo.imageLinks &&  
                <img 
                    src={book?.volumeInfo.imageLinks.thumbnail} 
                    alt={book?.volumeInfo.title}
                    className="h-[50vh] w-full md:w-1/2" 
                />
            }
            <section
                className="w-full px-5 py-4"
            >
                { book?.volumeInfo.categories && <p>{book?.volumeInfo.categories.join('/')}</p> }
                { book?.volumeInfo.authors && <p>{book.volumeInfo.authors.join(', ')}</p> }
                { book?.volumeInfo.title && <h2 className="text-5xl my-4">{book?.volumeInfo.title}</h2> }
                { book?.searchInfo && <p dangerouslySetInnerHTML={{__html: `${book?.searchInfo.textSnippet}`}} /> }
            </section>
        </section>
    )
}

export default Detail
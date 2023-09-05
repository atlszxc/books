import { Link } from "react-router-dom"
import { IBook } from "../../store/slices/book.slice"

type CardProps = {
    book: IBook
}

const Card = ({ book }: CardProps) => {
    return (
        <Link to={`/book/${book.id}`}>
            <section className="flex justify-center">
                <div className="w-[300px] bg-gray-400 min-h-[360px] px-3 py-2 shadow-sm shadow-gray-600">
                    {
                        book.volumeInfo.imageLinks &&
                        <img
                            src={book.volumeInfo.imageLinks.thumbnail} 
                            alt="book"
                            className="h-1/2 mx-auto" 
                        /> 
                    }

                    <section>
                        <header className="flex justify-center items-center py-4 max-h-[20%] container mx-auto">
                            <h2 className="font-semibold text-2xl text-white truncate">{book.volumeInfo.title}</h2>
                        </header>
                        <section>
                            { book.volumeInfo.authors && <p>Authors: {book.volumeInfo.authors.toLocaleString()}</p> }
                            { book.volumeInfo.categories && <p>Categories: {book.volumeInfo.categories[0]}</p> }
                        </section>
                    </section>
                </div>
            </section>
        </Link>
    )
}

export default Card
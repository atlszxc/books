import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../hooks/redux.hook"
import { AiOutlineSearch } from 'react-icons/ai'


type InputProp = {
    placeholder: string,
    type?: string,
    changeFn: ActionCreatorWithPayload<string>,
    isEmpty: boolean,
    handleFn(): void
}

const Input = ({ placeholder, type="search", changeFn, isEmpty, handleFn }: InputProp) => {
    const dispatch = useAppDispatch()

    return (
        <div 
            className={`flex justify-center items-center w-fit container ${isEmpty ? 'border-red-600 focus-within:shadow-red-800' : 'border-gray-600 focus-within:shadow-gray-800'} focus-within:shadow border-solid border-2 mx-auto my-4 duration-200 px-4 py-2`}
            onKeyDown={e => e.code == "Enter" && handleFn()}
        >
            <input 
            type={type} 
            placeholder={placeholder}
            onChange={e => dispatch(changeFn(e.target.value))} 
            className="bg-transparent focus:outline-none" 
            />
            <AiOutlineSearch onClick={() => handleFn()} />
        </div>
    )
}

export default Input
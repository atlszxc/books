import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../../hooks/redux.hook"

interface ISelectOption {
    value: string,
    label: string,
}

type SelecteProp = {
    options: ISelectOption[],
    change: ActionCreatorWithPayload<string>,
    title: string
}

const Select = ({ options, change, title }: SelecteProp) => {
    const disptch = useAppDispatch()

    return (
        <section className="focus-within:shadow focus-within:shadow-gray-800 duration-200">
            <h3 className="text-white text-lg font-medium">{ title }</h3>
            <select 
                onChange={e => disptch(change(e.target.value))}
                className="px-4 py-3 bg-transparent focus:outline-none"
            >
                {
                    options.map((opt, id) => (
                        <option key={id} selected={id == 0? true : false} value={opt.value}>{opt.label}</option>
                    ))
                }
            </select>
        </section>
    )
}

export default Select
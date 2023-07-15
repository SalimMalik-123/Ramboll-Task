import { InputAdornment } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { ChangeEventHandler } from 'react'
import SearchIcon from '@mui/icons-material/Search';
// import { Size } from './SearchDropdown'
// import { Filter } from 'react-feather'

interface Props {
    label?: string
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    className?: string
    style?: React.CSSProperties
    type?: React.HTMLInputTypeAttribute
    disabled?: boolean
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    onClick?: React.MouseEventHandler<Element>
    refProp?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null
    onFilterClick?: React.MouseEventHandler<SVGSVGElement>
    showFilter?: boolean

   
}

const FormInput = ({ className, ...props }: Props) => {
    return <TextField
        {...props}
        variant='outlined'
        className={`${className} bg-white w-100 border-dark`}
        style={props.style}
        type={props.type}
        disabled={props.disabled}
        onFocus={props.onFocus}
        autoComplete='off'
        ref={props.refProp}
        size ={'medium'}
        // InputProps={{
        //     endAdornment: <SearchIcon />,
        //   }}
        // InputProps={{
        //     endAdornment: props.showFilter && <Filter
        //         className='cursor-pointer'
        //         onClick={props.onFilterClick}
        //     />
        // }}
    />
}

export default FormInput
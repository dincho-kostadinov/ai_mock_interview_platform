import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
/**
 * FormFieldPorps interface describe the props of the form field
 */
interface FormFieldPorps<T extends FieldValues> {
    control: Control<T>,
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file'
}

/**
 * FormField components
 * Depends of the props that receive generate an input field with control and label. 
 * Reusable component for form field.
 */
const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldPorps<T>) => (<Controller
    control={control}
    name={name}
    render={({ field }) => (
        <FormItem>
            <FormLabel className='label'>{label}</FormLabel>
            <FormControl>
                <Input className="input" type={type} placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
/>
)

export default FormField
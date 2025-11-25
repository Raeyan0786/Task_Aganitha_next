
import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  error?: string;
  value?:string;
  placeholder?: string;
  type?: string;
  disabled?: boolean; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const classes = {
  root: 'bg-white border border-gray-300 text-[#A3AED0] sm:text-sm rounded-lg focus:ring-[#FF2800] focus:border-primary-600 block w-full p-2.5 outline-0',
};

export const InputComponent = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      value,
      error,
      placeholder,
      type ,
      disabled = false,
      onChange,
      onBlur, 
      ...props
    },
    ref
  ) => {
    // const [showPassword, setShowPassword] = React.useState(false);
    // const rootClassName = cn(classes.root, inputClassName);
    const rootClassName = classes.root

    return (
      <div className='relative xl:w-[100%] '>
      <label htmlFor='name' className='text-sm font-semibold leading-4 text-[#2B3674]'>
      {label}
      </label>
        <input
          id={name}
          name={name}
          type={ type}
          value={value}
          ref={ref}
          placeholder={placeholder}
          className={rootClassName}
          autoComplete='off'
          spellCheck='false'
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : 'false'}
          disabled={disabled} 
          {...props}
          
        />
        
        {error && (
          <p className='text-13px text-brand-danger my-2 text-opacity-70'>
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputComponent.displayName = 'InputComponent';

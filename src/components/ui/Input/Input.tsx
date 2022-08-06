import cn from 'clsx';
import s from './Input.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useField } from 'formik';

import React from 'react';
export interface InputProps {
  label?: string;
  name: string;
  type?: string;
  id?: string;
  phone?: boolean;
  className?: string;
  handleChanges?: any;
  placeholder: string;
  variant?: 'filled' | 'default' | 'disabled' | 'inputerror';
  formikFunc?: any;
  ref?: any;
  value?: any;
  onChange?: any;
}

// const Input: React.FC<InputProps> = ({ label, children, ...props }) => {
const Input = React.forwardRef(
  (
    {
      label,
      phone,
      name,
      onChange,
      id,
      formikFunc,
      value,
      type = 'text',
      ...props
    }: InputProps,
    ref
  ) => {
    const [field, meta] = useField({ name, value, onChange, id });
    //   const { className, name, id } = props;

    const rootClassName = cn(
      s.root,
      {
        [s.filled]: props.variant === 'filled',
        [s.default]: props.variant === 'default',
        [s.disabled]: props.variant === 'disabled',
        [s.inputerror]: props.variant === 'inputerror',
      },
      props.className
    );

    if (phone) {
      return (
        <div className="w-full ">
          <label className={s.inputlabel} htmlFor={id || name}>
            {label}
          </label>

          <div className="relative w-full text-sm placeholder:text-sm">
            <PhoneInput
              onChange={props.handleChanges}
              enableSearch
              value={value}
              {...props}
              placeholder="Enter number"
            />
          </div>
          {meta.touched && meta.error ? (
            <div className="text-[#F1592D] text-xs">{meta.error}</div>
          ) : null}
        </div>
      );
    }
    return (
      <div className="flex flex-col">
        <label className={s.inputlabel} htmlFor={id || name}>
          {label}
        </label>
        <div className="relative">
          <input
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            type={type}
            className={rootClassName}
            {...field}
            onChange={(e) => formikFunc(name, e.target.value)}
            value={value}
            {...props}
          />
        </div>

        {meta.touched && meta.error ? (
          <div className="text-[#F1592D] text-xs">{meta.error}</div>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;

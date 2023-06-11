import { useEffect, useState } from 'react';

type Props = {
  onChange: any;
  isChecked: boolean;
};

const CheckboxOne = (props:Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);
  useEffect(() => {
    // {console.log('isChecked', isChecked)}
  });
  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
              {props.onChange}
            }}
            checked={isChecked}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
            ></span>
          </div>
        </div>
        {
          isChecked?(
            <>
              <span className="text-sm font-medium text-black dark:text-white">
                Active
              </span>
            </>
          ):(
            <span className="text-sm font-medium text-black dark:text-white">
              Not active
            </span>
          )
        }
      </label>
    </div>
  );
};

export default CheckboxOne;

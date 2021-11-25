import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import classNames from 'classnames';
import CheckBoxGroup from './Group';
import './index.scss';

interface CheckBoxProps {
  name?: string;
  label: string | React.ReactNode;
  value: string | number | undefined;
  indeterminate: boolean;
  children?: string | React.ReactNode;
  checked?: boolean;
  checkBoxShape?: 'default' | 'circle';
  checkBoxType?: 'default' | 'warning' | 'danger' | 'success' | 'health';
  disabled: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, bol: boolean) => void;
}

const CheckBox = ({
  name,
  children,
  label,
  value,
  indeterminate,
  checked,
  disabled = false,
  onChange,
  checkBoxShape = 'default',
  checkBoxType = 'default',
}: CheckBoxProps) => {
  const ref = useRef<any>();
  const [check, setCheck] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [indete, setIndete] = useState<boolean | undefined>();

  useEffect(() => {
    if (checked !== void 0) {
      setCheck(!!checked);
      ref.current.checked = !!checked;
    }
  }, [checked]);

  useEffect(() => {
    setIndete(indeterminate);
  }, [indeterminate]);

  useEffect(() => {
    if (disabled !== void 0) setDisable(!!disabled);
  }, [disabled]);

  const handleClick = () => {
    if (disabled) return;
    if (indeterminate !== void 0) setIndete(void 0);
    return ref.current.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
    return onChange && onChange(e, e.target.checked);
  };

  return (
    <div className="lib-checkbox-content" onClick={handleClick}>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          name={name}
          ref={ref}
          value={value}
          checked={check}
          disabled={disable}
          onChange={handleChange}
        />
        <span
          className={classNames({
            checkbox_inner: true,
            checkbox_checked: Boolean(check),
            checkbox_disabled: Boolean(disable),
            checkbox_inner_indeterminate: indete === false,
            [`checkbox_inner_shape_${checkBoxShape}`]:
              checkBoxShape !== 'default',
            [`checkbox_inner_type_${checkBoxType}`]: checkBoxType !== 'default',
          })}
        />
      </div>
      {children ? (
        <div
          className={classNames({
            checkbox_text: true,
            checkbox_text_disabled: disable,
          })}
        >
          {children}
        </div>
      ) : label ? (
        <div
          className={classNames({
            checkbox_text: true,
            checkbox_text_disabled: disable,
          })}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};

CheckBox.Group = CheckBoxGroup;
export default CheckBox;

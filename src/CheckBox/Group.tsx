import React, { ChangeEvent, useState, useEffect } from 'react';
import Checkbox from './CheckBox';

interface Options {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckBoxGroupProps {
  name?: string;
  options?: string[] | Options[];
  children?: React.ReactNode;
  value?: Array<string | number | undefined | null> | undefined | null;
  disabled?: boolean;
  onChange: Function;
  checkBoxShape?: 'default' | 'circle';
  checkBoxType?: 'default' | 'warning' | 'danger' | 'success';
}
const CheckBoxGroup = ({
  name,
  options = [],
  children,
  value,
  disabled,
  onChange,
  checkBoxShape,
  checkBoxType,
}: CheckBoxGroupProps) => {
  const [lists, setLists] = useState<Array<string | number | undefined | null>>(
    [],
  );
  useEffect(() => {
    setLists(value ? value : []);
  }, [value]);

  const createNode = (
    children: any,
    type?: any,
    props?: any,
  ): React.ReactNode => {
    const prop: any = {};
    if (name) prop.name = name;
    if (disabled !== void 0) prop.disabled = disabled;
    if (checkBoxShape) prop.checkBoxShape = checkBoxShape;
    if (checkBoxType) prop.checkBoxType = checkBoxType;
    if (onChange) prop.onChange = handleChange;
    if (children) {
      return React.Children.map(children, (child) => {
        if (child && child.type && child.type.Group) {
          const value = child && child.props && child.props.value;
          return React.cloneElement(child, {
            ...prop,
            checked: lists && lists.indexOf(value) > -1,
          });
        }
        if (child && child.props && child.props.children)
          return React.createElement(
            child.type,
            child.props,
            createNode(child.props.children, child.type, child.props),
          );
        return React.createElement(type, props, child);
      });
    }
    return (
      options &&
      options.map((opt) => {
        const key = typeof opt === 'string' ? opt : opt.value;
        const value = typeof opt === 'string' ? opt : opt.value;
        const label = typeof opt === 'string' ? opt : opt.label;
        return (
          <Checkbox
            {...prop}
            key={key}
            value={value}
            label={label}
            disabled={
              typeof opt === 'object' && opt.disabled !== void 0
                ? opt.disabled
                : false
            }
            checked={lists && lists.indexOf(value) > -1}
          />
        );
      })
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, bol: boolean) => {
    const defaultLists = JSON.parse(JSON.stringify(lists));
    if (bol) {
      defaultLists.push(e.target.value);
    } else {
      const index = defaultLists.indexOf(e.target.value);
      defaultLists.splice(index, 1);
    }
    setLists(defaultLists);
    onChange &&
      onChange(defaultLists && defaultLists.length > 0 ? defaultLists : null);
  };
  return <React.Fragment>{createNode(children)}</React.Fragment>;
};

export default CheckBoxGroup;

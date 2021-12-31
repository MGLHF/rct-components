---
title: CheckBox
group:
  title: 基础组件
  path: /base
nav:
  title: 组件
  path: /components
---

# CheckBox

基于原生 checkbox 封装的 CheckBox 多选组件，涵盖 antd 大多数 api 并进行扩展

## 交互规范

无

## Usage

### 基本用法

```tsx
import React from 'react';
import { CheckBox } from 'rct-components';

export default () => {
  return (
    <>
      <CheckBox label="选项A" value="A"></CheckBox>
      <CheckBox label="选项B" value="B"></CheckBox>
      <CheckBox label="选项C" value="C"></CheckBox>
      <CheckBox label="选项D" value="D"></CheckBox>
      <CheckBox label="选项E" value="E"></CheckBox>
      <CheckBox label="选项F" value="F"></CheckBox>
    </>
  )
};
```
### 失效状态
```tsx
import React from 'react';
import { CheckBox } from 'rct-components';

export default () => {
  return (
    <>
      <CheckBox label="选项A" value="A" disabled></CheckBox>
      <CheckBox label="选项B" value="B" checked disabled></CheckBox>
    </>
  )
};
```

### 设置使用全选，部分选择状态
```tsx
import React, { useState, useEffect } from 'react';
import { CheckBox } from 'rct-components';

export default () => {
  const [indeterminate, setIndeterminate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedData, setCheckedData] = useState(['A']);
  const checkList = [
    { value: 'A', label: '选项A' },
    { value: 'B', label: '选项B' },
    { value: 'C', label: '选项C' },
  ]
  useEffect(() => {
    if (checkedData && checkedData.length > 0 && checkedData.length < checkList.length) {
      setChecked(false);
      setIndeterminate(false);
    }
    if (checkedData && checkedData.length === checkList.length) {
      setIndeterminate(true);
      setChecked(true);
    }
    if (!checkedData) {
      setChecked(false);
      setIndeterminate(undefined);
    }
  }, [checkedData])

  const handleChange = () => {
    setChecked(!checked);
    setCheckedData(checked ? [] : checkList.map(i => i.value));
    setIndeterminate(true);
  }
  return (
    <>
      <div>
        <CheckBox label="全选" value="all" checked={checked} indeterminate={indeterminate} onChange={() => handleChange()}></CheckBox>
      </div>
      <CheckBox.Group value={checkedData} onChange={(data) => setCheckedData(data)}>
      {checkList.map((el, index) => (
        <CheckBox key={index} value={el.value} label={el.label}/>
      ))}
      </CheckBox.Group>
    </>
  )
};
```

### 设置形状类型

```tsx
import React, { useState } from 'react';
import { CheckBox } from 'rct-components';

export default () => {
  const [indeterminate, setIndeterminate] = useState(false);
  const [value, setValue] = useState(['B', 'C', 'D', 'E', 'F']);
  const options = [
    { label: '选项A', value: 'B', checkBoxType: 'default' },
    { label: '选项B', value: 'C', checkBoxType: 'warning' },
    { label: '选项C', value: 'D', checkBoxType: 'danger' },
    { label: '选项D', value: 'E', checkBoxType: 'success' },
    { label: '选项E', value: 'F', checkBoxType: 'health' },
  ]
  return (
    <>
      <div>
      {options.map((item) => (
        <CheckBox
          label={item.label}
          value={item.value}
          checkBoxShape='circle'
          checkBoxType={item.checkBoxType}
          indeterminate={indeterminate}
          onChange={(e, checked) => {
            setIndeterminate(true);
            console.log(checked);
         }} />
      ))}
      </div>
      <div>
      {options.map((item) => (
        <CheckBox
          label={item.label}
          value={item.value}
          checkBoxShape='default'
          checkBoxType={item.checkBoxType}
          indeterminate={indeterminate}
          onChange={(e, checked) => {
            setIndeterminate(true);
            console.log(checked);
         }} />
      ))}
      </div>
      <div>
        <CheckBox label="选项A" value="B" checkBoxShape="circle" checkBoxType="default" checked></CheckBox>
        <CheckBox label="选项B" value="C" checkBoxShape="circle" checkBoxType="warning" checked></CheckBox>
        <CheckBox label="选项C" value="D" checkBoxShape="circle" checkBoxType="danger" checked></CheckBox>
        <CheckBox label="选项D" value="E" checkBoxShape="circle" checkBoxType="success" checked></CheckBox>
        <CheckBox label="选项E" value="F" checkBoxShape="circle" checkBoxType="health" checked></CheckBox>
      </div>
      <div>
      <CheckBox.Group value={value} options={options} onChange={(value) => setValue(value)}/> 
      </div>
    </>
  )
};
```

### onChange
```tsx
import React, { useState } from 'react';
import { CheckBox } from 'rct-components';

export default () => {
  const [value, setValue] = useState(['A']);

  const onChange = (value) => {
    if (value && value.length > 3) setValue(null);
    else setValue(value);
    console.log(value)
  }
  return (
    <CheckBox.Group value={value} onChange={onChange}>
      <CheckBox label="选项A" value="A"></CheckBox>
      <CheckBox label="选项B" value="B"></CheckBox>
      <CheckBox label="选项C" value="C"></CheckBox>
      <CheckBox label="选项D" value="D"></CheckBox>
    </CheckBox.Group>
  )
}

```

## API

### CheckBox

| 属性          | 说明                                                                | 类型                                 | 默认值    | 可选值                                          | 版本 |
| ------------- | ------------------------------------------------------------------- | ------------------------------------ | --------- | ----------------------------------------------- | ---- |
| value         | 多选控件 value 值                                                   | string\|number                       | -         |                                                 |      |
| label         | 多选控件对应描述                                                    | string\|React.ReactNode              | -         |                                                 |      |
| disabled      | 失效状态                                                            | boolean                              | false     |                                                 |      |
| indeterminate | 设置 indeterminate 状态，只负责样式控制(主要用于全选、部分选择使用) | boolean                              | undefined |                                                 |      |
| checkBoxShape | 多选按钮形状                                                        | string                               | `default` | `default` `circle`                              |      |
| checkBoxType  | 多选按钮颜色风格                                                    | string                               | `default` | `default` `warning` `danger` `success` `health` |      |
| onChange      | 变化时的回调函数                                                    | (e: Event, checked: Boolean) => void | -         |                                                 |      |

### CheckBox.Group

| 属性          | 说明                                                     | 类型                     | 默认值    | 可选值                                          | 版本 |
| ------------- | -------------------------------------------------------- | ------------------------ | --------- | ----------------------------------------------- | ---- |
| name          | CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性 | string                   | -         |                                                 |      |
| value         | 指定选中的选项                                           | string[]                 | -         |                                                 |      |
| disabled      | 失效状态                                                 | boolean                  | false     |                                                 |      |
| options       | 指定可选项                                               | string[] \| Option[]     | -         |                                                 |
| checkBoxShape | 多选按钮形状                                             | string                   | `default` | `default` `circle`                              |      |
| checkBoxType  | 多选按钮颜色风格                                         | string                   | `default` | `default` `warning` `danger` `success` `health` |      |
| onChange      | 变化时的回调函数                                         | (data: string[]) => void | -         |                                                 |      |

### Option

```ts
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
```

import React, { Ref, forwardRef, useImperativeHandle, useMemo } from 'react'
import { Id, SelectedValue } from './typing';
import { clone } from 'ramda';
import { Context, SelectContext } from './context';

export interface SelectSingleProps {
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean;
  children: React.ReactNode
}

export interface SelectSingleRef<ValueType> {
  reset(): Promise<void>
  trigger(selectedId: Id): Promise<SelectedValue<ValueType>>
}

const InnerSelectSingle = <ValueType,>(props: SelectSingleProps, ref: Ref<SelectSingleRef<ValueType>>) => {
  const { repeatTriggerUnselected = true, children } = props
  const selectContext = useMemo(() => new Context<ValueType>(), []);

  useImperativeHandle(ref, () => ({
    async reset() {
      const { getAllSelectItem } = selectContext
      for (let item of getAllSelectItem()) {
        if (item.isChecked) {
          item.isChecked = false
          item.refreshHandler()
          break;
        }
      }
    },
    async trigger(id) {
      const { getAllSelectItem, getSelectItem } = selectContext
      let selectedItem = getSelectItem(id)
      if ([!(typeof id === 'string'), !selectedItem].includes(true)) {
        return Promise.reject("id不存在")
      }

      for (let item of getAllSelectItem()) {
        if (item.isChecked && item.id !== id) {
          item.isChecked = false
          item.refreshHandler()
          break;
        }
      }

      if (repeatTriggerUnselected) {
        selectedItem.isChecked = !selectedItem.isChecked
      } else {
        selectedItem.isChecked = true
      }
      selectedItem.refreshHandler()

      let result: SelectedValue<ValueType> = {
        id: selectedItem.id,
        value: selectedItem.isChecked ? clone(selectedItem.value) : undefined
      }
      return result
    }
  }), [])

  return <SelectContext.Provider value={selectContext}>
    {children}
  </SelectContext.Provider>
}

type ForwardRefReturnType<Value> = ReturnType<typeof forwardRef<SelectSingleRef<Value>, SelectSingleProps>>

/** 保留单选泛型 */
interface InnerSelectSingleType {
  <Value,>(
    ...params: Parameters<ForwardRefReturnType<Value>>
  ): ReturnType<ForwardRefReturnType<Value>>
}

export const SelectSingle = forwardRef(InnerSelectSingle) as InnerSelectSingleType
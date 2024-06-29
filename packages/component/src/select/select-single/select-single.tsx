import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { Id } from '@/typing'

import { SelectCollect } from '../select-collect'
import { RequiredISelectItem } from '../typing'
import { SelectSingleCollectContext } from './context'
import { type SelectSingleProps, SelectSingleRef } from './typing'

const InnerSelectSingle = <ValueType,>(props: SelectSingleProps<ValueType>, ref: Ref<SelectSingleRef<ValueType>>) => {
  const { children } = props
  const { current: collect } = useRef(new SelectCollect<ValueType>())
  const innerHandler = useMemo(() => {
    const handler: SelectSingleRef<ValueType> = {
      getItems: (ids: Id[]) => {
        const result: Array<RequiredISelectItem<ValueType>> = []

        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item) {
            result.push({
              id: item.id,
              value: item.value,
              isChecked: item.isChecked,
            })
          }
        })
        return result
      },
      select: (id, options = { allowRepeatSelect: false }) => {
        const item = collect.getItem(id)
        if (!item) {
          return
        }
        /** 允许重复点击一个 */
        if (options?.allowRepeatSelect) {
          if (!item.isChecked) {
            collect.updateItemColumn(id, { isChecked: true })
          }
        } else {
          collect.updateItemColumn(id, {
            isChecked: !item.isChecked,
          })
        }

        collect.getAllItem().forEach((item) => {
          if (item.id !== id && item.isChecked) {
            collect.updateItemColumn(item.id, {
              isChecked: false,
            })
          }
        })
        const result: RequiredISelectItem<ValueType> = {
          isChecked: item.isChecked,
          value: item.value,
          id: item.id,
        }
        return result
      },
    }

    return handler
  }, [])

  useImperativeHandle(ref, () => innerHandler, [ref])

  return (
    <SelectSingleCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </SelectSingleCollectContext.Provider>
  )
}

export const SelectSingle = forwardRef(InnerSelectSingle) as typeof InnerSelectSingle

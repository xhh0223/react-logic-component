import { isNil, omitBy } from 'lodash-es'

import { type Id } from '@/typing'

import { type CanUpdateITreeSelectItem, type ISelectCollect, type ITreeSelectItem } from './typing'
export class SelectCollect<ValueType = any> implements ISelectCollect<ValueType> {
  private readonly itemsCollect = new Map<Id, ITreeSelectItem<ValueType>>()

  updateItemColumn = (id: Id, params: Partial<CanUpdateITreeSelectItem<ValueType>>) => {
    const item = this.getItem(id)
    if (params) {
      this.itemsCollect.set(
        id,
        omitBy(
          {
            ...item,
            parentId: item.parentId,
            childrenIds: item.childrenIds,
            isChecked: params.isChecked,
            value: item.value,
          },
          isNil,
        ),
      )
      item?.refresh()
    }
  }

  getItem = (id: Id) => {
    return this.itemsCollect.get(id)
  }

  setItem = (id, item: ITreeSelectItem<ValueType>) => {
    this.itemsCollect.set(id, item)
  }

  delItem = (id: Id) => {
    this.itemsCollect.delete(id)
  }

  getAllItem = () => {
    return [...this.itemsCollect.entries()].map(([, value]) => value) as any
  }
}

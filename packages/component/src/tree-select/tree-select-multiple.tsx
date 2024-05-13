import { useRef, useMemo } from "react";
import { type TreeSelectMultipleProps } from "./typing";

import { SelectCollect } from "./select-collect";
import { defaultFn } from "@/utils";
import { SelectCollectContext } from "./context";
import { pick } from "lodash-es";

const PickColumns = ["id", "isChecked", "value", "descendantsIds", "parentId"];

export const TreeSelectMultiple = <ValueType,>(
  props: TreeSelectMultipleProps<ValueType>
) => {
  const { children, instance } = props;
  const { current: collect } = useRef(new SelectCollect<ValueType>());
  useMemo(() => {
    if (instance) {
      instance.getAllItem = () => {
        return collect
          .getAllItem()
          ?.map(([key, item]) => [key, pick(item, PickColumns)]);
      };

      instance.getItems = (ids) => {
        let result = [];
        ids?.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            result.push([item.id, pick(item, PickColumns)]);
          }
        });
        return result;
      };

      instance.getDescendantsIdsList = (id) => {
        const descendantsIds = collect.getItem(id)?.descendantsIds ?? [];
        const list = (ids, result = []) => {
          const items = instance.getItems(ids?.map((i) => i.id));
          items.forEach(([id, item]) => {
            result.push(id);
            if (item.descendantsIds) {
              list(item.descendantsIds, result);
            }
          });
          return result;
        };
        return list(descendantsIds);
      };

      instance.select = (ids) => {
        const result = [];
        ids?.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            if (!item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: true });
              item.refresh();
            }
            result.push([item.id, pick(item, PickColumns)]);
          }
        });
        return result;
      };

      instance.cancelSelected = (ids) => {
        const result = [];
        ids?.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            if (item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: false });
              item.refresh();
            }
            result.push([item.id, pick(item, PickColumns)]);
          }
        });
        return result;
      };

      instance.trigger = (ids) => {
        const result: any = [];
        ids.forEach((id) => {
          const item = collect.getItem(id);
          if (!item) {
            return;
          }
          /** 允许重复点击一个 */
          if (item.allowRepeatChecked) {
            if (!item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: true });
              item.refresh();
            }
          } else {
            collect.updateItemPartialColumn(id, {
              isChecked: !item.isChecked,
            });
            item.refresh();
          }
          result.push(pick(item, PickColumns));
        });
        return result;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectCollectContext.Provider value={collect}>
      {children}
    </SelectCollectContext.Provider>
  );
};

export const useTreeSelectMultipleInstance = <ValueType,>() => {
  return useRef({
    select: defaultFn,
    cancelSelected: defaultFn,
    trigger: defaultFn,
    getAllItem: defaultFn,
    getItems: defaultFn,
    getDescendantsIdsList: defaultFn,
  }).current as unknown as TreeSelectMultipleProps<ValueType>["instance"];
};

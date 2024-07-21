import { Flex } from 'antd'
import { useRef, useState } from 'react'

import { SelectSingle, SelectSingleHandler, SelectSingleItem } from '~react-logic-component'
const App = () => {
  const [state, setState] = useState({
    currentValue: undefined,
  })

  const ref = useRef<SelectSingleHandler>()

  return (
    <Flex component={'section'} vertical gap={12}>
      <SelectSingle ref={ref}>
        <Flex wrap>
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <SelectSingleItem
                key={index}
                id={index}
                value={index}
                render={({ id, isChecked, value, handler }) => (
                  <Flex
                    style={{ width: '5em' }}
                    onClick={() => {
                      const value = handler.select(id, { allowRepeatSelect: false })
                      setState({ currentValue: value })
                    }}
                  >
                    <div>{`第${value}项`}</div>
                    <input type="checkbox" checked={isChecked} onChange={() => {}} />
                  </Flex>
                )}
              />
            )
          })}
        </Flex>
      </SelectSingle>
      <Flex vertical gap={8}>
        <div>选项状态：</div>
        <div>{JSON.stringify(state.currentValue)}</div>
      </Flex>
    </Flex>
  )
}

export default App

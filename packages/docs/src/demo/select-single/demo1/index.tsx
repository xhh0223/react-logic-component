import { Avatar, Card, Checkbox, Flex } from 'antd'
import { useCallback, useMemo } from 'react'

import { SelectSingle, SelectSingleItem } from '~logic-component/select'

const Demo1 = () => {
  const CardWithCheck = useCallback((props: { isChecked: boolean; onClick: () => void }) => {
    const { isChecked, onClick } = props
    const suffix = useMemo(() => {
      return Math.random().toFixed(4)
    }, [])

    return (
      <Card
        onClick={onClick}
        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
        extra={<Checkbox checked={isChecked} />}
      >
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={`Card title${suffix}`}
          description={`This is the description ${suffix}`}
        />
      </Card>
    )
  }, [])

  return (
    <div>
      <SelectSingle>
        <Flex wrap gap={16}>
          {Array.from({ length: 10 }).map((_, index) => (
            <SelectSingleItem
              key={index}
              id={Math.random()}
              render={({ handler, isChecked, id }) => {
                return (
                  <CardWithCheck
                    isChecked={isChecked}
                    onClick={() => {
                      handler.select(id, { allowRepeatSelect: true })
                    }}
                  />
                )
              }}
              value={123}
            ></SelectSingleItem>
          ))}
        </Flex>
      </SelectSingle>
    </div>
  )
}

export default Demo1

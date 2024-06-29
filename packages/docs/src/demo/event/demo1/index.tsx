import { Flex } from 'antd'
import { useEffect, useRef } from 'react'

import { Event, EventItem, EventRef } from '~logic-component/index'

const Demo1 = () => {
  const ref = useRef<EventRef<any>>()
  useEffect(() => {
    ref.current.on({
      id: 123,
      dependency: [1],
      callback() {
        // console.log(params)
      },
    })
    setTimeout(() => {
      ref.current.emit([[1, 213]])
    }, 2000)
  }, [])

  return (
    <div>
      <Event ref={ref}>
        <Flex wrap gap={16} vertical={true}>
          <EventItem
            id={1}
            dependency={[1, 2, 3]}
            render={({ id }) => {
              return (
                <>
                  <div
                    onClick={() => {
                      ref.current.emit([[id, 123]])
                    }}
                  >
                    test
                  </div>
                </>
              )
            }}
          />
          <EventItem
            id={2}
            dependency={[2]}
            render={({ id }) => {
              return (
                <div
                  onClick={() => {
                    ref.current.emit([
                      [id, 123],
                      [3, 3122],
                    ])
                  }}
                >
                  test
                </div>
              )
            }}
          />
          <EventItem
            id={3}
            render={({ id, handler }) => (
              <>
                <div
                  onClick={() => {
                    handler.emit([[id, 123]])
                  }}
                >
                  test
                </div>
              </>
            )}
          />
        </Flex>
      </Event>
    </div>
  )
}

export default Demo1

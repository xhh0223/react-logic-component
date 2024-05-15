import { Flex } from "antd";
import Demo1 from "./demo1";
import Demo2 from "./demo2";

const Index = () => {
  return (
    <Flex gap={16} vertical>
      <Demo1 />
      <Demo2 />
    </Flex>
  );
};

export default Index;
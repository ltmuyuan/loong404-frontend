'use client';
import {useSearchParams} from "next/navigation";
import {useRequest} from "ahooks";
import axios from "axios";
import {Button, Flex} from "antd";

const Index = () => {

  const searchParams = useSearchParams()
  const res = searchParams.get('res')

  const {data, loading} = useRequest(() => axios.post('/chat/api/res', {
    res: res
  }), {
    refreshDeps: [res],
  })

  // data 是base64编码的图片
  return <Flex className={"background"} vertical gap={20} align={"center"} justify={"center"}>
    {data && <>
      <img src={`${data.data}`} style={{width: '270px', height: '480px'}}/>
      <Button
        onClick={() => {
          const a = document.createElement('a');
          a.href = data?.data;
          a.download = '2024.jpg';
          a.click();
        }}
        type={"primary"}
      >图片保存到本地</Button>
    </>}

  </Flex>
};

export default Index;

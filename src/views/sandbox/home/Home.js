import { Button } from 'antd';
import React from 'react';

export default function Home() {
  const ajax = () => {
    // 取数据
    // fetch('http://localhost:4000/posts')
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    // 增数据
    // const data = {
    //   "title": "44444",
    //   "author": "xander"
    // }
    // fetch('http://localhost:4000/posts', {
    //   method: 'POST',
    //   headers:{
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(res=>res.json())
    // .then(data=>console.log('Success:', data))
    // .catch(error=>console.log('Error:', error))
    // 更新
    // fetch('http://localhost:4000/posts/4', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ title: '44444' })
    // })
    // 关联
    fetch('http://localhost:4000/posts/1?_embed=comments')
      .then((res) => res.json())
      .then((data) => console.log(data));
    fetch('http://localhost:4000/comments?_expand=post')
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      Home
      <Button
        type="primary"
        onClick={() => {
          ajax();
        }}
      >
        button
      </Button>
    </div>
  );
}

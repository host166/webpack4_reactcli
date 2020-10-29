import React, { useState, useEffect } from "react";
import qs from 'query-string';

import { Button } from 'antd';
import 'antd/es/button/style/index.css';

import './index.less';

export function homeRender(props){
  const [uid, setUserID] = useState("");
  
  useEffect(()=>{
    // 场景创建时
    async function created(){
      // console.log('uid', uid, props);
    };
    created();
    
    return () => {
      
    };
  },[]);

  return (
    <section className="HomeWrapper">
      <Button type="primary" size="large">点击</Button>
    </section>
  )
};
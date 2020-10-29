import React, { useState, useEffect } from "react";

// import './index.less';

export default function homeRender(props){
  const [uid, setUserID] = useState('001');
  useEffect(()=>{
    // 场景创建时
    async function created(){
      setUserID(2);
    };
    created();
    
    return () => {
      //'componentWillUnmount: 组件卸载， 做一些清理工作'
    }
  },[]);

  return (
    <React.Fragment>
      <section className="HomeWrapper">{uid}</section>
    </React.Fragment>
  )
};
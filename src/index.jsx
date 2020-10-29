// styles
// import 'antd/dist/antd.css';
import '@/assets/css/common.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
// import zhCN from 'antd/es/locale/zh_CN';

import {homeRender as Home} from '@/pages/home/index';

// 无访问权限时
// import Page401 from './pages/abnormal/401';
// 异常时的页面地址
// import Page404 from './pages/abnormal/404';

// 校验sso - await verifyAuth();
ReactDOM.render(
  <React.Fragment>
    <HashRouter>
      <React.Fragment>
        <section className="df f14 systemPreSaleWrap">
          <section className="incWrap contentWrap">
            <Switch>
              {/* <Redirect exact from="/sso/callback" to="/" /> */}
              <Redirect exact from="/" to="/home" />
              <Route exact path="/home" component={Home} />
              {/* <Route component={Page404} /> */}
            </Switch>
          </section>
        </section>
      </React.Fragment>
    </HashRouter>
  </React.Fragment>,
  document.querySelector('#root') // as HTMLElement
);

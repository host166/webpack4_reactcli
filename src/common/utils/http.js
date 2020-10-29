/**
 * @Date:   2019-06-13
 * @Last modified by:   zjy
 * @Last modified time: 2019-06-13
**/

import qs from 'query-string';
import _ from 'lodash';

// fetch 兼容ie
import isomorphicFetch from 'isomorphic-fetch';
import esPromise from 'es6-promise';

esPromise.polyfill();

/**
 * @method
 * @param {object} args
 * 入参 例： 对照参数options
 * {
 *     url: '/miflightapi/json/touch/searchHotCity.html',
 *     args: {method: 'GET'},
 * }
 * @return {arraybuffer|blob|document|json|text|stream} iresponseType: 'json'配置
 * @desc axios方式请求接口
 **/
export function cdFetch(url = '', args = {}) {
  let opts = {
    method: 'GET',
    body: {},
    querystring: {},
    options: {
      credentials: 'same-origin',
      headers: {
        // 'Access-Control-Request-Method': '*',
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    },
    mode: 'no-cors',
    isFormData: false,
    catchMessage: false // catch时开启提示
  };
  for (let x in args) {
    opts[x] = args[x];
  };
  // 设置header
  if (Boolean(args['options'])) {
    for (let i in args['options']) {
      opts.options[i] = args['options'][i];
    };
  };

  // const isFormData = Object.prototype.toString.call(opts.body) === '[object FormData]';

  // // 修改 Content-type
  // if (isFormData) {
  //   const headers = opts.options.headers
  //   opts.options.headers = Object.assign(headers, {
  //     'Content-type': 'application/x-www-form-urlencoded',
  //   })
  // }

  let method = opts.method.toLocaleUpperCase();
  let isEmpty_qs = _.isEmpty(opts.querystring);
  let isEmpty_body = _.isEmpty(opts.body);
  let fetchUrl = url;

  opts.options['method'] = method;

  if (method === 'GET' || method === 'DELETE') {
    fetchUrl += `${!isEmpty_qs ? '?' + qs.stringify(opts.querystring) : ''}`;
  }
  if (method === 'POST' || method === 'PUT') {
    if (!isEmpty_qs) {
      fetchUrl += `?${qs.stringify(opts.querystring)}`; // `${!isEmpty_qs ? '?' + qs.stringify(opts.querystring) : ''}`
    }

    if (opts.isFormData) {
      opts.options['body'] = opts['body'];
      const headers = opts.options.headers
      opts.options.headers = Object.assign(headers, {
        'Content-type': 'application/x-www-form-urlencoded',
      })
    }else if (!isEmpty_body) {
      opts.options['body'] = opts.isFormData?opts['body']:JSON.stringify(opts['body'] || {});
    }
  }

  return new Promise((resolve, reject) => {
    let _fetch = window.fetch?window.fetch:isomorphicFetch;

    _fetch(fetchUrl, opts.options)
      .then(resp => {

        if (resp.status >= 500) {
          return reject(resp);
        }

        // let respStatus =
        //   resp.status === 401 && resp.statusText === "Unauthorized";
        // // 未授权需要登录
        // if (respStatus) {
        //   return resolve({
        //     status: resp.status,
        //     error: "sso.login.failure",
        //     message: "登录信息失效"
        //   });
        // }
        return resp && resp.json();
      })
      .then(data => {
        // console.log('cookies', `${actions.getData("clientId")}_ssoid`)
        // if (data.Error) {
        //   console.log(data.Message || '请求发生异常，请重试。');
        //   return resolve(data.Message);
        // }

        if (data.IsLogin === false) {
          console.log('请登陆');
        }

        return resolve(data);
      })
      .catch(e => {
        if (opts.catchMessage) {
          console.log('请求发生异常，请重试。');
        }
        return reject(e);
      });

  });
}

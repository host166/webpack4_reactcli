/**
 * 获取链接中的参数
 * @param {string} name 对应key的参数名
 * @returns {string|object} 返回一个对象，或者具体的value
 **/
export function getUrlQuery(name = '') {
  let url = window.location.href, // .search.substr(1)
    reg = /([^#?=&]+)=([^#?=&]*)/g, // ？号改成#就获取hash后面的参数
    obj = {};
  while (reg.exec(url) !== null) {
    obj[RegExp.$1] = RegExp.$2;
  }
  // 不填写name参数 就是获取所有
  return name ? obj[name] : obj;
}
/**
 * node: 事件订阅和发布和监听器
 * @key $eventMap {object} 用来储存时间的事件池
 * @key $emit 发布{function} => name{string} 注册的事件名 data{any} 需要赋的值
 * @key $on 订阅{function} => name{string} 注册的事件名 fn{function} 监听函数
 * @key $off 解绑订阅{function} => name{string} 注册的事件名 fn{function} 监听函数
 * ...
 * @retun null;
 */
export let subscriptions = {
  // 事件池
  $eventMap: {},
  $emit(name, data) {
    // 如果有事件监听，则触发事件
    if (subscriptions.$eventMap[name]) {
      subscriptions.$eventMap[name].forEach(cb => {
        cb(data);
      });
    }
  },
  // listen event function
  $on(name, fn) {
    if (!subscriptions.$eventMap[name]) {
      subscriptions.$eventMap[name] = [];
    }
    // must function
    if (typeof fn === 'function') {
      subscriptions.$eventMap[name].push(fn);
    }
  },
  $off(name, fn) {
    if (subscriptions.$eventMap[name]) {
      subscriptions.$eventMap[name] = subscriptions.$eventMap[name].filter(cb => cb !== fn);
    }
  },
  // 监听数据变化 public static
  $watch(obj, key, callback) {
    Object.defineProperty(obj, key, {
      set: function(newVal) {
        // console.log(key, newVal)
        callback && callback(newVal);
      }
    });
  }
};

export function iDate(time = new Date(), diff = 0, style = 'yyyy-mm-dd') {
  let dayTime = 1000 * 60 * 60 * 24,
    _date = new Date(new Date(time).setHours(0, 0, 0, 0) + diff * dayTime), // 设置为0点
    _timer = new Date(new Date(time).getTime() + diff * dayTime),
    weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dataBase = {
      // 年月日
      y: _date.getFullYear(),
      yyyy: `${_date.getFullYear()}`,
      m: _date.getMonth() + 1,
      mm: (_date.getMonth() + 1 < 10 ? '0' : '') + (_date.getMonth() + 1),
      d: _date.getDate(),
      dd: (_date.getDate() < 10 ? '0' : '') + _date.getDate(),
      // 时间
      _h: _timer.getHours(),
      _hh: (_timer.getHours() < 10 ? '0' : '') + _timer.getHours(),
      _m: _timer.getMinutes(),
      _mm: (_timer.getMinutes() < 10 ? '0' : '') + _timer.getMinutes(),
      _s: _timer.getSeconds(),
      _ss: (_timer.getSeconds() < 10 ? '0' : '') + _timer.getSeconds(),
      time: _timer.getTime(),
      // 其他
      w: weekDay[_date.getDay()], // 返回周几的文字
      widx: _date.getDay(), // 周几的下标
      timeInit: _date.getTime(), // 设置时间初始化0点 setHours(0,0,0,0)
      dayDes: '', // 今天、明天、后天的描述
      string: '', // 返回日期格式 默认yyyy-mm-dd
      timeall: '', // 返回 yyyy-mm-dd hh:mm:ss
      month_day: '', // 返回04月05日
      oDate: _date, // 返回new Date 对象
    };

  //月 日展示（例：04月05日）
  dataBase.month_day = `${dataBase.mm}月${dataBase.dd}日`;

  //今天明天后天的描述
  switch ((_date - dataBase.timeInit) / dayTime) {
    case 0:
      dataBase.todayDes = '今天';
      break;
    case 1:
      dataBase.todayDes = '明天';
      break;
    case 2:
      dataBase.todayDes = '后天';
      break;
    default:
      dataBase.todayDes = dataBase.w;
  }

  // 本月末 = 下月初1-1000毫秒
  // dataBase.lastDay = (dataBase.m+1>12)?
  //  `${new Date((dataBase.y+1))}-01-01`:
  //  `${new Date(dataBase.y+"/"+(dataBase.m+1)+"/1")}`;
  // dataBase.lastDay = (new Date(dataBase.lastDay.getTime()-1000)).getDate();
  // 当月最大天数 （当月最后一天是几号）
  dataBase.lastDay = new Date(dataBase.y, dataBase.m, 0).getDate();

  // 如果是中文
  if (style.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/gi)) {
    let val = {
      '年': dataBase.y,
      '月': dataBase.mm,
      '日': dataBase.dd
    };
    dataBase.string = [];
    [].map.call(style.split(''),(item, index) => {
      if (val[item]) dataBase.string.push(val[item] + item);
    });
    dataBase.string = dataBase.string.join('');
  } else {
    dataBase.string = [];
    // 获得分隔符
    let splitSymbol = style.match(/[^a-z]/gi)[0];
    // 返回日期格式
    [].map.call(style.split(splitSymbol),item => {
      dataBase.string.push(dataBase[item]);
    });
    dataBase.string = dataBase.string.join(splitSymbol);
  }
  dataBase.timeall = `${dataBase.string} ${dataBase._hh}:${dataBase._mm}:${dataBase._ss}`;

  return dataBase;
}
  
export function deepCopy(p, c) {
  let _c = c || {};
  for (let i in p) {
    if (typeof p[i] === 'object') {
      _c[i] = p[i].constructor === Array ? [] : {};
      deepCopy(p[i], _c[i]);
    } else {
      _c[i] = p[i];
    }
  }
  return _c;
}
  
export function wake(duration = 500) {
  let timeline;
  return new Promise((resolve) => {
    if (timeline) {
      timeline = null;
      clearTimeout(timeline);
    }
    timeline = setTimeout(resolve, duration);
  });
}
  
/**
 * 封装一套本地存储的方法
 * type=ls(localStorage); type=ss(sessionStorage); 使用不同方法的本地存储方法
 * @param {string} type 执行的方法： get、set、remove、clear
 * @param {string} key 键值
 * @param {any} val 值
 * @param {string} registerType 注册方式： localStorage or sessionStorage
 * @returns {event} 执行对应方法
 */
export function local(type, key, val, registerType = 'localStorage') {
  const methods = {
    get() {
      // 如果本地缓存中查询到指定值
      if (window[registerType].getItem(key)) {
        return JSON.parse(window[registerType].getItem(key));
      }
      return '';
    },
    set() {
      return window[registerType].setItem(key, JSON.stringify(val));
    },
    remove() {
      if (window[registerType].getItem(key)) {
        return window[registerType].removeItem(key);
      }
      return '';
    },
    clear() {
      return window[registerType].clear();
    }
  };
  return methods[type]();
}
// 本地 sessionStorage
export function session(type, key, val, registerType = 'sessionStorage') {
  // console.log( type, key, val, registerType );
  return local(type, key, val, registerType);
}
  
// 对cookie的操作
export function cookies(type, key, val, days = 30) {
  let path = '/';
  const method = {
    // 获取cookies
    get() {
      let arr,
        reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    //设置cookies
    set() {
      let Days = days;
      let exp = new Date();
      let args = '';
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      args = key + '=' + escape(val) + ';expires=' + exp.toGMTString();
      if (path) args += ';path=' + path;

      document.cookie = args;
    },
    // 删除cookie
    delete() {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      let cval = this.get(key);
      if (cval !== null) document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
    }
  };
  return method[type]();
}
  
// 校验url的合法性
export function isURL(str_url) {
  let strRegex = [
    // 验证url
    '^((https|http|ftp|rtsp|mms)?://)',
    // ftp的user@
    '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?',
    // IP形式的URL- 255.255.255.255
    '(([0-9]{1,3}\.){3}[0-9]{1,3}',
    // 允许IP和DOMAIN（域名）
    '|',
    // 域名- www.
    '([0-9a-z_!~*\'()-]+\.)*',
    // 二级域名
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.',
    // first level domain- .com or .museum
    '[a-z]{2,6})', 
    // 端口- :80
    '(:[0-9]{1,4})?',
    // 如果没有文件名，则不需要斜杠
    '((/?)|',

    '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
  ].join('');
          
  let re = new RegExp(strRegex);
  return re.test(str_url);
}

//获取宽度
export function win(){
  let winWidth = 0,
    winHeight = 0;
  //获取窗口宽度
  if (window.innerWidth){
    winWidth = window.innerWidth;
  }else if ((document.body) && (document.body.clientWidth)){
    winWidth = document.body.clientWidth;
  }
  //获取窗口高度
  if (window.innerHeight){
    winHeight = window.innerHeight;
  }else if ((document.body) && (document.body.clientHeight)){
    winHeight = document.body.clientHeight;
  }
  //通过深入Document内部对body进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
  }
  //结果输出至两个文本框
  // console.log(winWidth, winHeight);
  return {
    width : winWidth,
    height : winHeight
  };
}
/**
 * node: 事件绑定方法 兼容IE
 * @param {documentElement} el 元素绑定对象
 * @param {event} event 事件类型
 * @param {function} handler 处理函数
**/
export function addEvent(el, event, handler) {
  if (!el) {
    return;
  }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    el['on' + event] = handler;
  }
}
/**
 * node: 事件解绑方法 兼容IE
 * @param {documentElement} el 元素绑定对象
 * @param {event} event 事件类型
 * @param {function} handler 处理函数
**/
export function removeEvent(el, event, handler) {
  if (!el) {
    return;
  }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    el['on' + event] = null;
  }
}

/**
 * node: 返回 mouse || touch 的坐标
 * @param {mouseEvent} e 事件参数
 * @returns {object} 返回对象参数，值是坐标系
**/
export function getPageOptions(e){
  return {
    pageX: (e.touches ? e.touches[0].pageX : e.pageX) || 0,
    pageY: (e.touches ? e.touches[0].pageY : e.pageY) || 0
  };
}

/** 
 * @param {object} opts 为对象时是属性配置，为数字时是转换适配后的数字
 * @param {string} mode 适配模式 - transverse:横向 vertical:纵向
 * @returns {number} 返回数据
*/
export function oAdapt(opts={}, mode='transverse'){
  let design = {
    'w': 750, 
    'h': 1334,
    'px': 20,
    'fn':function(){}
  };
  for( let x in opts ){
    design[x] = opts[x];
  }

  let formula = ()=>{
    // transverse ：横向； vertical ：竖向
    return mode === 'transverse'
      ? win().width / design.w
      : (design.w / design.h <
      win().width / win().height
        ? (design.w / design.h) * win().height
        : win().width) / design.w;
  };

  // 手机翻转时
  orientationChange(()=>{
    design.fn(formula()*design.px);
  });
  design.fn(formula()*design.px);

  return formula;
}
/** 
* 适配计算
* @param {number} nums 适配计算数值
* @param {string} mode 适配模式
* @returns {number} 适配计算数值
*/
export function autoAdapt(nums, mode='transverse') {
  return oAdapt({
    px: nums
  },mode);
}

/**
 * 获得元素节点
 * @param {string} $ DOM选择器选择元素
 * @returns {elementdocument} DOM
*/
export function query($='') {
  let o = document.querySelectorAll($);
  if (o&&!o.length) {
    return {};
  } else if (o.length === 1) {
    return o[0] || document.querySelector($);
  }
  return o;
}

/**
 * 手机翻转是出发回调操作
 * @param {function} fn 回调参数
 * @returns {string} 没有返回值
**/
export function orientationChange(fn) {
  // 如果浏览器不支持 orientation方法  那么使用onresize代替
  if (typeof window.onorientationchange === 'undefined') {
    let timer;
    window.onresize = function() {
      if( timer ){
        clearTimeout(timer);
        timer=null;
      }
      timer = setTimeout(function() {
        fn && fn();
      }, 200);
    };
  } else {
    window.onorientationchange = function() {
      if(
        window.orientation === 0 || 
        window.orientation === 180 || 
        window.orientation === 90 || 
        window.orientation === -90
      ){
        fn && fn();
      }
    };
  }
  return '';
}
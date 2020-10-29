import { v1 as uuidv1, v5 as uuidv5 } from 'uuid';
import $store from '@/store'

function getUUID() {
  return uuidv1().replace(/-/g, '');
}

function getTagid(type) {
  return type + '-' + Date.now().toString(36) + Math.random().toString(36).substr(3,10)
}

/**
 *
 * @returns {{pageContent: Array, pageId: string}}
 */
export function getPageBaseVnode() {
  return {
    pageId: '',
    pageName: 'Home',
    // logo
    pageLogo: {
      dataKey: '',
      value: '',
    },
    // 菜单项目
    pageNav: [],
    pageContent: {},
  }
}

/**
 * 组件基础结构
 * @param name
 * @returns {{tagname: *, tagid: string, tagdata: {}, options: {}}}
 */
export function getBaseTagVnode(name, type) {
  return Object.freeze({
    // 组件名称
    tagname: name,
    tagtype: type,
    // 唯一标识 排序 查询 组件key
    tagid: getTagid(type, name),
    // 组件数据
    tagdata: {
      background: {
        dataKey: getUUID(),
        url: '',
        color: '',
      }
    },
    // 组件参数
    options: {}
  })
}

/**
 * 获取header数据
 * @param UeData
 * @returns {Array}
 */
export function getHeaderVnode(UeData) {
  const header = [];
  const nav = getBaseTagVnode('NavigationStyle1', 'nav');
  Object.assign(nav.tagdata, {
    // logo
    logo: {},
    // 导航
    nav: {
      // 导航间距
      space: 50,
    }
  })

  header.push(nav)

  if (UeData.banner) {
    const banner = getBaseTagVnode('BannerStyle1', 'banner')
    const UeBanner = UeData.banner[0];

    if (UeBanner.bannerTitle) {
      banner.tagdata.title = {
        dataKey: UeBanner.bannerTitle.UniqueDataKey,
        text: `<p class="font_60 font_center">
                <span class="color_1">${UeBanner.bannerTitle.Value}</span>
              </p>`,
        hide: false
      }
    }

    if (UeBanner.bannerSubTitle) {
      banner.tagdata.subTitle = {
        dataKey: UeBanner.bannerSubTitle.UniqueDataKey,
        text: `<p class="font_24 font_center">
                 <span class="color_1">${UeBanner.bannerSubTitle.Value}</span>
              </p>`,
        hide: false
      }
    }

    if (UeBanner.bannerImageList) {
      const image = UeBanner.bannerImageList[0];
      banner.tagdata.background = {
        dataKey: image.UniqueDataKey,
        url: image.Value,
        color: '',
      }
    }

    header.push(banner)
  }
  return header;
}

/**
 * 获取Footer数据
 * @param UeData
 * @returns {Array}
 */
export function getFooterVnode(UeData) {
  const footer = [];
  if (UeData.footer && UeData.footer.length > 0) {
    const ueFooter = UeData.footer[0].textList;
    const tagdata = {};

    tagdata.copyright = {
      dataKey: ueFooter[0].UniqueDataKey,
      text: ueFooter[0].Value,
    }

    tagdata.license = {
      dataKey: ueFooter[1].UniqueDataKey,
      text: ueFooter[1].Value,
    }

    tagdata.icp = {
      dataKey: ueFooter[2].UniqueDataKey,
      text: ueFooter[2].Value,
      // text: `<p class="font_12 nowrap"><span class="color_1">${ueFooter[2].Value}</span></p>`,
    }
    const vnodeFooter = getBaseTagVnode('FooterStyle1', 'footer');
    Object.assign(vnodeFooter.tagdata, tagdata)
    footer.push(vnodeFooter)
  }
  return footer;
}

export function getAnchorNavVnode(main = []) {
  const nav = [];
  const getNavCell = function (name, tagid) {
    return {
      dataKey: getUUID(),
      text: name,
      href: '',
      hide: false,
      anchor: tagid
    }
  };
  main.forEach(item => {
    switch (item.tagtype) {
      case 'corpIntro':
        nav.push(
          getNavCell('关于我们', item.tagid)
        )
        break;
      case 'productIntro':
        nav.push(
          getNavCell('产品介绍', item.tagid)
        )
        break;
      case 'contact':
        nav.push(
          getNavCell('联系我们', item.tagid)
        )
        break;
    }
  })
  return nav
}

/**
 * 产品信息转换成 ImageTextStyle1 组件数据
 * @param productIntro
 */
export function transform_corpIntro_ImageTextStyle1(productIntro = []) {
  if (productIntro.length > 0) {
    const tagdata = {};
    tagdata.title = {
      dataKey: getUUID(),
      text: `<h2 class="font_30 font_center">
            产品介绍
            </h2>`,
    };
    tagdata.group = {
      background: {
        dataKey: getUUID(),
        url: '',
        color: '',
      },
      cellBackground: {
        dataKey: getUUID(),
        color: '#FFFFFF',
      },
      cellSpace: {
        dataKey: getUUID(),
        value: 20
      },
    }

    const cellList = [];
    productIntro.forEach(item => {
      if (item.productIntro_imageList && item.productIntro_longText) {
        const image = item.productIntro_imageList[0];
        const text = item.productIntro_longText;
        cellList.push({
          image: {
            dataKey: image.UniqueDataKey,
            url: image.Value,
            hide: false
          },
          title: {
            dataKey: getUUID(),
            text: '',
            hide: false
          },
          describe: {
            dataKey: text.UniqueDataKey,
            text: `<p class="font_center font_14 line_2n"><span class="color_16">${text.Value}</span></p>`,
            hide: false
          }
        })
      }

    })

    if (cellList.length > 0) {
      tagdata.group.cellList = cellList;
    }


    const baseTagVnode = getBaseTagVnode('ImageTextStyle1', 'productIntro');
    Object.assign(baseTagVnode.tagdata, tagdata);
    return baseTagVnode;
  }
}

/**
 * 公司信息转换成 ImageTextStyle2 组件数据
 * @param corpIntro
 */
export function transform_corpIntro_ImageTextStyle2(corpIntro = []) {
  if (corpIntro.length > 0) {
    const imageList = [];
    const textList = [];
    corpIntro.forEach(item => {
      if (item.corpIntro_imageList) {
        imageList.push(...item.corpIntro_imageList)
      }
      if (item.corpIntro_longText) {
        textList.push(item.corpIntro_longText)
      }
    })

    const tagdata = {};
    tagdata.title = {
      dataKey: getUUID(),
      text: `<h2 class="font_36">关于我们</h2>`,
    };

    tagdata.imageList = [];
    imageList.forEach(item => {
      tagdata.imageList.push({
        dataKey: item.UniqueDataKey,
        url: item.Value
      })
    })

    tagdata.textList = [];
    textList.forEach(item => {
      tagdata.textList.push({
        dataKey: item.UniqueDataKey,
        text: `<p><span class="color_16">${item.Value}</span></p>`,
        hide: false,
      })
    })

    const baseTagVnode = getBaseTagVnode('ImageTextStyle2', 'corpIntro');
    Object.assign(baseTagVnode.tagdata, tagdata);
    return baseTagVnode;
  }
}


export function transform_corpIntro_ContactStyle1(contact = []) {

  if (contact.length > 0) {
    const tagdata = {};
    const firstContact = contact[0];

    tagdata.title = {
      dataKey: getUUID(),
      text: `<h2 class="font_30 font_center">
            联系我们
            </h2>`,
    }

    if (firstContact.contact_address) {
      tagdata.address = {
        dataKey: firstContact.contact_address.UniqueDataKey,
        text: firstContact.contact_address.Value,
      }
    }

    if (firstContact.contact_email) {
      tagdata.email = {
        dataKey: firstContact.contact_email.UniqueDataKey,
        text: firstContact.contact_email.Value,
      }
    }
    if (firstContact.contact_telephone) {
      tagdata.telephone = {
        dataKey: firstContact.contact_telephone.UniqueDataKey,
        text: firstContact.contact_telephone.Value,
      }
    }

    const baseTagVnode = getBaseTagVnode('ContactStyle1', 'contact');
    Object.assign(baseTagVnode.tagdata, tagdata);
    return baseTagVnode;
  }
}

/**
 * 转换logo数据
 * @param corpLogo
 * @returns {{dataKey: *, url: *}}
 */
export function transform_corpLogo(corpLogo = []) {
  if (corpLogo.length > 0) {
    const first = corpLogo[0]
    return {
      dataKey: first.UniqueDataKey,
      url: first.Value
    }
  }

}

export function ueTransformVnode(ueData) {

  const main = [];
  try {
    const UeData = JSON.parse(ueData);
    console.log(UeData)

    if (UeData.corpIntro) {
      main.push(transform_corpIntro_ImageTextStyle2(UeData.corpIntro))
    }
    if (UeData.productIntro) {
      main.push(transform_corpIntro_ImageTextStyle1(UeData.productIntro))
    }
    if (UeData.contact) {
      main.push(transform_corpIntro_ContactStyle1(UeData.contact))
    }

    const baseVnode = getPageBaseVnode();

    // pageContent.main
    baseVnode.pageContent.main = main;

    baseVnode.pageContent.header = getHeaderVnode(UeData)

    baseVnode.pageContent.footer = getFooterVnode(UeData)

    baseVnode.pageLogo = transform_corpLogo(UeData.corpLogo)

    baseVnode.pageNav = getAnchorNavVnode(main);

    $store.dispatch('Designer/updateAllVnodeData', baseVnode);

    console.log('baseVnode', baseVnode)
  } catch (e) {
    console.error(e)
  }
}
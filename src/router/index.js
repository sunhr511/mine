import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/mutation-types'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: (resolve) => require(['../views/login/loginIndex.vue'], resolve),
      redirect: '/login',
      children: [
        {
          path: 'login',
          name: '主页',
          component: resolve => require(['../views/login/login.vue'], resolve)
        },
        {
          path: 'jd',
          imgPath: require('../assets/yunyingguanli/在线接单.png'),
          name: '在线接单',
          // redirect: 'hello/jichushezhi/gongsizhutishezhi',
          component: resolve => require(['../views/yunyingguanli/zxjd.vue'], resolve)
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      redirect: 'index/shoye',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['../views/index.vue'], resolve),
      children: [
        {
          path: 'shoye',
          name: '首页',
          component: resolve => require(['../views/shoye.vue'], resolve)
        },
        {
          path: '/',
          name: 'yunyingguanli',
          component: resolve => require(['../views/show.vue'], resolve),
          children: [
            {
              path: 'shkd',
              imgPath: require('../assets/yunyingguanli/发货开单.png'),
              name: '收货开单',
              // redirect: 'hello/jichushezhi/feiyongzidian',
              component: resolve => require(['../views/yunyingguanli/shkd.vue'], resolve)
            },
            {
              path: 'dhcj',
              imgPath: require('../assets/yunyingguanli/到货承接.png'),
              name: '到货承接',
              // redirect: 'hello/jichushezhi/wangdianshezhi',
              component: resolve => require(['../views/yunyingguanli/dhcj.vue'], resolve)
            },
            {
              path: 'kc',
              imgPath: require('../assets/yunyingguanli/库存.png'),
              name: '库存',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/yunyingguanli/kc.vue'], resolve)
            },
            {
              path: 'pz',
              imgPath: require('../assets/yunyingguanli/配载.png'),
              name: '配载发车',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/yunyingguanli/pz.vue'], resolve)
            },
            // {
            //   path: 'fc',
            //   imgPath: require('../assets/yunyingguanli/发车.png'),
            //   name: '发车',
            //   // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
            //   component: resolve => require(['../views/yunyingguanli/fc.vue'], resolve)
            // },
            {
              path: 'fhck',
              imgPath: require('../assets/yunyingguanli/放货出库.png'),
              name: '放货出库',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/yunyingguanli/fhck.vue'], resolve)
            },
            {
              path: 'ydfh',
              imgPath: require('../assets/yunyingguanli/原单返回.png'),
              name: '原单返回',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/yunyingguanli/ydfh.vue'], resolve)
            },
            {
              path: 'fhjs',
              imgPath: require('../assets/yunyingguanli/放货结算.png'),
              name: '放货结算',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/yunyingguanli/fhjs.vue'], resolve)
            },
            {
              path: 'hdqs',
              imgPath: require('../assets/yunyingguanli/回单签收.png'),
              name: '回单签收',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/yunyingguanli/hdqs.vue'], resolve)
            },
            {
              path: 'hdjj',
              imgPath: require('../assets/yunyingguanli/回单交接.png'),
              name: '回单交接',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/yunyingguanli/hdjj.vue'], resolve)
            },
            {
              path: 'hdjs',
              imgPath: require('../assets/yunyingguanli/回单结算.png'),
              name: '回付结算',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/yunyingguanli/hdjs.vue'], resolve)
            }
          ]
        },
        {
          path: '/',
          name: 'yunshuguanli',
          component: resolve => require(['../views/show.vue'], resolve),
          children: [
            {
              path: 'fcjl',
              imgPath: require('../assets/yunshuguanli/发车记录.png'),
              name: '发车记录',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/yunshuguanli/fcjl.vue'], resolve)
            },
            {
              path: 'jcjl',
              imgPath: require('../assets/yunshuguanli/接车记录.png'),
              name: '接车记录',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/yunshuguanli/jcjl.vue'], resolve)
            },
            {
              path: 'clxx',
              imgPath: require('../assets/yunshuguanli/车辆信息.png'),
              name: '车辆信息',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/yunshuguanli/clxx.vue'], resolve)
            },
            {
              path: 'sjxx',
              imgPath: require('../assets/yunshuguanli/司机信息.png'),
              name: '司机信息',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/yunshuguanli/sjxx.vue'], resolve)
            }
          ]
        },
        {
          path: '/',
          name: 'caiwuguanli',
          component: resolve => require(['../views/show.vue'], resolve),
          children: [
            {
              path: 'bzjs',
              imgPath: require('../assets/caiwuguanli/本站结算.png'),
              name: '本站结算',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/caiwuguanli/bzjs.vue'], resolve)
            },
            {
              path: 'hksh',
              imgPath: require('../assets/caiwuguanli/货款审核.jpg'),
              name: '货款审核',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/caiwuguanli/hksh.vue'], resolve)
            },
            {
              path: 'hkff',
              imgPath: require('../assets/caiwuguanli/货款发放.png'),
              name: '货款发放',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/caiwuguanli/hkff.vue'], resolve)
            },
            {
              path: 'rcsz',
              imgPath: require('../assets/caiwuguanli/日常收支.png'),
              name: '日常收支',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/caiwuguanli/rcsz.vue'], resolve)
            }
          ]
        },
        {
          path: '/',
          name: 'kefuguanli',
          component: resolve => require(['../views/show.vue'], resolve),
          children: [
            {
              path: 'ydwh',
              imgPath: require('../assets/kefuguanli/运单维护.png'),
              name: '运单维护',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/kefuguanli/ydwh.vue'], resolve)
            },
            {
              path: 'ydgj',
              imgPath: require('../assets/kefuguanli/运单轨迹.png'),
              name: '运单轨迹',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/kefuguanli/ydgj.vue'], resolve)
            },
            {
              path: 'yccl',
              imgPath: require('../assets/kefuguanli/异常处理.png'),
              name: '异常处理',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/kefuguanli/yccl.vue'], resolve)
            },
            {
              path: 'lpcl',
              imgPath: require('../assets/kefuguanli/理赔处理.png'),
              name: '理赔处理',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/kefuguanli/lpcl.vue'], resolve)
            }
          ]
        },
        {
          path: '/',
          name: 'baobiaofenxi',
          component: resolve => require(['../views/show.vue'], resolve),
          children: [
            {
              path: 'wdshtj',
              imgPath: require('../assets/baobiaofenxi/网点收货统计.png'),
              name: '网点收货统计',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/baobiaofenxi/wdshtj.vue'], resolve)
            },
            {
              path: 'wdystj',
              imgPath: require('../assets/baobiaofenxi/网点营收统计.png'),
              name: '网点营收统计',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/baobiaofenxi/wdystj.vue'], resolve)
            },
            {
              path: 'wddhzl',
              imgPath: require('../assets/baobiaofenxi/网点到货滞留.png'),
              name: '网点到货滞留',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/baobiaofenxi/wddhzl.vue'], resolve)
            },
            {
              path: 'shyltj',
              imgPath: require('../assets/baobiaofenxi/收货余留统计.png'),
              name: '收货余留统计',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/baobiaofenxi/shyltj.vue'], resolve)
            },
            {
              path: 'hdsxtj',
              imgPath: require('../assets/baobiaofenxi/回单时效统计.png'),
              name: '回单统计',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/baobiaofenxi/hdsxtj.vue'], resolve)
            },
            {
              path: 'ycdjjk',
              imgPath: require('../assets/baobiaofenxi/异常单据监控.png'),
              name: '异常单据监控',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/baobiaofenxi/ycdjjk.vue'], resolve)
            },
            {
              path: 'fkhztj',
              imgPath: require('../assets/baobiaofenxi/放款汇总统计.png'),
              name: '放款汇总统计',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/baobiaofenxi/fkhztj.vue'], resolve)
            },
            {
              path: 'fkmxtj',
              imgPath: require('../assets/baobiaofenxi/放款明细统计.png'),
              name: '放款明细统计',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/baobiaofenxi/fkmxtj.vue'], resolve)
            },
            {
              path: 'hkfstj',
              imgPath: require('../assets/baobiaofenxi/货款收放统计.png'),
              name: '货款收放统计',
              component: resolve => require(['../views/baobiaofenxi/hkfstj.vue'], resolve)
            }
          ]
        },
        {
          path: '/',
          name: 'jichushezhi',
          component: resolve => require(['../views/show.vue'], resolve),
          children: [
            {
              path: 'gongsizhutishezhi',
              imgPath: require('../assets/jichushezhi/公司主体设置.png'),
              name: '公司主体设置',
              // redirect: 'hello/jichushezhi/gongsizhutishezhi',
              component: resolve => require(['../views/jichushezhi/gongsizhutishezhi.vue'], resolve)
            },
            // {
            //   path: 'feiyongzidian',
            //   imgPath: require('../assets/jichushezhi/费用字典.png'),
            //   name: '费用字典',
            //   // redirect: 'hello/jichushezhi/feiyongzidian',
            //   component: resolve => require(['../views/jichushezhi/feiyongzidian.vue'], resolve)
            // },
            {
              path: 'wangdianshezhi',
              imgPath: require('../assets/jichushezhi/同行资料.png'),
              name: '同行资料',
              // redirect: 'hello/jichushezhi/wangdianshezhi',
              component: resolve => require(['../views/jichushezhi/tonghangziliao.vue'], resolve)
            },
            {
              path: 'kehuziliao',
              imgPath: require('../assets/jichushezhi/客户资料.png'),
              name: '客户资料',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/jichushezhi/kehuziliao.vue'], resolve)
            },
            {
              path: 'yuangongziliao',
              imgPath: require('../assets/jichushezhi/员工资料.png'),
              name: '员工资料',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/jichushezhi/yuangongziliao.vue'], resolve)
            },
            {
              path: 'quanxianshezhi',
              imgPath: require('../assets/jichushezhi/权限设置.png'),
              name: '角色设定',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/jichushezhi/quanxianshezhi.vue'], resolve)
            },
            {
              path: 'duanxinshezhi',
              imgPath: require('../assets/jichushezhi/短信设置.png'),
              name: '短信设置',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/jichushezhi/duanxinshezhi.vue'], resolve)
            },
            {
              path: 'dayinshezhi',
              imgPath: require('../assets/jichushezhi/打印设置.png'),
              name: '打印设置',
              // redirect: 'hello/jichushezhi/gongsicaiwushuxingshezhi',
              component: resolve => require(['../views/jichushezhi/dayinshezhi.vue'], resolve)
            },
            {
              path: 'zhanweixiaochujinggao',
              name: ''
            }
          ]
        }
      ]
    }
  ]
})
if (window.sessionStorage.getItem('token')) {
  store.commit(types.LOGIN, window.sessionStorage.getItem('token'))
}
if (window.sessionStorage.getItem('loginID')) {
  store.commit(types.LOGINID, window.sessionStorage.getItem('loginID'))
}
// router.options.routes[1].children[5].children[0].meta = true
// router.options.routes[1].children[5].children[1].meta = true
// router.options.routes[1].children[5].children[2].meta = false
// router.options.routes[1].children[5].children[3].meta = false
// router.options.routes[1].children[5].children[4].meta = false
router.beforeEach((to, from, next) => {
  // for (let jcsz in router.options.routes[1].children[5].children) {
  //   if (router.options.routes[1].children[5].children[jcsz].path === to.path.match(/index\/(\S*)/)[1]) {
  //     console.log(router.options.routes[1].children[5].children[jcsz].meta)
  //   }
  // }
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token && store.state.loginID) {
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
// router.beforeEach((to, from, next) => {
//   console.log(to.metched)
// })
export default router

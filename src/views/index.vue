<template >
<div class="allCase">
  <div  class="hair" >
    <el-row name="head" type="flex" justify="center">
      <el-col class="head" :span="23" >
        <span style="">
          <img src="http://www.udao56.com/Work/logo/1.png"  alt="优道联运">
        </span>

          <div class="divItem">
            <div >欢迎使用优道物流管理系统</div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div @click="back()" style="cursor:pointer"><img src="../assets/shouye/返回首页.png">返回主页</div>
            <div @click="out()" style="cursor:pointer"><img  src="../assets/shouye/退出.png">退出系统</div>
          </div>

      </el-col>
    </el-row>
    <el-row name="subhead" type="flex" justify="center">
      <el-col class="subhead" :span="23">
        <div>&nbsp;&nbsp;&nbsp;&nbsp;今天：{{NowTime}}</div>
        <div class="subDiv">
          短信剩余: {{banlance}} 条&nbsp;&nbsp;&nbsp;&nbsp;
          用户余额：&nbsp;{{yueShow}}&nbsp;&nbsp;
          &nbsp;&nbsp;用户名：&nbsp;{{userShow}}
        </div>
      </el-col>
    </el-row>
  </div>
  <el-row type="flex" justify="center" style="height:100%;">
    <el-col :span="23">
    <!-- BIG -->
    <el-row type="flex" class="container">
      <el-col :span="3" >
        <!-- navigation 左边导航栏 default-active="1"   mode="vertical" -->
        <el-menu class="navigationClass">
          <el-menu-item
          v-for="(item, index) in navigationData"
          :key="item.name"
          :index="item.name"
          @click="navigationIndex(item.title, item.name)"
          v-if="leftnavTF[item.title]"
          >{{item.title}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-tabs
          v-model="editableTabsValue2" type="card"
          @tab-remove="removeTab" @tab-click="handleClick" class="CardTabs">
          <el-tab-pane
            :closable = "index>1"
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name">
          </el-tab-pane>
                  <!-- 显示 除了 subfield 第二个以为不是路由，其他路由跳转 -->
      <keep-alive >
        <router-view class="allCell" style="height:calc(100% - 42px);"
          :key="key" v-if="editableTabsValue2!='2'"    ></router-view>
      </keep-alive>
      <div style="height:100%;" v-if="subfield==='1'&editableTabsValue2==='2'">
        <Operation-management style="height:calc(100% - 42px);" :OperationManagement="OperationManagement" :OperationManagementTF="OperationManagementTF" @addTab="addTab"/>
      </div>
      <div style="height:100%;" v-if="subfield==='2'&editableTabsValue2==='2'">
        <!--运输管理  -->
        <PubBtn style="height:100%;" :PubBtnNum="Transportation"  @addTab="addTab"></PubBtn>
      </div>
      <div style="height:100%;" v-if="subfield==='3'&editableTabsValue2==='2'">
        <!--财务管理  -->
        <PubBtn style="height:100%;" :PubBtnNum="finance"  @addTab="addTab"></PubBtn>
      </div>

      <div style="height:100%;" v-if="subfield==='4'&editableTabsValue2==='2'">
        <!--客服管理  -->
        <PubBtn style="height:100%;" :PubBtnNum="Customservice"  @addTab="addTab"></PubBtn>
      </div>

      <div style="height:100%;" v-if="subfield==='5'&editableTabsValue2==='2'">
        <!--报表分析  -->
        <RF style="height:100%;" :PubBtnNum="reportForms"  @addTab="addTab"></RF>
      </div>

      <div style="height:100%;" v-if="subfield==='6'&editableTabsValue2==='2'">
        <PubBtn style="height:100%;" :PubBtnNum="basicSetting"  @addTab="addTab"></PubBtn>
      </div>

    </el-tabs>
  </el-col>
</el-row>

      <!-- /BIG -->

    </el-col>
  </el-row>
  <el-row  type="flex" justify="center" >
    <el-col :span="23" class="copyright">&copy; 河北优道科技有限公司版权所有 <span style="font-size:8px">冀ICP备12006906号-2</span></el-col>
  </el-row>
</div>
</template>

<script>
  import * as types from '../store/mutation-types.js'
  import store from '../store/store.js'
  import router from '../router/index.js'
  import {IndexShow} from '../api/leftnav.js'
  import {BasesetShow} from '../api/jichushezhi/jichushezhi.js'
  import {cominfologinshow, payamount} from '../api/top.js'
  import {loginloginout} from '../api/topout.js'
  import { MespayMesnum } from '../api/jichushezhi/duanxinshezhi.js'
  import {BasesetOperateMenuShow} from '../api/yunyingguanli/yunyingguanli'
  import {BasesetTtransportMenuShow} from '../api/yunshuguanli/yunshuguanli'
  import {BasesetFinanceMenuShow} from '../api/caiwuguanli/caiwuguanli'
  import {BasesetCustomserviceMenuShow} from '../api/kefuguanli/kefuguanli'
  import {BasesetReportMenuShow} from '../api/baobiaofenxi/baobiaofenxi.js'

  import OperationManagement from '../components/yunyingguanli/listshow1.vue'
  import PubBtn from '../components/yunyingguanli/listshow.vue'
  import RF from '../components/listshowS.vue'
  import { LoginAaa } from '../../src/api/jichushezhi/wangdianshezhi.js'

  export default {
    components: {
      OperationManagement,
      PubBtn,
      RF
    },
    computed: {
      linkage () {
        return this.$store.state.linkage
      },
      banlance () {
        return store.state.banlance
      },
      yueShow () {
        return store.state.yueShow
      },
      key () {
        return (this.$route.name !== undefined) ? (this.$route.name + +new Date()) : this.$route + +new Date()
      }
    },
    data () {
      return {
        userShow: '',
        subfield: 0,
        editableTabsValue2: '0',
        editableTabs: [{
          title: '首页',
          name: '0',
          content: '/index/shoye'
        }],
        tabIndex: 2,
        navigationData: [
          {title: '运营管理', name: '1'},
          {title: '运输管理', name: '2'},
          {title: '财务管理', name: '3'},
          {title: '客服管理', name: '4'},
          {title: '报表分析', name: '5'},
          {title: '基础设置', name: '6'}
        ],
        // 基础设置数据
        basicSetting: [],
        // 基础设置权限数据
        basicSettingTF: {},
        // 运营管理数据-------
        OperationManagement: [],
        // 运营管理权限数据
        OperationManagementTF: {},
        // 运输管理数据-------
        Transportation: [],
        // 运输管理权限
        TransportationTF: {},
        // 财务管理
        finance: [],
        // 财务管理权限
        financeTF: {
        },
        // 客服管理
        Customservice: [],
        // 客服管理权限
        CustomserviceTF: {},
        // 报表中心
        reportForms: [],
        // 报表中心权限
        reportFormsTF: [],
        TF: false,
        NowTime: (new Date()).toLocaleDateString(),
        leftnavTF: {}
      }
    },
    created () {
      this.firstShow()
      this.one()
      this.two()
    },
    methods: {
      async firstShow () {
        let la = await LoginAaa()
        if (!la.data.status) {
          let aa = []
          for (let i in la.data.result[0]) {
            if (la.data.result[0][i].cidx) {
              this.linkage[i] = {label: la.data.result[0][i].fullname, value: la.data.result[0][i].fullname, children: []}
              aa.push(la.data.result[1].slice(la.data.result[0][i].cidx[0], la.data.result[0][i].cidx[1]))
            }
          }
          for (let a in aa) {
            for (let b in aa[a]) {
              if (aa[a][b].cidx) {
                this.linkage[a].children[b] = {label: aa[a][b].fullname, value: aa[a][b].fullname, children: []}
                for (let z = aa[a][b].cidx[0]; z <= aa[a][b].cidx[1]; z++) {
                  this.linkage[a].children[b].children.push({label: la.data.result[2][z].fullname, value: la.data.result[2][z].fullname})
                }
              } else {
                this.linkage[a].children[b] = {label: aa[a][b].fullname, value: aa[a][b].fullname}
              }
            }
          }
        }
      },
      back () {
        this.editableTabsValue2 = 0 + ''
        router.push('/index/shoye')
      },
      out () {
        let data = {
          token: store.state.token
        }
        loginloginout(data).then((response) => {
          store.commit(types.LOGOUT)
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}
          })
        })
      },
      async one () {
        // 获取左边栏权限
        let indexRes = await IndexShow()
        if (indexRes.data.info.length) {
          for (let ir in indexRes.data.info) {
            this.$set(this.leftnavTF, indexRes.data.info[ir].Authority_FirstMenu, parseInt(indexRes.data.info[ir].Authority_IsFlag))
            // this.leftnavTF[indexRes.data.info[ir].Authority_FirstMenu] = indexRes.data.info[ir].Authority_IsFlag
          }
        } else {
          this.$message({
            showClose: true,
            message: '请联系管理员为你分派角色',
            type: 'info'
          })
        }
        // 获取基础设置的8个图标的权限
        let basesetSheRes = await BasesetShow()
        for (let bsr in basesetSheRes.data.info) {
          this.$set(this.basicSettingTF, basesetSheRes.data.info[bsr].Authority_TwoMenu, basesetSheRes.data.info[bsr].Authority_IsFlag)
          // this.basicSettingTF[basesetSheRes.data.info[bsr].Authority_TwoMenu] = basesetSheRes.data.info[bsr].Authority_IsFlag
        }
        // 获取运营管理的图标展示
        let basesetYunRes = await BasesetOperateMenuShow()
        // console.log(basesetYunRes)
        for (let byr in basesetYunRes.data.info) {
          this.$set(this.OperationManagementTF, basesetYunRes.data.info[byr].Authority_ThreeMenu, basesetYunRes.data.info[byr].Authority_IsFlag)
          // this.OperationManagementTF[basesetYunRes.data.info[byr].Authority_ThreeMenu] = basesetYunRes.data.info[byr].Authority_IsFlag
        }
        // 获取运输管理图表展示
        let basesetYunshuRes = await BasesetTtransportMenuShow()
        for (let bys in basesetYunshuRes.data.info) {
          this.$set(this.TransportationTF, basesetYunshuRes.data.info[bys].Authority_TwoMenu, basesetYunshuRes.data.info[bys].Authority_IsFlag)
          // this.TransportationTF[basesetYunshuRes.data.info[bys].Authority_TwoMenu] = basesetYunshuRes.data.info[bys].Authority_IsFlag
        }
        // 获取财务管理图表展示
        let BasesetFinanceRes = await BasesetFinanceMenuShow()
        // console.log(123, BasesetFinanceRes)
        // this.financeTF['货款审核'] = '1'
        for (let bfr in BasesetFinanceRes.data.info) {
          this.$set(this.financeTF, BasesetFinanceRes.data.info[bfr].Authority_TwoMenu, BasesetFinanceRes.data.info[bfr].Authority_IsFlag)
        }
        // 获取客服管理图标展示
        let CustomserviceRes = await BasesetCustomserviceMenuShow()
        for (let cr in CustomserviceRes.data.info) {
          this.$set(this.CustomserviceTF, CustomserviceRes.data.info[cr].Authority_TwoMenu, CustomserviceRes.data.info[cr].Authority_IsFlag)
          // this.CustomserviceTF[CustomserviceRes.data.info[cr].Authority_TwoMenu] = CustomserviceRes.data.info[cr].Authority_IsFlag
        }
        // 获取客服管理图标展示
        let reportForms = await BasesetReportMenuShow()
        for (let rf in reportForms.data.info) {
          this.$set(this.reportFormsTF, reportForms.data.info[rf].Authority_TwoMenu, reportForms.data.info[rf].Authority_IsFlag)
          // this.reportFormsTF[reportForms.data.info[rf].Authority_TwoMenu] = reportForms.data.info[rf].Authority_IsFlag
        }
        router.push('/index/shoye')
        let allR = router.options.routes[1]
        this.OperationManagement = allR.children[1].children
        // console.log(1, this.OperationManagement)
        this.Transportation = allR.children[2].children
        this.finance = allR.children[3].children
        this.Customservice = allR.children[4].children
        this.reportForms = allR.children[5].children
        this.basicSetting = allR.children[6].children
        // for (let ccc in this.reportForms) {
        //   this.reportFormsTF[this.reportForms[ccc].name] = 1
        // }
      },
      async two () {
        // 获取用户名
        let cominfologinRes = await cominfologinshow()
        if (cominfologinRes.data.result === '4') {
          this.$message({
            showClose: true,
            message: cominfologinRes.data.info + ',请重新登录',
            type: 'info'
          })
        } else {
          this.userShow = cominfologinRes.data.ULUser_Loname
        }
        // 获取余额
        let payamountRes = await payamount()
        store.state.yueShow = payamountRes.data.ULUser_ResidualAmount
        // 获取短信条数
        let MespayMesnumRes = await MespayMesnum()
        store.state.banlance = MespayMesnumRes.data.info.Logis_MesNum
        if (MespayMesnumRes.data.info.Logis_MesNum === '' | MespayMesnumRes.data.info.Logis_MesNum === null) {
          store.state.banlance = 0
        }
      },
      navigationIndex (title, name) {
        this.subfield = name
        let newTabName = 2 + ''
        if (!this.editableTabs[1]) {
          this.editableTabs.push({
            title: String(title),
            name: newTabName
          })
        } else {
          this.editableTabs[1] = {}
          this.editableTabs[1] = {
            title: String(title),
            name: newTabName
          }
        }
        this.editableTabsValue2 = newTabName
      },
      handleClick (tab) {
        if (this.editableTabsValue2 !== '2') {
          router.push(this.editableTabs[tab.index].content)
        }
        router.push(this.$route.path)
      },
      addTab (item, index) {
        if (this.basicSettingTF[item.name] | this.OperationManagementTF[item.name] | this.TransportationTF[item.name] | this.financeTF[item.name] | this.CustomserviceTF[item.name] | this.reportFormsTF[item.name]) {
          for (let i in this.editableTabs) {
            this.TF = false
            if (this.editableTabs[i].title.indexOf(item.name) === -1) {
              this.TF = true
            } else {
              this.editableTabsValue2 = this.editableTabs[i].name
              router.push(item.path)
              return
            }
          }
          if (this.TF === true) {
            let newTabName = ++this.tabIndex + ''
            this.editableTabs.push({
              title: item.name,
              name: newTabName,
              content: item.path
            })
            this.editableTabsValue2 = newTabName
            router.push(item.path)
          }
          router.push(this.$route.path)
        } else {
          this.$message({
            showClose: true,
            message: '你无权访问',
            type: 'info'
          })
        }
      },
      removeTab (targetName) {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue2
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                // router.push(nextTab.content)
                if (nextTab.content) {
                  router.push(nextTab.content)
                }
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue2 = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    }
  }
</script>
<style>

.allCase {
  width:100%;
  height: 100%;
  background: #373c64;
  display: flex;
  flex-direction: column;
}
/* hair */
.hair {
  background: url(../assets/shouye/顶部底框.png);
  background-size: cover;
}
.hair .head {
  height: 90px;
  display: flex;
  justify-content: space-between
}
.hair .head img {
  height: 100%;
  padding: 15px;

}
.hair .divItem {
  min-width: 560px;
  background:url(../assets/shouye/顶部右侧底框.png) no-repeat;
  display: flex;
  height: 50px;
  color: white;
  font-size:14px;
  justify-content: center
}
.hair .divItem div {
  align-self: center;
}
.hair .divItem img {
  margin-top:-3px;
  margin-right:-8px;
  vertical-align: middle;
}
                /* subHead */
.hair .subhead {
  height: 40px;
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 12px 12px 0px 0px;
}
.hair .subhead div{
  align-self: center;
}
.hair .subhead .subDiv {
  width: 430px;
  display: flex;
  justify-content: space-between;
}
/* /hair */
/* container */
.container {
  height:100%;
}
.copyright {
  color:white;
  padding-top: 15px;
  padding-bottom: 30px;
  font-size: 16px;
}
.navigationClass{
  font-size: 16px;
   height: 100%;
  border-top: 10px solid #373c64;
}
.CardTabs{
   background: white;
  height: 100%;
  border-top: 10px solid;
  border-left: 10px solid;
  border-color: #373c64;
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  background:#fff;
  color: #58B7FF
}
.el-tabs--card>.el-tabs__header{
  background:#373c64;
}
.el-menu {
  background: #d0d5f5;
}
.el-menu-item {
  background: #373c64;
  color: white;
  border-bottom: 2px  solid #d0d5f5;
}
.el-tabs__item {
  color:white;
}
.el-tabs__item:hover {
  color:white
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
  /*color: #373c64;*/
  background: white;
}
.el-tabs__content {
  height:100%;
}
.el-tabs__header {
  margin-bottom:0px
}
/* /container */


</style>

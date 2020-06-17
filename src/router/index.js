import Vue from 'vue'
import Router from 'vue-router'

import login from '../main/login.vue'

import main from '../main/main.vue'
import homepage from '../pages/homepage.vue'
import settingUser from '../pages/settingUser.vue'
import settingPartner from '../pages/settingPartner.vue'
import editPwd from '../pages/editPwd.vue'
import settingFactory from '../pages/settingFactory.vue'
import settingStorage from '../pages/settingStorage.vue'
import settingProduction from '../pages/settingProduction.vue'
import settingWork from '../pages/settingWork.vue'
import settingWorkshop from '../pages/settingWorkshop.vue'
import settingDealer from '../pages/settingDealer.vue'
import settingAdd from '../pages/settingAdd.vue'
import settingPacking from '../pages/settingPacking.vue'
import settingProduct from '../pages/settingProduct.vue'
import systemLog from '../pages/systemLog.vue'
import unusualLog from '../pages/unusualLog.vue'
import enterpriseFwQuery from '../pages/enterpriseFwQuery.vue'
import antiFakeTotalStatics from '../pages/antiFakeTotalStatics.vue'
import fwtj from '../pages/fwtj.vue'
import antiFakeSingleStatics from '../pages/antiFakeSingleStatics.vue'
import antiFakeUnNomalStatics from '../pages/antiFakeUnNomalStatics.vue'
import outListQry from '../pages/outListQry.vue'
import outListQryStatistics from '../pages/outListQryStatistics.vue'
import outStoreSeqCode from '../pages/outStoreSeqCode.vue'
import billHandleList from '../pages/billHandleList.vue'
import codeRelationQuery from '../pages/codeRelationQuery.vue'
import singCodeTrace from '../pages/singCodeTrace.vue'
import scurryGoodsQry from '../pages/scurryGoodsQry.vue'
import scurryGoodsTJ from '../pages/scurryGoodsTJ.vue'
import frmscurryop from '../pages/frmscurryop.vue'
import scurryMng from '../pages/scurryMng.vue'

Vue.use(Router)

export default new Router({
  routes: [ {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      name: 'main',
      path: 'main',
      component: main,
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          component: homepage
        },{
          path: 'settingUser',
          name: 'settingUser',
          component: settingUser
        },{
          path: 'settingPartner',
          name: 'settingPartner',
          component: settingPartner
        },{
          path: 'editPwd',
          name: 'editPwd',
          component: editPwd
        },{
          path: 'settingFactory',
          name: 'settingFactory',
          component: settingFactory
        },{
          path: 'settingStorage',
          name: 'settingStorage',
          component: settingStorage
        },{
          path: 'settingProduction',
          name: 'settingProduction',
          component: settingProduction
        },{
          path: 'settingWork',
          name: 'settingWork',
          component: settingWork
        },{
          path: 'settingWorkshop',
          name: 'settingWorkshop',
          component: settingWorkshop
        },{
          path: 'settingDealer',
          name: 'settingDealer',
          component: settingDealer
        },{
          path: 'settingAdd',
          name: 'settingAdd',
          component: settingAdd
        },{
          path: 'settingPacking',
          name: 'settingPacking',
          component: settingPacking
        },{
          path: 'settingProduct',
          name: 'settingProduct',
          component: settingProduct
        },{
          path: 'systemLog',
          name: 'systemLog',
          component: systemLog
        },{
          path: 'unusualLog',
          name: 'unusualLog',
          component: unusualLog
        },
        {
          path: 'enterpriseFwQuery',
          name: 'enterpriseFwQuery',
          component: enterpriseFwQuery
        },{
          path: 'antiFakeTotalStatics',
          name: 'antiFakeTotalStatics',
          component: antiFakeTotalStatics
        },{
          path: 'fwtj',
          name: 'fwtj',
          component: fwtj
        },{
          path: 'antiFakeSingleStatics',
          name: 'antiFakeSingleStatics',
          component: antiFakeSingleStatics
        },{
          path: 'antiFakeUnNomalStatics',
          name: 'antiFakeUnNomalStatics',
          component: antiFakeUnNomalStatics
        },{
          path: 'outListQry',
          name: 'outListQry',
          component: outListQry
        },{
          path: 'outListQryStatistics',
          name: 'outListQryStatistics',
          component: outListQryStatistics
        },{
          path: 'outStoreSeqCode',
          name: 'outStoreSeqCode',
          component: outStoreSeqCode
        },{
          path: 'billHandleList',
          name: 'billHandleList',
          component: billHandleList
        },{
          path: 'codeRelationQuery',
          name: 'codeRelationQuery',
          component: codeRelationQuery
        },{
          path: 'singCodeTrace',
          name: 'singCodeTrace',
          component: singCodeTrace
        },{
          path: 'scurryGoodsQry',
          name: 'scurryGoodsQry',
          component: scurryGoodsQry
        },{
          path: 'scurryGoodsTJ',
          name: 'scurryGoodsTJ',
          component: scurryGoodsTJ
        },{
          path: 'frmscurryop',
          name: 'frmscurryop',
          component: frmscurryop
        },{
          path: 'scurryMng',
          name: 'scurryMng',
          component: scurryMng
        },
      ]
    }
  ]
})

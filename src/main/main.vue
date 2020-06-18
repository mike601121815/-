<template>
  <el-container style="height:100%;">
    <el-header>
    <img src="../assets/ppasslogo.gif"/>
    <div>
      <i class="el-icon-user"></i>
      <span>{{user.username}}</span>
      <i class="el-icon-house"></i>
      <span>首页</span>
      <i class="el-icon-question"></i>
      <span>帮助</span>
      <i class="el-icon-circle-close"></i>
      <span>退出</span>
    </div>
    </el-header>
    <el-container>
      <el-aside width=none>
        <div width=100%>
          <el-button id="menu-vertical"
          :icon="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'" 
          @click="openClose()"></el-button>
        </div>
        
        <div width=100%>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ffffff"
          
          :collapse="isCollapse"
          >
          <el-submenu v-for="(item, index) in menuList" :key="index" :index="index + ''">
            <template slot="title">
              <i  :class="item.iconPT"></i>
              <span onselectstart="return false">{{item.listName}}</span>
            </template>
            <el-menu-item onselectstart="return false" style="padding-left: 60px" v-for="(child, index_) in item.children" @click="menuClick(child,item)" :key="index_" :index="index + '-' + index_">{{child.listName}}</el-menu-item>
            <!-- <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
        </el-menu>
        </div>
      </el-aside>
      <el-main >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'homepage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" ref="menu_1">{{item.listName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      user:{
        username: '',
        usercode:'',
        cid: '',
      },
      isCollapse: true,
      breadcrumb: [],
      menuList: [
        {
          listName: '用户管理',
          iconPT:'el-icon-user-solid',
          children: [
            {
              listName: '用户设置',
              routeName: 'settingUser',
            },
            {
              listName: '角色设置',
              routeName: 'settingPartner',
            },{
              listName: '密码修改',
              routeName: 'editPwd',
            }
          ]
        },
        {
          listName: '信息设置',
          iconPT:'el-icon-s-tools',
          children: [
            {
              listName: '工厂设置',
              routeName: 'settingFactory',
            },
            {
              listName: '库房设置',
              routeName: 'settingStorage',
            },{
              listName: '生产线设置',
              routeName: 'settingProduction',
            },
            {
              listName: '班组设置',
              routeName: 'settingWork',
            },
            {
              listName: '车间设置',
              routeName: 'settingWorkshop',
            },
            {
              listName: '经销商设置',
              routeName: 'settingDealer',
            },{
              listName: '经销批量新增',
              routeName: 'settingAdd',
            },
            {
              listName: '包装比例设置',
              routeName: 'settingPacking',
            },{
              listName: '产品设置',
              routeName: 'settingProduct',
            }
          ]
        },
        {
          listName: '日志管理',
          iconPT:'el-icon-document',
          children: [
            {
              listName: '系统日志',
              routeName: 'systemLog',
            },
            {
              listName: '异常日志',
              routeName: 'unusualLog',
            },
          ]
        },
        {
          listName: '防伪管理',
          iconPT:'el-icon-star-on',
          children: [
            {
              listName: '企业防伪查询测试',
              routeName: 'enterpriseFwQuery',
            },
            {
              listName: '原始清单查询',
              routeName: 'antiFakeTotalStatics',
            },
            {
              listName: '重复查询情况汇总',
              routeName: 'fwtj',
            },
            {
              listName: '单码查询情况汇总',
              routeName: 'antiFakeSingleStatics',
            },
            {
              listName: '无经销商产品查询',
              routeName: 'antiFakeUnNomalStatics',
            },
          ]
        },{
          listName: '库房物流管理',
          iconPT:'el-icon-truck',
          children: [
            {
              listName: '出库单查询',
              routeName: 'outListQry',
            },
            {
              listName: '出库单统计',
              routeName: 'outListQryStatistics',
            },
            {
              listName: '顺序码出库',
              routeName: 'outStoreSeqCode',
            },
            {
              listName: '顺序码单据处理查询',
              routeName: 'billHandleList',
            },
          ]
        },{
          listName: '数码信息查询',
          iconPT:'el-icon-coin',
          children: [
            {
              listName: '数码关系查询',
              routeName: 'codeRelationQuery',
            },
            {
              listName: '数码详细查询',
              routeName: 'singCodeTrace',
            }
          ]
        },{
          listName: '窜货信息查询',
          iconPT:'el-icon-guide',
          children: [
            {
              listName: '窜货查询',
              routeName: 'scurryGoodsQry',
            },
            {
              listName: '窜货统计',
              routeName: 'scurryGoodsTJ',
            },{
              listName: '稽查员管理',
              routeName: 'frmscurryop',
            },{
              listName: '稽查员工作查询',
              routeName: 'scurryMng',
            }
          ]
        }
      ]
    }
  },
  watch:{
            isCollapse(bool){
                if(bool){
                  //("#menu-vertical").icon="el-icon-s-unfold";
                }else{
                  //("#menu-vertical").icon="el-icon-s-fold";
                }
            }
    },
    mounted(){
      let breadcrumb = JSON.parse(sessionStorage.getItem('breadcrumb'))
      this.breadcrumb = breadcrumb
    },
  methods: {
    menuClick(data,data2){
      this.$router.push({name: data.routeName})
      let breadcrumb = []
      breadcrumb.push({listName: data2.listName,routeName: data2.listName},{listName: data.listName,routeName: data.routeName})
      sessionStorage.setItem('breadcrumb',JSON.stringify(breadcrumb))
      this.breadcrumb = breadcrumb
      
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openClose(){
      this.isCollapse=!this.isCollapse;
    }
  },
  mounted: function () { 
    var user = JSON.parse(sessionStorage.getItem('user'));
    this.user.name=user.username;   
    }
}
</script>

<style scoped>
  .el-header{
    padding:0;
    background:url(../assets/top_bg.png)
  }
   .el-header img{
    width:219px;
    height:44px;
    margin:6px 0 0 13px;
  }
  .el-header div{
    margin:0 13px 0 0;
    float:right;
    font-size:16px;
    text-align: center;
    line-height:30px;
  }
  .el-header div i{
    width:30px;
    height:30px;
    margin:20px 0;
    
  }
  .el-header div lable{
    width:30px;
    height:30px;
    font-size:15px;
  }
  .el-button{
    border:0px;
    font-size:25px;
  }
  .el-button:focus{
    background-color:#ffffff;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 210px;
    min-height: 90px;
  }
  .el-menu{
    width:70px;  
    height:calc(100vh - 120px);
    border-right: solid 0px;
    overflow-y: auto;
   
  }

  .el-submenu .el-menu-item {
    min-width:0px;
    padding-left: 50px;
  }
  .el-breadcrumb{
    margin:20px 0 0 0;
  }
  .el-main{
    background:url(../assets/index_bg.png)no-repeat right bottom;
    height:690px;
  }

::-webkit-scrollbar {
width: 5px;
height: 10px;
}
::-webkit-scrollbar-track-piece {
background-color: rgba(0, 0, 0, 0.2);
-webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
height: 5px;
background-color: rgba(125, 125, 125, 0.7);
-webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
width: 5px;
background-color: rgba(125, 125, 125, 0.7);
-webkit-border-radius: 6px;
}
</style>
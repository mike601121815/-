<template>
  <el-container style="height:100%;">
    <el-header>
    <img src="../assets/STlogo.png"/>
    <div>
      <i class="el-icon-user"></i>
      <span>{{user.username}}</span>
      <i class="el-icon-house"></i>
      <span>首页</span>
      <i class="el-icon-question"></i>
      <span>帮助</span>
      <i class="el-icon-circle-close"></i>
      <el-link href="" @click="exit" type="danger">退出</el-link>
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
              <i  :class="item.IconPT"></i>
              <span onselectstart="return false">{{item.ModuleName}}</span>
            </template>
            <el-menu-item onselectstart="return false" style="padding-left: 60px" v-for="(child, index_) in item.Child" @click="menuClick(child,item)" :key="index_" :index="index + '-' + index_">{{child.ModuleName}}</el-menu-item>           
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
      menuList: []
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
      this.$router.push({name: data.RouteName})
      let breadcrumb = []
      breadcrumb.push({listName: data2.ModuleName,routeName: data2.ModuleName},{listName: data.ModuleName,routeName: data.RouteName})
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
    },
    exit(){
      sessionStorage.clear()
    },
    getModules(usercode){
      this.$axios({
        method: 'post',
        url:'/FW/RoleAssign.ashx',
        params: {
          action:"GetPageModuleTable",
          UserId:usercode
        }
        }).then(res=>{
          console.log(res);
          if(res.Code==0){
            this.menuList=res.Data;
          }else if(res=="1"){
          
          }else if(res=="2"){
          
          }       
      })
    }
  },
  mounted: function () { 
    var user = JSON.parse(sessionStorage.getItem('user'));
    this.user.username=user.Username;  
    this.getModules(user.Usercode); 
    }
}
</script>

<style scoped>
  .el-header{
    padding:0;
    background:url(../assets/top_bg.png)
  }
   .el-header img{
    height:40px;
    margin:10px 0 0 15px;
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
    background:url(../assets/mainBG.png)no-repeat left bottom;
    background-size: 100%,auto;
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
<style>
.el-table th.gutter{    
    display: table-cell !important;
}
.el-dialog__body {
    padding: 10px 20px;;
}
</style>
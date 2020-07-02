<template>
  <div class="content">
    <div class="rolePower">
      <div class="container">
        <div class="title">角色管理</div>
        <div class="tableContent">
          <div class="list" v-for="(item ,index) in list" :key="item.RoleId" @click="userClick(index,item.RoleId)">
            <div class="anniu"></div>
            <div class="name" :class="{active: selectIndex === index}">{{item.RoleName}}</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="title">权限管理</div>
        <div class="tableContent">
          <el-tree
            :data="data"
            show-checkbox
            node-key="Id"
            :default-checked-keys="checkeds"
            default-expand-all ref="tree"
            :props="defaultProps"
          ></el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: -1,
      list: [],
      data: [],
      expandeds:[],
      checkeds:[],
      defaultProps: {
        children: "Child",
        label: "Lable"
      }
    };
  },
  mounted(){
      //初始化获取角色
      this.$axios({
        method: 'post',
        url:'/FW/RoleAssign.ashx',
        params: {}
      })
      .then(res=>{
        console.log(res);
        if(res.Code==0){
          this.list=res.Data.RolesList;
          this.data=res.Data.ModulesList;
        }else if(res=="1"){
          
        }else if(res=="2"){
          
        }       
      })
    },
  methods: {
    userClick(index,roleId) {
      this.selectIndex = index;
      
      //请求权限功能
      this.$axios({
        method: 'post',
        url:'/FW/Permission.ashx',
        params: {RoleId:roleId}
      })
      .then(res=>{
        console.log(res);
        if(res.Code==0){
          this.$refs.tree.setCheckedKeys(res.Data);
        }else if(res=="1"){
          
        }else if(res=="2"){
          
        }       
      })


    }
  }
};
</script>

<style scoped>
.content{
  height: calc(100vh - 140px);
}
.rolePower {
      margin: 20px 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.container {
  width: 49%;
  height: 100%;
  border: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.title {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #eff2f6;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #807f83;
}
.tableContent {
  padding: 20px;
}
.list {
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list .anniu {
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background: #1a91ff;
  opacity: 0.6;
  margin-right: 20px;
}
.list .name {
  flex: 1;
  height: 100%;
  cursor: pointer;
  text-indent: 20px;
}
.list .active {
  background: gray;
  color: #fff;
  text-indent: 20px;
}
</style>
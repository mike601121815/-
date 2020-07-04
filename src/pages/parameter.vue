<template>
  <div class="content">
    <div class="rolePower">
      <div class="container">
        <div class="title">角色管理</div>
        <div class="tableContent">
          <div class="btnlist">
            <el-button type="primary" @click="dialogVisible = true;title = '新增用户'">新增</el-button>
            <el-button type="primary" @click="dialogVisible = true;title = '修改用户'">修改</el-button>
            <el-button type="primary">删除</el-button>
          </div>
          <div class="list" v-for="(item ,index) in list" :key="item.RoleId" @click="userClick(index,item.RoleId)">
            <div class="anniu"></div>
            <div class="name" :class="{active: selectIndex === index}">{{item.RoleName}}</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="title">权限管理</div>
        <div class="tableContent">
          <div class="btnlist">
            <el-button type="primary">新增</el-button>
            <el-button type="primary">修改</el-button>
            <el-button type="primary">删除</el-button>
          </div>
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
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1" >
        <el-form-item prop="username">
          <el-input placeholder="用户名称"  v-model="ruleForm1.username">
            <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="登录密码" show-password  v-model="ruleForm1.password">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm1:{
        username: '',
        password: ''
      },
      rules1:{
        username:[
          { required: true,  message: '请输入用户名', trigger: 'blur' }
        ],
        password:[
          { required: true,  message: '请输入密码', trigger: 'blur' }
        ],
      },
      dialogVisible: false,
      selectIndex: -1,
      list: [],
      data: [],
      expandeds:[],
      checkeds:[],
      defaultProps: {
        children: "Child",
        label: "Lable"
      },
      role:{
        RoleName:"",//角色名
        RoleType:"",
        Remark:"",//备注
        Creator:"",//创建人
        Modifier:"",
        ModifiedTime:"",
        CorpId:"",
        OrgPath:"",
        OrgPathName:""
      },
    };
  },
  mounted(){
      //初始化获取角色
      this.$axios({
        method: 'post',
        url:'/FW/RoleAssign.ashx',
        params: {
          action:"getRoles"
        }
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    userClick(index,roleId) {
      this.selectIndex = index;
      //请求权限功能
      this.$axios({
        method: 'post',
        url:'/FW/Permission.ashx',
        params: {
          action:"getModules",
          RoleId:roleId}
      })
      .then(res=>{
        console.log(res);
        if(res.Code==0){
          this.$refs.tree.setCheckedKeys(res.Data);
        }else if(res=="1"){
          
        }else if(res=="2"){
          
        }       
      })
    },

    addRole(){

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
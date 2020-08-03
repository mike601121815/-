<template>
  <div class="content">
    <div class="rolePower">
      <div class="container">
        <div class="title">角色管理</div>
        <div class="btnlist">
            <el-button type="primary" @click="add">新增</el-button>
            <el-button type="primary" @click="edit">修改</el-button>
            <el-button type="primary" @click="delRole">删除</el-button>
          </div>
        <div class="tableContent">
          <div class="list" v-for="(item ,index) in list" :key="item.RoleId" @click="userClick(index,item.RoleId)">
            <div class="anniu"></div>
            <div class="name" :class="{active: selectIndex === index}">{{item.RoleName}}</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="title">权限管理</div>
        <div class="btnlist">
            <el-button type="primary" @click="esec">设置确认</el-button>
          </div>
        <div class="tableContent">
          <el-tree
            :data="data"
            show-checkbox
            node-key="ModuleId"
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
      width="340px"
      >
      <el-form ref="ruleForm1" :model="role" :rules="rules1" >
        <el-form-item prop="RoleName">
          <el-input placeholder="角色名称" prefix-icon="el-icon-s-custom"  v-model="role.RoleName">
            <template slot="prepend">角色名称</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input :disabled="true" prefix-icon="el-icon-edit-outline" v-model="role.Creator">
            <template slot="prepend">创建用户</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input :disabled="true" prefix-icon="el-icon-office-building" v-model="role.CorpId">
            <template slot="prepend">企业编号</template>
          </el-input>
        </el-form-item>
        <el-form-item >
          <span style="margin: 0 20px;">状态</span>
          <el-radio v-model="role.RoleType" label="1">启用</el-radio>
          <el-radio v-model="role.RoleType" label="0">停用</el-radio>
        </el-form-item>
        <el-form-item >
          <el-input type="textarea" placeholder="角色备注" v-model="role.Remark"> 
            <template slot="prepend">角色名称</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      user:{},
      rules1:{
        RoleName:[
          { required: true,  message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      selectIndex: -1,
      list: [],
      data: [],
      expandeds:[],
      checkeds:[],
      defaultProps: {
        children: "Child",
        label: "ModuleName"
      },
      title:"",
      dialogtype:0,
      role:{
        RoleId:0,
        RoleName:"",//角色名
        RoleType:"",
        Remark:"",//备注
        Creator:"",//创建人
        Modifier:"",
        //ModifiedTime:"",
        CorpId:"",//企业ID
        OrgPath:"",
        OrgPathName:"",
        selectData: null
      },
    };
  },
  mounted(){
    var user = JSON.parse(sessionStorage.getItem('user'));
    this.user=user;
    this.getRoles();
    this.getModules();
    },
  methods: {
    esec(){
      //判断是否选中角色
      if(this.selectIndex!=-1){
        let data = this.$refs['tree'].getCheckedNodes()
        data = data.filter(item=>{
          if(!item.Child){
            return item.Id
          }
        })
        data = data.map(item=>{
          if(!item.Child){
            return item.Id
          }
        })
        //发送权限列表
        this.$axios({
        method: 'post',
        url:'/FW/Permission.ashx',
        params: {
          action:"setRoles_Moudles",
          RoleId:this.selectData.RoleId,
          Moudles:data.join(';')
        }
        }).then(res=>{
          if(res.Code==0){
            
          }else{
            this.$message({
            showClose: true,
            message:res.Msg,
            type: 'warning'
            });
          }       
      })


      }else{
        this.$message({
            showClose: true,
            message:"请先选择角色",
            type: 'warning'
            });
      }
    },

    add(){
      this.dialogVisible = true;
      this.dialogtype=1;
      this.title = '新增角色';
      this.role.Creator = this.user.Username;
      this.role.CorpId = this.user.QyNum
      this.$nextTick(()=>{
        this.$refs['ruleForm1'].resetFields();
      })
    },
    edit(){
      this.dialogVisible = true;
      this.dialogtype = 2;
      this.title = '修改角色';
      this.role.Creator = this.selectData.Creator;
      this.role.RoleId = this.selectData.RoleId
      this.role.CorpId = this.selectData.CorpId
      this.role.RoleName = this.selectData.RoleName
      this.role.RoleType = String(this.selectData.RoleType)
    },
    userClick(index,roleId) {
      this.selectData = this.list[index]
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
        }else{
          this.$message({
            showClose: true,
            message:res.Msg,
            type: 'warning'
            });
        }       
      })
    },
    getRoles(){
      //初始化获取角色
      this.$axios({
        method: 'post',
        url:'/FW/RoleAssign.ashx',
        params: {
          action:"getRoles"
        }
      })
      .then(res=>{
        if(res.Code==0){
          this.list=res.Data;
        }else{
          this.$message({
            showClose: true,
            message:res.Msg,
            type: 'warning'
            });
        }      
      })
    },

    setRole(){
      if (this.dialogtype==1){
        this.addRole();
      }else if(this.dialogtype==2){
        this.updataRole();
      }
    },

    addRole(){
      this.dialogVisible = false;
      //添加角色
      this.$axios({
        method: 'post',
        url:'/FW/RoleAssign.ashx',
        params: {
          action:"addRole",
          role:this.role}
      })
      .then(res=>{
        if(res.Code==0){
          this.$message({
            showClose: true,
            message:res.Msg,
            type: 'success'
            });
            this.getRoles();
            this.selectIndex =0;
        }else{
            this.$message({
            showClose: true,
            message:res.Msg,
            type: 'warning'
            });
        }      
      })
    },

    updataRole(){
      this.dialogVisible = false;
      //修改角色
      this.$axios({
        method: 'post',
        url:'/FW/RoleAssign.ashx',
        params: {
          action:"updataRole",
          role:this.role}
      })
      .then(res=>{
        if(res.Code==0){
          this.$message({
            showClose: true,
            message:res.Msg,
            type: 'success'
            });
            this.getRoles();
            this.selectIndex =0;
        }else{
            this.$message({
            showClose: true,
            message:res.Msg,
            type: 'warning'
            });
        }      
      })
    },

    delRole(){
      //删除角色
      this.$axios({
        method: 'post',
        url:'/FW/RoleAssign.ashx',
        params: {
          action:"delRole",
          roleId:this.selectData.RoleId}
      })
      .then(res=>{
        console.log(res);
        if(res.Code==0){
          this.$message({
            showClose: true,
            message:res.Msg,
            type: 'success'
            });
            this.getRoles();
        }else{
            this.$message({
            showClose: true,
            message:res.Msg,
            type: 'warning'
            });
        }  
      })
      this.selectIndex =0;
    },

    getModules(){
      //初始化获取角色
      this.$axios({
        method: 'post',
        url:'/FW/RoleAssign.ashx',
        params: {
          action:"getModules"
        }
      })
      .then(res=>{
        console.log(res);
        if(res.Code==0){
          this.data=res.Data;
        }else{
          this.$message({
            showClose: true,
            message:res.Msg,
            type: 'warning'
            });
        }      
      })
    },
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
.btnlist{
  border:1px solid #ebeef5;
  padding: 10px;
}
</style>

<style>
.el-dialog__body{
  padding: 0px 20px;
}
.el-input__icon{
  width: auto;
  line-height: 42px;
}

.el-form-item__content {
    line-height: 0px; 
}
</style>
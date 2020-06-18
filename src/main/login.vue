<template>
<<<<<<< HEAD
  <el-container style="height:100%; display:block">
    <div class="head">
      <img src="../assets/STlogo.png" style="width:200px;float:left;margin-bottom:50px"/>
    </div>
    <div style="background: rgb(43, 133, 228)">
      <el-row>
        <el-col class="left" :span="12" >
          
        </el-col>
        <el-col class="right" :span="12">
          <div style="background: white;width: 400px;height: 360px;margin-left: 30%;">
            <span style="font-size:20px;margin: 0px 20px;height: 50px;line-height: 60px;">企业用户登录</span>
            <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1" >
=======
  <el-container >
    <div class="view">
      <div class="head" style="font-size:20px;margin-bottom:20px">
        企业一码通数据服务平台
      </div>
      <div>
        <el-tabs type="border-card" v-model="activeName" :stretch="false">
          <el-tab-pane name="1">
            <span class="title" slot="label"><i class="el-icon-shopping-cart-2"></i> 经销商登录</span>
            <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1">
>>>>>>> 65b4df05d22522a29b4d93b3f1b8bb6619a4762d
              <el-form-item prop="qyNum">
                <el-input placeholder="企业编号"  v-model="ruleForm1.qyNum">
                  <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
                </el-input>
              </el-form-item>
<<<<<<< HEAD

=======
              <el-form-item prop="jxNum">
                <el-input placeholder="经销商编号" v-model="ruleForm1.jxNum">
                  <i slot="prefix" class="el-input__icon el-icon-goods"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="username">
                <el-input placeholder="用户名" v-model="ruleForm1.username">
                  <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="密码" v-model="ruleForm1.password">
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span class="title" slot="label"><i class="el-icon-office-building"></i> 企业登录</span>
            <el-form :model="ruleForm2" :rules="rules2">
              <el-form-item prop="qyNum">
                <el-input placeholder="企业编号"  v-model="ruleForm2.qyNum">
                  <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
                </el-input>
              </el-form-item>
>>>>>>> 65b4df05d22522a29b4d93b3f1b8bb6619a4762d
              <el-form-item prop="username">
                <el-input placeholder="邮箱/会员/8位ID"  v-model="ruleForm1.username">
                  <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                </el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input placeholder="登录密码"  v-model="ruleForm1.password">
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>
            </el-form>
<<<<<<< HEAD
            <el-button type="primary" @click="submit" style="width:350px;margin-top:20px;margin-left:25px;">登录</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bottom" style="text-align: center;" >
      <span>@2017-2019</span>
      <span>一码通 版权所有</span>
      <img src="../assets/police.png" style="margin:20px 10px 0 10px"/>
      <span>ICP证：</span>
      <el-link type="primary">沪ICP备05004162号-14</el-link>
=======
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" @click="submit" style="width:500px;margin-top:20px">登录</el-button>
      </div>
>>>>>>> 65b4df05d22522a29b4d93b3f1b8bb6619a4762d
    </div>
  </el-container>
</template>

<script>
import {validateFigure} from '../utils/rules'
export default {
  data(){
    return {
<<<<<<< HEAD
      active:'2',
=======
      activeName: '1',
      user:{
        username: 'admin',
        usercode:'123',
        cid: '5697',
      },
>>>>>>> 65b4df05d22522a29b4d93b3f1b8bb6619a4762d
      ruleForm1:{
        qyNum: null, //企业编号
        username: '',//用户名
        usercode:'',//用户编号
        password: '',//用户密码
        power1:'',//用户一级权限
        power2:'',//用户二级权限
      },
      rules1: {
        qyNum:[
          { required: true, validator: validateFigure, message: '请输入正确的企业编号，企业编号为纯数字', trigger: 'blur' },
          
        ],
        username:[
<<<<<<< HEAD
          { required: true,  message: '请输入用户名', trigger: 'blur' }
        ],
        password:[
          { required: true,  message: '请输入密码', trigger: 'blur' }
=======
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
>>>>>>> 65b4df05d22522a29b4d93b3f1b8bb6619a4762d
        ],
      }
    }
  },
  watch:{
           
    },
   
  methods: {
    login(){
<<<<<<< HEAD
=======
      let data = this.activeName === '1' ? this.ruleForm1 : this.ruleForm2
>>>>>>> 65b4df05d22522a29b4d93b3f1b8bb6619a4762d
      this.$axios({
        method: 'post',
        url:'/FW/Login.ashx',
        params: {
          active:this.active,
          user:this.ruleForm1
        }
      })
      .then(res=>{
        console.log(res)
        if(res!=null){
          var user=res;
          sessionStorage.setItem('user',JSON.stringify(user));
          this.$router.push({name:'homepage'})
        }else if(res=="1"){
          
        }else if(res=="2"){
          
        }       
      })
    },

    submit() {
      let vm = this
      vm.$refs['ruleForm1'].validate((isValid,rules)=>{
      if(isValid){
        vm.login()
        }
      })
    }
  }

}
</script>

<style scoped>
.head{
  margin: 50px 0 50px 50px;
  width:100%;
  height: 50px;
}
.head span{
  width: 500px;
  display: block;
  color: #488bd2;
}
.el-row{
  float: left;
  background:url(../assets/loginBG1.png)no-repeat;
  width:100%;
  height:369px;
  background-size: 100% 100%;
}
.left{
    position: absolute;
    top: 50%;
    margin-top: -120px;
    margin-left: 10%;
}
.right{
  margin: 10px 20px 0 50%;
}
.left span,strong{
  width:100%;
  color: white;
  display: block;
  margin-bottom: 12px;
  font-size:18px;
}
.right span,strong{
  width:100%;
  color:#535353;
  display: block;
  margin-bottom: 12px;
  font-size:18px;
}
.el-form{
  width: 350px;
  margin-left: 25px;
  margin-top: 20px;
}
.bottom span,.el-link{
line-height: 20PX;
}
</style>
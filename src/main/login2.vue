<template>
  <el-container style="height:100%; display:block">
    <div class="head">
      <img src="../assets/da9dfad0ef66a369e69b8d8bd482029.jpg" style="width:100px;float:left"/>
      <div style="padding:20px">
        <span>一码通产品数字身份管理系统</span>
        <span>Enterprise Prodcut ID Management System</span>
      </div>
    </div>
    <div style="background: rgb(43, 133, 228)">
      <el-row>
        <el-col class="left" :span="12" >
          <div>
            <strong style="font-size:25px;color: white;">第一代云容器引擎  全新上线</strong>
            <span>10倍功能提升，多场景产品家族，最优性价比</span>
            <span>真正的一物一码SAAS云平台，打造一流生态圈</span>
            <span>百余种行业应用产品和解决方案，即插即用，企业零负担，</span>
            <span>按码量/效果/流量计费</span>
          </div>
        </el-col>
        <el-col class="right" :span="12">
          <div style="background: white;width: 400px;height: 360px;margin-left: 30%;">
            <span style="font-size:20px;margin: 0px 20px;height: 50px;line-height: 60px;">企业用户登录</span>
            <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1" >
              <el-form-item prop="qyNum">
                <el-input placeholder="企业编号"  v-model="ruleForm1.qyNum">
                  <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
                </el-input>
              </el-form-item>

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
            <el-button type="primary" @click="login" style="width:350px;margin-top:20px;margin-left:25px;">登录</el-button>
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
    </div>
  </el-container>
</template>

<script>
import {validateFigure} from '../utils/rules'
export default {
  data(){
    return {
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
          { required: true, validator: validateFigure, message: '请输入用户名', trigger: 'blur' }
        ],
        password:[
          { required: true, validator: validateFigure, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  watch:{
           
    },
   
  methods: {
    login(){
      console.log(222)
      this.$router.push({name:'main'})
      this.$axios({
        method: 'post',
        url:'/FW/Login.ashx',
        params: {
          user:this.ruleForm1
        }
      })
      .then(res=>{
        console.log(res)
        if(res=="0"){
          this.$router.push({name:'main'})
        }else if(res=="1"){
          
        }else if(res=="2"){
          
        }       
      })
    },

    submit(user) {
      let vm = this
      vm.$refs['ruleForm1'].validate((isValid,rules)=>{
      if(isValid){
        console.log(111)
        vm.$router.push({name:'main'})
        vm.login()
        }
      })
    }
  },
  mounted: function () { 
    sessionStorage.setItem('user',JSON.stringify(this.user)); }
}
</script>

<style scoped>
.head{
  font-size:20px;
  margin: 50px 0 50px 50px;
  width:100%;
  display: block;
  Clear:both
}
.head span{
  width: 500px;
  display: block;
  color: #488bd2;
}
.el-row{
  float: left;
  background:url(../assets/loginBG2.png);
  width:100%;
  height:369px
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
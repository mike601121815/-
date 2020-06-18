<template>
  <el-container >
    <div class="view">
      <div class="head" style="font-size:20px;margin-bottom:20px">
        企业一码通数据服务平台
      </div>
      <div>
        <el-tabs type="border-card" v-model="activeName" :stretch="true">
          <el-tab-pane :name="1">
            <span class="title" slot="label"><i class="el-icon-shopping-cart-2"></i> 经销商登录</span>
            <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1">
              <el-form-item prop="qyNum">
                <el-input placeholder="企业编号"  v-model="ruleForm1.qyNum">
                  <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
                </el-input>
              </el-form-item>
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
          <el-tab-pane :name="2">
            <span class="title" slot="label"><i class="el-icon-office-building"></i> 企业登录</span>
            <el-form :model="ruleForm2" :rules="rules2">
              <el-form-item prop="qyNum">
                <el-input placeholder="企业编号"  v-model="ruleForm2.qyNum">
                  <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="username">
                <el-input placeholder="用户名" v-model="ruleForm2.username">
                  <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="密码" v-model="ruleForm2.password">
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" @click="login" style="width:500px;margin-top:20px">登录</el-button>
      </div>
    </div>
  </el-container>
</template>

<script>
import {validateFigure} from '../utils/rules'
export default {
  data(){
    return {
      activeName: 1,
      ruleForm1:{
        qyNum: null,
        jxNum: null,
        username: '',
        password: ''
      },
      rules1: {
        qyNum:[
          { required: true, validator: validateFigure, message: '请输入正确的企业编号，企业编号为纯数字', trigger: 'blur' },
        ],
        jxNum:[
          { required: true, validator: validateFigure, message: '请输入正确的经销商编号，经销商编号为纯数字', trigger: 'blur' },
        ],
        username:[
          { required: true, validator: validateFigure, message: '请输入用户名', trigger: 'blur' },
        ],
        password:[
          { required: true, validator: validateFigure, message: '请输入密码', trigger: 'blur' },
        ],
      },
      ruleForm2:{
        qyNum: null,
        username: '',
        password: ''
      },
      rules2: {
        qyNum:[
          { required: true, validator: validateFigure, message: '请输入正确的企业编号，企业编号为纯数字', trigger: 'blur' },
        ],
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }   
    }
  },
  watch:{
           
    },
   
  methods: {
    login(){
      let data = this.activeName === "1" ? this.ruleForm1 : this.ruleForm2
      this.$axios({
        method: 'post',
        url:'/FW/Login.ashx',
        params: {
          active:this.activeName,
          user:data
        }
      })
      .then(res=>{
        console.log(res)
        if(res=="0"){
          vm.$router.push({name:'main'})
        }else if(res=="1"){
          
        }else if(res=="2"){
          
        }       
      })

      


    },
    submit(user) {
      let vm = this
      if(vm.activeName === '1'){
        vm.$refs['ruleForm1'].validate((isValid,rules)=>{
          if(isValid){
            console.log(this.ruleForm1)
            vm.$router.push({name:'main'})
            vm.login()
          }
        })
      }else{
        vm.$refs['ruleForm2'].validate((isValid,rules)=>{
          if(isValid){
            console.log(this.ruleForm2)
            vm.$router.push({name:'main'})
            vm.login()
          }
        })
      }
    }
  },
  mounted: function () { 
    sessionStorage.setItem('user',JSON.stringify(this.user)); }
}
</script>

<style scoped>
.view{
    width: 500px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -250px 0 0 -250px;
}
.head{
  width: 500px;
  height: 30px;
  text-align: center;
}

</style>
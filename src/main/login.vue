<template>
  <el-container >
    <div class="view">
      <div class="head" style="font-size:20px;margin-bottom:20px">
        企业一码通数据服务平台
      </div>
      <div>
        <el-tabs type="border-card" stretch="false">
          <el-tab-pane>
            <span class="title" slot="label"><i class="el-icon-shopping-cart-2"></i> 经销商登录</span>
            <el-input placeholder="企业编号" v-model="input">
    			    <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
  			    </el-input>
            <el-input placeholder="经销商编号" v-model="input">
    			    <i slot="prefix" class="el-input__icon el-icon-goods"></i>
  			    </el-input>
            <el-input placeholder="用户名" v-model="input">
    			    <i slot="prefix" class="el-input__icon el-icon-user"></i>
  			    </el-input>
            <el-input placeholder="密码" v-model="input">
    			    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
  			    </el-input>
          </el-tab-pane>
          <el-tab-pane>
            <span class="title" slot="label"><i class="el-icon-office-building"></i> 企业登录</span>
            <el-input placeholder="企业编号" v-model="input">
    			    <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
  			    </el-input>
            <el-input placeholder="用户名" v-model="input">
    			    <i slot="prefix" class="el-input__icon el-icon-user"></i>
  			    </el-input>
            <el-input placeholder="密码" v-model="input">
    			    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
  			    </el-input>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" style="width:500px;margin-top:20px">登录</el-button>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      user:{
        username: 'admin',
        usercode:'123',
        cid: '5697',
      }    
    }
  },
  watch:{
           
    },
   
  methods: {
    login(user) {
      this.$router.push({main:'main'});
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


.el-input {
  margin-bottom: 20px;
}
</style>
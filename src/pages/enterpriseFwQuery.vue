<template>
	<div class="content">
		<span>添加一个或多个防伪码查询：</span>
		
		<div>
		<div class="search" ref="search">
			<el-input placeholder="请输入防伪码"
    		v-model="input">
    			<i slot="prefix" class="el-input__icon el-icon-search"></i>
  			</el-input>
			<el-button  type="primary" icon="el-icon-plus" circle @click="add1()"></el-button>
			<div class="tag">
				<el-tag @close="delete1(index)" v-for="(tag, index) in FWCode" :key="tag" closable>
					{{tag}}
				</el-tag>
			</div>
		</div>
		</div>
		<div class="search">
		<el-button  type="primary" @click="selectFw">查询</el-button>	
		</div>			
	</div>
</template>

<script>
export default {
	data(){
		return {
			input:'',
			FWCode :[]
		}
	},
	mounted(){
		
	},
	methods:{
		add1(){
			if(this.input!=""&&this.input!=null){
				this.FWCode.push(this.input)
				this.input=null
			}
		},
		delete1(index){
			this.FWCode.splice(index,1)	
		},
		selectFw(){
			console.log(this.ruleForm1)
			var user = JSON.parse(sessionStorage.getItem('user'));
      		this.$axios({
        		method: 'post',
        		url:'/FW/enterpriseFwQuery.ashx',
        		params: {
					cid:user.cid,
          			fwcode:this.FWCode
        		}
      		})
      		.then(res=>{
        		console.log(res)
        		if(res!=null){
          			
        		}      
      		})		
		}
	}
}
</script>

<style scoped>
span{
	line-height:50px;
}
.search{
	margin:0 auto;
	width:800px;
}
.el-input{
	width:700px;	
}
.el-button {
	margin:5px 0;
}
.tag{
	margin: 10px 0;
}
.tag .el-tag{
	margin-right: 20px;
	line-height:30px;
}
</style>
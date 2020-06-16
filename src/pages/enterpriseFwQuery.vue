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
				<el-tag @close="numDeletevalue(index)" v-for="(tag, index) in FWCode" :key="tag" closable>
					{{tag}}
				</el-tag>
			</div>
		</div>
		</div>
		<div class="search">
		<el-button  type="primary">查询</el-button>	
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
			this.FWCode.push(this.input)
			this.input=null
		},
		delete1(){

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
	margin: 20px 0;
}
.tag .el-tag{
	margin-left: 20px;
	line-height:30px;
}
</style>
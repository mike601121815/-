<template>
	<div class="content">
		<div class="item">
		    <div>
		        <div class="search" ref="search">
			        <el-input
    		        placeholder="请输入防伪码"
    		        v-model="input">
    			        <i slot="prefix" class="el-input__icon el-icon-search"></i>
  			        </el-input>
		        </div>
		    </div>
		    <div class="btn">
		        <el-button  type="primary">查询</el-button>	
		    </div>
		</div>
		
	</div>
</template>

<script>
export default {
	data(){
		return {
			input:'',
			tableData: []
		}
	},
	mounted(){
		
	},
	methods:{

	}
}
</script>

<style scoped>
.title{
  text-align: left;
}
.item{
	margin: 20px 0;
	padding: 20px;
	border: 1px solid #e3e3e3;
}
.btn{
	width: 500px;
	margin:10px 0;
}
</style>
<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				
				
				<el-form-item label="稽查员">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
                <el-button type="primary">添加</el-button>
			</div>
		</div>
		
	</div>
</template>

<script>
export default {
	data(){
		return {
			form: {
				username: '',
				name: '',
				value: null
			}
			
			
		}
	}
}
</script>

<style scoped>
.item{
	margin: 20px 0;
	padding: 20px;
	border: 1px solid #e3e3e3;
}
.btn{
	width: 500px;
	margin:0 80px;
}
.el-form--inline .el-form-item{
    width:300px;
}
.el-input {
	width:220px;
}
</style>
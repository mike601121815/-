<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">        
				<el-form-item label="数码" style="width:800px">
					<el-input  clearble></el-input>
				</el-form-item> 
                <el-form-item label="待查数码" >

				</el-form-item> 
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
                <el-button type="primary">重置</el-button>
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
    margin-bottom: 10px;
}
.el-input,.el-select {
	width:200px;
}
</style>
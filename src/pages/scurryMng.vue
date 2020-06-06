<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				<el-form-item label="起始日期">
					<el-date-picker
						v-model="form.value"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="终止日期">
					<el-date-picker
						v-model="form.value"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item label="稽查员">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="稽查数码">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
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
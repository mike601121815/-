<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="100px">              
				<el-form-item label="请输入数码" >
					<el-input  clearble></el-input>
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
			},
			options: [{
				value: '选项1',
				label: '入库'
				}, {
				value: '选项2',
				label: '出库'
			}],
            stateForm: [{
				value: '状态1',
				label: '正在处理'
			},{
				value: '状态2',
				label: '处理完成'
			},{
				value: '状态3',
				label: '异常单据'
			}],
			tableData: []
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
	margin:0 100px;
}
.el-form--inline .el-form-item{
    width:300px;
    margin-bottom: 10px;
}
.el-input,.el-select {
	width:200px;
}
</style>
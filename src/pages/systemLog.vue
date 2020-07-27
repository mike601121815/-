<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" :model="form" label-width="80px">
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
				<el-form-item label="操作类型">
					<el-select v-model="form.username" clearble>
						<el-option v-for="item in options" :key="item.value"
						 :value="item.value">{{item.label}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
				
		</div>
		<div class="item">
			<el-table :data="tableData" border>
				<el-table-column label="操作时间"></el-table-column>
				<el-table-column label="用户名"></el-table-column>
				<el-table-column label="操作类型"></el-table-column>
				<el-table-column label="信息系"></el-table-column>
				<el-table-column label="旧信息"></el-table-column>
			</el-table>
			<el-pagination
				background
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:total="1000">
			</el-pagination>
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
				value: '',
				label: '请选择'
				},{
				value: 1,
				label: '新增'
				}, {
				value: 2,
				label: '修改'
			}],
			tableData: []
		}
	},
	methods: {
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		}
	},
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
	width: 100px;
	margin:0 80px;
}
.el-form--inline .el-form-item{
    width:300px;
}
.el-input {
	width:220px;
}
</style>
<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" :model="form" label-width="80px">
				<el-form-item label="记录时间">
					<el-date-picker
						v-model="form.value"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="至">
					<el-date-picker
						v-model="form.value"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="日志类型">
					<el-select v-model="form.username" clearble>
						<el-option v-for="item in options" :key="item.value"
						 :value="item.value">{{item.label}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="单号">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="查询码数">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="文件名">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
					<el-button type="primary">清空</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="item">
			<el-table :data="tableData" border>
				<el-table-column label="异常数码"></el-table-column>
				<el-table-column label="异常原因"></el-table-column>
				<el-table-column label="文件名"></el-table-column>
				<el-table-column label="单号"></el-table-column>
				<el-table-column label="日志类型"></el-table-column>
				<el-table-column label="包装比例"></el-table-column>
				<el-table-column label="产品"></el-table-column>
				<el-table-column label="操作时间"></el-table-column>
				<el-table-column label="操作者"></el-table-column>
			</el-table>
			<el-pagination
				background
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:total="100">
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
			options: [
				{
					value: '',
					label: '请选择'
				},
				{
					value: 1,
					label: '包装关系建立'
				}, 
				{
					value: 2,
					label: '入库'
				}, 
				{
					value: 3,
					label: '出库'
				}, 
				{
					value: 4,
					label: '调库'
				}, 
				{
					value: 5,
					label: '其他'
				}
			],
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
	width: 500px;
	margin:0 80px;
}
.el-input,.el-select{
	width:220px;
}
</style>
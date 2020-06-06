<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
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
					<el-input v-model="form.username" clearble></el-input>
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
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
				<el-button type="primary">清空</el-button>
			</div>
		</div>
		<div class="item" v-if="tableData.length > 0">
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
				label: '黄金糕'
				}, {
				value: '选项2',
				label: '双皮奶'
			}],
			tableData: []
		}
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
	margin:0 80px;
}
.el-input,.el-select{
	width:220px;
}
</style>
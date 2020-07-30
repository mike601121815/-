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
				<el-form-item label="省份">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="城市">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
                <el-form-item label="产品名称">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
                <el-form-item label="经销商">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
                <el-form-item label="经销商">
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="item">
			<el-table :data="tableData" border>
				<el-table-column label="防伪码"></el-table-column>
				<el-table-column label="物流码"></el-table-column>
				<el-table-column label="批次"></el-table-column>
				<el-table-column label="产品名称"></el-table-column>
				<el-table-column label="查询省份"></el-table-column>
				<el-table-column label="查询城市"></el-table-column>
				<el-table-column label="查询区域"></el-table-column>
				<el-table-column label="经销商"></el-table-column>
				<el-table-column label="首次查询时间"></el-table-column>
				<el-table-column label="查询方式"></el-table-column>
				<el-table-column label="查询信息"></el-table-column>
				<el-table-column label="查看物流明细">
					<template>
						<el-button type="primary" @click="dialogVisible = true;">查询</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:total="100">
			</el-pagination>
		</div>
		<el-dialog
			title="物流明细"
			:visible.sync="dialogVisible"
			width="40%">
			<el-table :data="tableData" border>
				<el-table-column label="防伪码"></el-table-column>
				<el-table-column label="物流码"></el-table-column>
				<el-table-column label="操作时间"></el-table-column>
				<el-table-column label="产品名称"></el-table-column>
				<el-table-column label="操作项目"></el-table-column>
				<el-table-column label="单号"></el-table-column>
				<el-table-column label="调出库房"></el-table-column>
				<el-table-column label="调入库房"></el-table-column>
				<el-table-column label="调出经销商"></el-table-column>
				<el-table-column label="调入经销商"></el-table-column>
				<el-table-column label="操作员"></el-table-column>
			</el-table>
			<el-pagination
				background
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:total="100">
			</el-pagination>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data(){
		return {
			dialogVisible: false,
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
			tableData: [
				{}
			]
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
.el-form--inline .el-form-item{
    width:300px;
}
.el-input {
	width:220px;
}
</style>
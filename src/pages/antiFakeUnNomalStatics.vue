<template>
	<div class="content">
        <div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				<el-form-item label="年">
					<el-date-picker
						v-model="form.value"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="月">
					<el-date-picker
						v-model="form.value"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
			</div>
			<div class="table">
			<el-table border v-if="gridData.length" :data="gridData">
				<el-table-column align="center"  property="id" label="防伪码"></el-table-column>
				<el-table-column align="center" property="num" label="批号"></el-table-column>
				<el-table-column align="center" property="num" label="产品规格"></el-table-column>
				<el-table-column align="center" property="num" label="包装比例"></el-table-column>
				<el-table-column align="center" property="num" label="产品"></el-table-column>
				<el-table-column align="center" property="num" label="查询时间"></el-table-column>
				<el-table-column align="center" property="num" label="省份"></el-table-column>
				<el-table-column align="center" property="num" label="地区"></el-table-column>
				<el-table-column align="center" property="num" label="查询方式"></el-table-column>
				<el-table-column align="center" property="num" label="号码/IP"></el-table-column>
			</el-table>
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
				label: '黄金糕'
				}, {
				value: '选项2',
				label: '双皮奶'
			}],
			gridData: []
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
.el-form--inline .el-form-item{
    width:300px;
}
.el-input {
	width:220px;
}
</style>
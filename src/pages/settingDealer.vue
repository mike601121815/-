<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="100px">
				<el-form-item label="经销商编号">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="经销商名称">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="省份">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="城市">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="区域">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
				<el-button type="primary">添加</el-button>
				<el-button type="primary">导出</el-button>
			</div>
		</div>
		<div class="item" v-if="tableData.length > 0">
			<el-table :data="tableData" border>
				<el-table-column label="经销商登录编号"></el-table-column>
				<el-table-column label="经销商编号"></el-table-column>
				<el-table-column label="经销商名称"></el-table-column>
				<el-table-column label="所在省份"></el-table-column>
				<el-table-column label="所在城市"></el-table-column>
				<el-table-column label="所在地区"></el-table-column>
				<el-table-column label="是否启用"></el-table-column>
				<el-table-column label="操作">
					<template>
						<el-button type="text">添加</el-button>
					</template>
				</el-table-column>
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
	margin:0 100px;
}
.el-form--inline .el-form-item{
    width:320px;
}
.el-input,.el-select{
	width:220px;
}
</style>
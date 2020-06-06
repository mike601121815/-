<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" style="width:500px" :model="form" label-width="80px">
				<el-form-item label="用户名">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
				<el-button type="primary">添加</el-button>
			</div>
		</div>
		<div class="item" v-if="tableData.length > 0">
			<el-table :data="tableData" border>
				<el-table-column label="用户名"></el-table-column>
				<el-table-column label="真实姓名"></el-table-column>
				<el-table-column label="性别"></el-table-column>
				<el-table-column label="联系电话"></el-table-column>
				<el-table-column label="所属部门"></el-table-column>
				<el-table-column label="账号类型"></el-table-column>
				<el-table-column label="负责经销商"></el-table-column>
				<el-table-column label="启用状态"></el-table-column>
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
				name: ''
			},
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
</style>
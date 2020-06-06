<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" style="width:500px" :model="form" label-width="80px">
				<el-form-item label="角色名">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
				<el-button type="primary">添加</el-button>
			</div>
		</div>
		<div class="item" v-if="tableData.length > 0">
			<el-table :data="tableData" border>
				<el-table-column label="角色名"></el-table-column>
				<el-table-column label="用户数量"></el-table-column>
				<el-table-column label="详细"></el-table-column>
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
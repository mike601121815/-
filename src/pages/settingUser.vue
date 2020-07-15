<template>
	<div class="content">
		<div class="item">
			<h3 style="margin:10px; font-size:1.17em">用户添加</h3>
			<el-form ref="form" style="width:auto" :model="form" label-width="150px">
				<el-form-item label="工厂名称">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="确认密码">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio v-model="sex" label="1">男</el-radio>
  					<el-radio v-model="sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="选择仓库">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio v-model="type" label="1">启用</el-radio>
  					<el-radio v-model="type" label="2">禁用</el-radio>
				</el-form-item>
				<el-form-item label="是否为经销商">
					<el-radio v-model="isAgcy" label="1">是</el-radio>
  					<el-radio v-model="isAgcy" label="2">否</el-radio>
				</el-form-item>
				<el-form-item label="经销商">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary">保存</el-button>
			</div>
		</div>
		<div class="item" >
			<h3>用户查询</h3>
			<el-table :data="tableData" border>
				<el-table-column label="用户名"></el-table-column>
				<el-table-column label="真实姓名"></el-table-column>
				<el-table-column label="性别"></el-table-column>
				<el-table-column label="联系电话"></el-table-column>
				<el-table-column label="状态"></el-table-column>
				<el-table-column label="用户类型"></el-table-column>
				<el-table-column label="负责经销商"></el-table-column>
				<el-table-column label="角色设置"></el-table-column>
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
			options:[],
			tableData: [],
			sex:'1',
			type:'1',
			isAgcy:'1'
		}
	}
}
</script>

<style scoped>
h3{
	margin:10px; 
	font-size:1.17em
}
.title{
  text-align: left;
}
.item{
	margin: 20px 0;
	padding: 10px;
	border: 1px solid #e3e3e3;
}
.btn{
	width: 500px;
	margin:0 150px;
}
</style>
<style>
.el-form-item {
    margin-bottom: 5px;
}
.cell{
	text-align: center;
}
.el-form-item {
    width: 300px;
    display: inline-block;
}
.el-form-item__content {
	text-align: center;
}
</style>
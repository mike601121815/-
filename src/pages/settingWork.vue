<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" style="width:500px" :model="form" label-width="100px">
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
				<el-form-item label="生产线名称">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="班组编号">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="班组名称">
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
				<el-table-column label="上产线编号"></el-table-column>
				<el-table-column label="班组编号"></el-table-column>
				<el-table-column label="班组名称"></el-table-column>
				<el-table-column label="开始时间"></el-table-column>
				<el-table-column label="结束时间"></el-table-column>
				<el-table-column label="状态"></el-table-column>
				<el-table-column label="入网时间"></el-table-column>
				<el-table-column label="备注"></el-table-column>
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
</style>
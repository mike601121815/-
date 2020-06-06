<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				<el-form-item label="产品编号">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="产品名称">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="包装比例">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="产品品规">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="激活状态">
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
				<el-button type="primary">下载</el-button>
			</div>
		</div>
		<div class="item" v-if="tableData.length > 0">
			<el-table :data="tableData" border>
				<el-table-column label="产品编号"></el-table-column>
				<el-table-column label="产品名称"></el-table-column>
				<el-table-column label="包装比例"></el-table-column>
				<el-table-column label="产品品规"></el-table-column>
				<el-table-column label="产品特征"></el-table-column>
				<el-table-column label="激活状态"></el-table-column>
				<el-table-column label="更多信息"></el-table-column>
				<el-table-column label="操作">
					<template>
						<el-button type="text">查看</el-button>
						<el-button type="text">删除</el-button>
						<el-button type="text">修改</el-button>
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
	margin:0 80px;
}
.el-input,.el-select{
	width:220px;
}
</style>
<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" style="width:500px" :model="form" label-width="80px">
				<el-form-item label="库房编号">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:value="item.value">
							<i :class="item.value"></i>
							<span>{{item.value}}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="库房编号">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="库房名称">
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
				<el-table-column label="工厂名称"></el-table-column>
				<el-table-column label="库房编号"></el-table-column>
				<el-table-column label="库房名称"></el-table-column>
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
import moduleName from '../utils/name.json';
export default {
	data(){
		return {
			form: {
				username: '',
				name: '',
				value: null
			},
			options: [],
			tableData: []
		}
	},
	mounted(){
		for(let i in moduleName){
			this.options.push({
				value:moduleName[i]._prevClass,
				label:moduleName[i]._prevClass
			})
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
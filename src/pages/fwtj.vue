<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
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
				<el-form-item label="查询数量" style="width:360px">
                    <el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
					<el-input class="num"  clearble></el-input>
				</el-form-item>
                
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
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
				name: ''
			},
            options: [{
				value: '选项1',
				label: '>='
				}, {
				value: '选项2',
				label: '<='
			    },{
				value: '选项3',
				label: '='
			}],
			tableData: []
		}
	},
	mounted(){
		
	},
	methods:{
		aa(){

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
.el-input,.el-select{
	width:220px;
}
.num{
    width:50px;
}
</style>
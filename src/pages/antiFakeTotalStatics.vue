<template>
	<div class="content">
		<div class="item">
            <el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				<el-form-item label="起始日期">
					<el-date-picker
                    v-model="form.username"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="终止日期">
					<el-date-picker
                    v-model="form.name"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="查询方式">
					<el-select v-model="form.value"  placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="产品">
					<el-input  clearble></el-input>
				</el-form-item>
                <el-form-item label="查询省份">
					<el-input  clearble></el-input>
				</el-form-item>
				<el-form-item label="查询地区">
					<el-input  clearble></el-input>
				</el-form-item>
                <el-form-item label="查询次数">
					<el-input  clearble></el-input>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button  @click=" " type="primary">查询</el-button>
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
				label: 'WEB(网络查询)'
				}, {
				value: '选项2',
				label: 'APP(移动终端查询)'
			    }, {
				value: '选项3',
				label: 'TEL(电话查询)'
			    }, {
				value: '选项4',
				label: 'SMS(短信查询)'
			}],
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

.item{
	margin: 20px 0;
	padding: 20px;
	border: 1px solid #e3e3e3;
}
.el-form--inline .el-form-item{
    width:300px;
}
.el-input,.el-select{
	width:220px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
    font-size: 12px;
}
.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
.btn{
	width: 500px;
	margin:0 80px;
}
</style>
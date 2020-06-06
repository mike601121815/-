<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" :model="form" label-width="80px">
               
                <div class="item" style="margin-top:0;">
                    <div style="width:800px; height:41px">
                        <label style="display: inline-block;text-align: right; width:80px;padding:0 12px 0 0;line-height: 41px;">单据时间</label>
                    </div>
                    <el-form-item label="起始日期">
					<el-date-picker
						v-model="form.startTime"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束日期">
					<el-date-picker
						v-model="form.endTime"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
                </div>

				<el-form-item label="单据号" style="margin:0 0 20px 20px">
					<el-input v-model="form.billnum" clearble></el-input>
				</el-form-item>

                <el-form-item label="单据类型" style="margin:0 0 10px 10px">
					<el-select v-model="options.value" placeholder="请选择" >
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="处理状态" style="width:800px;margin:0 0 20px 20px">
					<el-select v-model="stateForm.value" placeholder="请选择" >
						<el-option
						v-for="item in stateForm"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary" @click="select()">查询</el-button>
                <el-button type="primary">重置</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			form:{
				startTime: '',
				endTime: '',
				billnum:'',
				selectoption:0,
				selectstateFrom:0,
			},
			options: [{
				value: '选项1',
				label: '入库'
				}, {
				value: '选项2',
				label: '出库'
			}],
			stateForm: [{
				value: '状态1',
				label: '正在处理'
			},{
				value: '状态2',
				label: '处理完成'
			},{
				value: '状态3',
				label: '异常单据'
			}],
			tableData: []
		}
	},
	methods:{
		select:function(){
			console.log(this.form);
			this.$http.post('/api/interface/blogs/add_comment',
        		{
          			content: this.form
        		}
      		)
        	.then((response) => {
          		alert('提交成功!, 刚才提交的内容是: ' + response.body.content)
        	},
        	(response) => {
          		alert('出错了')
        	})
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
.btn{
	width: 500px;
	margin:0px 100px;
}
.el-form--inline .el-form-item{
    width:300px;
    margin-bottom: 10px;
}
.el-input,.el-select {
	width:200px;
}
</style>
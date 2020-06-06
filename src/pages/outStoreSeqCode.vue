<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				<el-form-item label="出库单号">
					<el-input v-model="form.odd" clearble></el-input>
				</el-form-item>
                
                 <el-form-item label="出库库房" style="width:800px">
					<el-select v-model="form.warehouse.value" placeholder="请选择" >
						<el-option
						v-for="item in form.warehouse"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="出库类型" style="width:800px">
					<el-select v-model="form.outstock.value" placeholder="请选择" >
						<el-option
						v-for="item in form.outstock"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="经销商">
					<el-input v-model="form.dealer" clearble></el-input>
				</el-form-item>


                <el-form-item label="操作方式" style="width:800px">
					<el-radio-group v-model="form.radio">
                        <el-radio :label="1">顺序码起始值</el-radio>
                        <el-radio :label="2">输入顺序码</el-radio>
                        <el-radio :label="3">上传文件</el-radio>
                    </el-radio-group>
				</el-form-item>

                <el-form-item label="操作数码"  style="width:800px">
                    <div style="width:800px">
                        <label style="display: inline-block;text-align: right; width:80px;padding:0 12px 0 0">起始值</label>
                        <el-input  clearble></el-input>
                        <label style="display: inline-block;text-align: right; width:80px;padding:0 12px 0 0">终止值</label>
                        <el-input  clearble></el-input>
                    </div>
				</el-form-item>

				<el-form-item label="剔除数码">
					<el-input  clearble></el-input>
				</el-form-item>
				
                <el-form-item label="备注">
					<el-input  clearble></el-input>
				</el-form-item>

                <el-form-item style="width:800px;margin:0 80px;">
					<el-checkbox v-model="checked">修改产品相关信息</el-checkbox>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary">出库</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			form: {
				odd:'',
				options: [{
				value: '选项1',
				label: '创建时间'
				}, {
				value: '选项2',
				label: '更新时间'
			}],
            warehouse: [{
				value: '仓库1',
				label: '芬腾仓库'
			}],
            outstock: [{
				value: '出库1',
				label: '销售出库'
			},{
				value: '出库2',
				label: '调拨出库'
			}],
			dealer:'',
			radio: 1,
            checked: true,
            
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
	margin:0px 80px;
}
.el-form--inline .el-form-item{
    width:300px;
    margin-bottom: 10px;
}
.el-input,.el-select {
	width:200px;
}
.el-checkbox{
    line-height: 19px;
}
.el-radio{
    line-height: 16px;
}
</style>
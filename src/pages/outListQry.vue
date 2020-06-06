<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				<el-form-item label="时间类型" style="width:800px">
					<el-select v-model="form.value" placeholder="请选择" >
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="起始日期">
					<el-date-picker
						v-model="form.name"
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
				
				<el-form-item label="出库单号">
					<el-input  clearble></el-input>
				</el-form-item>

                <el-form-item label="产品">
					<el-popover
  					placement="right"
  					width="550"
  					trigger="click">
  					<el-table :data="gridData">
    				<el-table-column style="text-align: center;" width="80" property="id" label="序号"></el-table-column>
    				<el-table-column width="80" property="num" label="产品编号"></el-table-column>
    				<el-table-column width="200" property="name" label="产品名称"></el-table-column>
					<el-table-column width="80" property="pr" label="产品品柜"></el-table-column>
					<el-table-column width="80" property="scale" label="包装比例"></el-table-column>
  					</el-table>
  					<el-button slot="reference" style="display: inline-block;width:200px;text-align: left;color: #cecad1;" icon="el-icon-search">选择产品</el-button>
				</el-popover>
				</el-form-item>

                <el-form-item label="出库库房">
					<el-select v-model="warehouse.value" placeholder="请选择" >
						<el-option
						v-for="item in warehouse"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="出库类型">
					<el-select v-model="outstock.value" placeholder="请选择" >
						<el-option
						v-for="item in outstock"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="数码">
					<el-input  clearble></el-input>
				</el-form-item>

                 <el-form-item style="width:800px;margin:0 80px;">
					<el-checkbox v-model="checked">只看单据计划量与处理成功数量不一致的单据</el-checkbox>
				</el-form-item>
                 <el-form-item style="width:800px;margin:0 80px;">
					<el-checkbox v-model="checked">显示已删除、已覆盖的单据</el-checkbox>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary">查询</el-button>
                <el-button type="primary">重置</el-button>
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
            checked: true,

			gridData: [{
          	id: '1',
          	num: '01',
          	name: '上海市普陀区金沙江路 1518 弄',
			pr: '1',
          	scale: '0x1'
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

</style>
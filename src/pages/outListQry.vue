<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" :model="form" label-width="80px">
				<el-form-item label="时间类型">
					<el-select v-model="form.timestate" placeholder="请选择" >
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
						v-model="form.starttime" value-format="yyyy-MM-dd"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="终止日期">
					<el-date-picker
						v-model="form.endtime" value-format="yyyy-MM-dd"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				
				<el-form-item label="出库单号">
					<el-input v-model="form.odd" placeholder="请输入单号" clearble></el-input>
				</el-form-item>

                <el-form-item label="产品">
					<el-input v-model="form.product" placeholder="请选择产品" :value="form.productnum" @focus="productfocus"></el-input>
					<!--<el-popover
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
				</el-popover> -->
				</el-form-item>

                <el-form-item label="出库库房">
					<el-select v-model="form.outstore" @change="selChange" placeholder="请选择" >
						<el-option
						v-for="item in warehouse"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="出库类型">
					<el-select v-model="form.outstate" placeholder="请选择" >
						<el-option
						v-for="item in outstock"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="数码">
					<el-input v-model="form.num" placeholder="请输入数值" clearble></el-input>
				</el-form-item>

                 <el-form-item style="width:800px;margin:0 80px;">
					<el-checkbox v-model="form.checked1">只看单据计划量与处理成功数量不一致的单据</el-checkbox>
				</el-form-item>
                 <el-form-item style="width:800px;margin:0 80px;">
					<el-checkbox v-model="form.checked2">显示已删除、已覆盖的单据</el-checkbox>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary" @click="selectQry">查询</el-button>
                <el-button type="primary">重置</el-button>
			</div>
		</div>
		<el-dialog
			title="选择产品"
			:visible.sync="dialogVisible"
			width="600px">
			<el-table :data="gridData" highlight-current-row
    @row-click="handleCurrentChange">
				<el-table-column align="center" width="80" property="id" label="序号"></el-table-column>
				<el-table-column align="center" width="80" property="num" label="产品编号"></el-table-column>
				<el-table-column align="center" width="200" property="name" label="产品名称"></el-table-column>
				<el-table-column align="center" width="80" property="pr" label="产品品柜"></el-table-column>
				<el-table-column align="center" width="80" property="scale" label="包装比例"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data(){
		return {
			dialogVisible: false,
			form: {
				timestate: '', //时间类型
				starttime:'',  //起始时间
				endtime: '',   //结束时间
				odd: '',       //出库单号
				product: '',   //产品名称
				productnum:'', //产品编号
				outstore:'',   //出库库房
				outstate:'',   //出库类型
				num:'',        //数码
				checked1: false,  //单据类型选择
				checked2: false,  //单据类型选择
				
			},
			
			options: [{
				value: '1',
				label: '创建时间'
				}, {
				value: '2',
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
            

			gridData: [{
				id: '1',
				num: '130022',
				name: '婴童牛仔系列产品',
				pr: '1',
				scale: '1*1(盒)'
        	},{
				id: '2',
				num: '130021',
				name: '婴童POLO衫系列产品',
				pr: '1',
				scale: '1*1(盒)'
        	}],
			current:null,
			tableData: []
		}
	},
	methods:{
		selChange(val){
			
			
		},
		confirm(){
			this.form.product = this.current.pr + this.current.name +this.current.scale;
			this.form.productnum = this.current.num;
			this.dialogVisible = false
		},
		handleCurrentChange(data){
			this.current = data
		},


		productfocus(){
			//	请求产品数据
			this.$axios({
				method: 'post',
				url:'/getproductfocus',
				params:{
					
				}
			})
			.then(res=>{
				console.log(res);
				gridData=res;
			})
			this.dialogVisible = true
		},

		selectQry(){
			console.log(this.form)
			this.$axios({
				method: 'post',
				url:'/FW/OutListQry.ashx',
				params:{
					qry: this.form
				}
			})
			.then(res=>{
				console.log(res)
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
<style>
.el-dialog__header {
    padding: 20px 20px 0 20px;
}
.el-dialog__body {
    padding: 0 30px 20px;
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
    color: #fff;
    background-color: #a2a4a7!important;
}
</style>
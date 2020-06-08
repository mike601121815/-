<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" :model="form" label-width="80px">
				<el-form-item label="出库单号">
					<el-input placeholder="请输入单号" v-model="form.odd" clearable></el-input>
				</el-form-item>
                
                 <el-form-item label="出库库房" >
					<el-select v-model="form.outstore" placeholder="请选择" >
						<el-option
						v-for="item in warehouse"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="出库类型" >
					<el-select v-model="form.outstate" placeholder="请选择" >
						<el-option
						v-for="item in outstock"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

                <el-form-item label="经销商">
					<el-input placeholder="请选择经销商" v-model="form.product" :value="form.dealer" @focus="dealerfocus"></el-input>
				</el-form-item>


                <el-form-item label="操作方式" style="width:800px">
					<el-radio-group v-model="form.radio">
                        <el-radio :label="1">顺序码起始值</el-radio>
                        <el-radio :label="2">输入顺序码</el-radio>
                        <el-radio :label="3">上传文件</el-radio>
                    </el-radio-group>
				</el-form-item>
				<div v-if="form.radio === 1" style="margin:0 0 10px; padding:10px 0 0 0;" class="item">
					<el-form-item label="起始值" label-width="79px">
					<el-input placeholder="请输入数值" v-model="form.startvalue" clearble></el-input>
					</el-form-item>
					<el-form-item label="终止值" >
					<el-input placeholder="请输入数值" v-model="form.endvalue" clearble></el-input>
					</el-form-item>
					<el-form-item label="剔除数码">
						<el-input placeholder="请输入数值" v-model="form.deletevalue" clearble></el-input>
					</el-form-item>
				</div>
				<div v-if="form.radio === 2" style="margin:0 0 10px; padding:10px 0 0 0;"  class="item" >				
					<el-form-item label="操作数码" >
					<el-input  v-model="form.num" clearble></el-input>
					</el-form-item>
				</div>
				<div v-if="form.radio === 3" style="margin:0 0 10px; padding:10px 0 0 0;"  class="item" >				
					<el-form-item label="上传文件" >
						<el-upload
						class="upload-demo"
						action="https://jsonplaceholder.typicode.com/posts/"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						
						list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
					</el-form-item>
				</div>
               <el-form-item label="备注"  style="width:100%">
					<el-input style="width:830px"  clearble></el-input>
				</el-form-item>

                <el-form-item style="width:800px;margin:0 80px;">
					<el-checkbox v-model="form.checked">修改产品相关信息</el-checkbox>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary" @click="checkout">出库</el-button>
			</div>
		</div>
		<el-dialog
			title="选择经销商"
			:visible.sync="dialogVisible"
			width="540px">
			<div>
				
			</div>
			<el-table :data="gridData" highlight-current-row
    		@row-click="handleCurrentChange">
				<el-table-column align="center" width="80" property="id" label="序号"></el-table-column>
				<el-table-column align="center" width="120" property="num" label="经销商编号"></el-table-column>
				<el-table-column align="center" width="280" property="name" label="经销商名称"></el-table-column>
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
			dialogVisible:false,
			form: {
				odd:'',  //出库单号
				outstore:'', //出库库房
				outstate:'',   //出库类型
				dealer:'',    //经销商
				radio: 1,    //操作方式

				startvalue:'',  //起始值
				endvalue:'',    //终止值
				deletevalue:'', //删除码

				num:'',   //顺序码

				remark:'', //备注
				checked: true, //修改选项
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
			gridData: [{
				id: '1',
				num: 'FTtz1001',
				name: '广州市重光贸易有限公司',
        	},{
				id: '2',
				num: 'FT08001',
				name: '佛山市典华内衣实业有限公司',
        	}],
			current:null,
			tableData: [],
		}
	},
	methods: {
      	handleRemove(file, fileList) {
        console.log(file, fileList);
      	},
      	handlePreview(file) {
        	console.log(file);
	  	},

		confirm(){
			this.form.product =  this.current.name ;
			this.form.num = this.current.num;
			this.dialogVisible = false
		},
		handleCurrentChange(data){
			this.current = data
		},

		dealerfocus(){
			//	请求经销商数据
			this.$axios({
				method: 'post',
				url:'/getdealerfocus',
				params:{
					
				}
			})
			.then(res=>{
				console.log(res);
				gridData=res;
			})
			this.dialogVisible = true
		},

	  checkout(){
			console.log(this.form)
			this.$axios({
				method: 'post',
				url:'/FW/OutStoreSeqCode.ashx',
				params:{
					dealer: this.form
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
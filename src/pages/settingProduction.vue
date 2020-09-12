<template>
	<div class="content">
		<div class="item">
			<div class="btn">
				<el-button icon="el-icon-plus" type="primary" @click="AddProduct">添加</el-button>
				<el-button icon="el-icon-search" type="primary" @click="SelProduct">查询</el-button>
				<el-button type="primary">导出</el-button>
			</div>
			<el-form ref="selectproductForm" :inline="true" :model="selectproductForm" label-width="100px">
				<el-form-item label="工厂名称">
					<el-select v-model="selectproductForm.factoryID" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.FactoryCode"
						:label="item.FactoryName"
						:value="item.FactoryCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车间名称">
					<el-select v-model="selectproductForm.value" placeholder="请选择">
						<el-option
						v-for="item in Workshop"
						:key="item.Workshopcode"
						:label="item.Workshopname"
						:value="item.Workshopcode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="生产线编号">
					<el-input v-model="selectproductForm.username"></el-input>
				</el-form-item>
				<el-form-item label="生产线名称">
					<el-input v-model="selectproductForm.name"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="item">
			<el-table :data="tableData" border>
				<el-table-column align="center" prop="FactoryId" label="工厂编号"></el-table-column>
				<el-table-column align="center" prop="WorkshopId" label="车间编号"></el-table-column>
				<el-table-column align="center" prop="LineId" label="生产线编号"></el-table-column>
				<el-table-column align="center" prop="LineName" label="生产线名称"></el-table-column>
				<el-table-column align="center" prop="ActiveFlag" label="状态"></el-table-column>
				<el-table-column align="center" prop="FactoryId" label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="EditProduct(scope)">修改</el-button>
						<el-button type="text" @click="delProduct(scope)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="dialogtype==1 ? '添加生产线':'编辑生产线'" :visible.sync="dialogVisible" width="740px">
      		<el-form ref="productForm" inline style="width:auto" :model="productForm" :rules="rules" label-width="100px">
				<el-form-item label="工厂名称" prop="factoryID">
                    <el-select v-model="productForm.factoryID" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.FactoryCode"
						:label="item.FactoryName"
						:value="item.FactoryCode">
						</el-option>
					</el-select>
                </el-form-item>
				<el-form-item label="车间名称" prop="WorkshopId">
					<el-select v-model="productForm.WorkshopId" placeholder="请选择">
						<el-option
						v-for="item in Workshop"
						:key="item.Workshopcode"
						:label="item.Workshopname"
						:value="item.Workshopcode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="生产线编号" prop="lineID">
					<el-input :disabled="editVisible" v-model="productForm.lineID"></el-input>
				</el-form-item>
				<el-form-item label="生产线名称" prop="lineName">
					<el-input v-model="productForm.lineName"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="note">
					<el-input v-model="productForm.note"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="activeFlag">
					<el-radio v-model="productForm.activeFlag" :label='1'>启用</el-radio>
  					<el-radio v-model="productForm.activeFlag" :label='0'>禁用</el-radio>
				</el-form-item>
			</el-form>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="restForm">重 置</el-button>
        		<el-button type="primary" @click="SetProduct">保 存</el-button>
      		</span>
    	</el-dialog>
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
			dialogVisible:false,
			dialogtype:0,
			editVisible:true,
			tableData: [],
			productForm:{
				factoryID:'',//工厂名称
				lineID:'',//产线id
				cid:'',//企业id
				note:'',//备注
				WorkshopId:'',//车间编号
				lineName:'',//产线名称
				activeFlag:'1',//状态
			},
			rules: {
        		factoryID:[
          			{ required: true, message: '请选择一个工厂', trigger: 'change' }
        		],
        		WorkshopId:[
          			{ required: true,  message: '请选择一个车间', trigger: 'blur' }
        		],
        		lineID:[
          			{ required: true,  message: '请输入一个生产线编号', trigger: 'blur' }
				],
				lineName:[
					{ required: true,  message: '请输入一个生产线名称', trigger: 'blur' },
				]
			},
			factory:{},//工厂
			Workshop:{},//车间
			selectproductForm:{
				factoryID:'',//工厂名称
				WorkshopId:'',//车间编号
				lineID:'',//产线id
				lineName:'',//产线名
			},

		}
	},
	mounted : function(){
		this.SelFactory();	
		this.SelWorkShop();
	},
	methods: {
		SelFactory(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			//查询工厂
			this.$axios({
        		method: 'post',
        		url:'/FW/Factory.ashx',
        		params: {
          			action:"query",
					cid:user.QyNum,
        		}
        	}).then(res=>{
          		if(res.Code==0){
					this.factory=res.DataList
          		}else{
					this.$message({
            			showClose: true,
            			message:res.Msg,
            			type: 'warning'
            		});
          		}       
      		})		
		},
		SelWorkShop(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			console.log(1111)
			//查询车间
			this.$axios({
        		method: 'post',
        		url:'/FW/WorkShop.ashx',
        		params: {
          			action:"query",
					cid:user.QyNum
        		}
        	}).then(res=>{
          		if(res.Code==0){
					this.Workshop=res.DataList
          		}else{
					this.$message({
            			showClose: true,
            			message:res.Msg,
            			type: 'warning'
            		});
          		}       
      		})		
		},
		AddProduct(){
			this.editVisible=false
			this.dialogVisible=true;
			this.dialogtype=1;
		},
		EditProduct(product){
			console.log(product)
			this.editVisible=true

			this.productForm.factoryID=product.row.FactoryId;
			this.productForm.lineID=product.row.LineId;
			this.productForm.WorkshopId=product.row.WorkshopId;
			this.productForm.note=product.row.Note;
			this.productForm.lineName=product.row.LineName;
			this.productForm.activeFlag=product.row.ActiveFlag;

			this.dialogVisible=true;
			this.dialogtype=2;
			console.log(this.productForm)
		},

		restForm(){
			this.$nextTick(()=>{
				this.$refs['productForm'].resetFields()
			})
		},
		SetProduct(){
			this.$refs['productForm'].validate((isValidate)=>{
				if(isValidate){
					var user = JSON.parse(sessionStorage.getItem('user'));
					this.productForm.cid=user.QyNum
					if(this.dialogtype==1){
						//添加工厂
					this.$axios({
        				method: 'post',
        				url:'/FW/ProductLine.ashx',
        			params: {
          				action:"add",
          				productline:this.productForm
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelProduct()
          				}else{
							this.$message({
            					showClose: true,
            					message:res.Msg,
            					type: 'warning'
            				});
          				}       
      				})
					}else if(this.dialogtype==2){
						//修改工厂
					this.$axios({
        				method: 'post',
        				url:'/FW/ProductLine.ashx',
        			params: {
          				action:"edit",
          				productline:this.factoryForm
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelProduct()
          				}else{
							this.$message({
            					showClose: true,
            					message:res.Msg,
            					type: 'warning'
            				});
          				}       
      				})
					}
				}else{
					isValidate
				}
			})
		},
		
		SelProduct(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			//查询工厂
			this.$axios({
        		method: 'post',
        		url:'/FW/ProductLine.ashx',
        		params: {
          			action:"query",
					cid:user.QyNum,
					factoryID:this.selectproductForm.factoryID,
					WorkshopId:this.selectproductForm.WorkshopId,
					lineID:this.selectproductForm.lineID,
					lineName:this.selectproductForm.lineName
        		}
        	}).then(res=>{
          		if(res.Code==0){
					this.tableData=res.DataList
          		}else{
					this.$message({
            			showClose: true,
            			message:res.Msg,
            			type: 'warning'
            		});
          		}       
      		})		
		},
		delProduct(product){
					//修改工厂
					this.$axios({
        				method: 'post',
        				url:'/FW/ProductLine.ashx',
        			params: {
          				action:"delete",
          				productline:product.row
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelProduct()
          				}else{
							this.$message({
            					showClose: true,
            					message:res.Msg,
            					type: 'warning'
            				});
          				}       
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
	margin: 10px 0;
	border: 1px solid #e3e3e3;
}
.btn{
	width: 500px;
	margin:10px 100px;
}
.el-input,.el-select{
	width:220px;
}
</style>
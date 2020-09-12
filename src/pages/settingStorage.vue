<template>
	<div class="content">
		<div class="item">
			<div class="btn">
				<el-button icon="el-icon-plus" type="primary" @click="AddStorage">添加</el-button>
				<el-button icon="el-icon-search" type="primary"  @click="SelStorage">查询</el-button>
				<el-button type="primary">导出</el-button>
			</div>
			<el-form ref="selectstorageform" inline style="width:auto" :model="selectstorageform" label-width="80px">
				<el-form-item label="工厂名称">
					<el-select v-model="selectstorageform.FactoryID" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.FactoryCode"
						:label="item.FactoryName"
						:value="item.FactoryCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="库房编号">
					<el-input v-model="selectstorageform.StoreCode"></el-input>
				</el-form-item>
				<el-form-item label="库房名称">
					<el-input v-model="selectstorageform.StoreName"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="item">
			<el-table :data="tableData" border>
				<el-table-column prop="StoreCode" label="库房编号"></el-table-column>
				<el-table-column prop="StoreName" label="库房名称"></el-table-column>
				<el-table-column prop="IsEnable" label="状态"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="EditStorage(scope)">修改</el-button>
						<el-button type="text" @click="delStorage(scope)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="dialogtype==1 ? '添加车间':'编辑车间'" :visible.sync="dialogVisible" width="740px">
      		<el-form ref="storageform" inline style="width:auto" :model="storageform" :rules="rules" label-width="100px">
				<el-form-item label="工厂名称" prop="FactoryID">
                    <el-select v-model="storageform.FactoryID" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.FactoryCode"
						:label="item.FactoryName"
						:value="item.FactoryCode">
						</el-option>
					</el-select>
                </el-form-item>
				<el-form-item label="车间编号" prop="StoreCode">
					<el-input :disabled="editVisible" v-model="storageform.StoreCode"></el-input>
				</el-form-item>
				<el-form-item label="车间名称" prop="StoreName">
					<el-input v-model="storageform.StoreName"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="note">
					<el-input type="textarea" v-model="storageform.note"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="IsEnable">
					<el-radio v-model="storageform.IsEnable" :label="1">启用</el-radio>
  					<el-radio v-model="storageform.IsEnable" :label="0">禁用</el-radio>
				</el-form-item>
			</el-form>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="restForm">重 置</el-button>
        		<el-button type="primary" @click="SetStorage">确 定</el-button>
      		</span>
    	</el-dialog>
	</div>
</template>

<script>
export default {
	data(){
		return {
			storageform: {
				FactoryID: '',
				CID: '',
				IsEnable: 1,
				StoreCode: '',
				StoreName: '',
			},
			rules: {
        		FactoryID:[
          			{ required: true, message: '请输入一个工厂名称', trigger: 'change' }
        		],
        		IsEnable:[
          			{ required: true,  message: '请输入一个工厂编码号', trigger: 'blur' }
        		],
        		StoreCode:[
          			{ required: true,  message: '请输入联系人电话', trigger: 'blur' }
				],
				StoreName:[
					{ required: true,  message: '请输入联系人姓名', trigger: 'blur' },
				]
			},
			selectstorageform: {
				FactoryID: '',
				StoreCode: '',
				StoreName: '',
			},
			factory: [],
			tableData: [],
			dialogVisible:false,
			dialogtype:0,
			editVisible:true,
		}
	},
	mounted(){
		this.SelFactory();	
	},
	methods: {
		AddStorage(){
			this.editVisible=false
			this.dialogVisible=true;
			this.dialogtype=1;
		},
		EditStorage(factory){
			this.editVisible=true
			
			this.storageform.FactoryID=factory.row.FactoryID;
			this.storageform.StoreCode=factory.row.StoreCode;
			this.storageform.StoreName=factory.row.StoreName;
			this.storageform.IsEnable=factory.row.IsEnable;

			this.dialogVisible=true;
			this.dialogtype=2;
		},
		restForm(){
			this.$nextTick(()=>{
				this.$refs['storageform'].resetFields()
			})
		},
		SelStorage(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			console.log(this.selectstorageform.FactoryID)
			//查询车间
			this.$axios({
        		method: 'post',
        		url:'/FW/Store.ashx',
        		params: {
          			action:"query",
					cid:user.QyNum,
					FactoryID:this.selectstorageform.FactoryID,
					StoreCode:this.selectstorageform.StoreCode,
					StoreName:this.selectstorageform.StoreName
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
		SetStorage(){
			this.$refs['storageform'].validate((isValidate)=>{
				if(isValidate){
					var user = JSON.parse(sessionStorage.getItem('user'));
					this.storageform.CID=user.QyNum
					if(this.dialogtype==1){
						//添加工厂
					this.$axios({
        				method: 'post',
        				url:'/FW/Store.ashx',
        			params: {
          				action:"add",
          				store:this.storageform
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelStorage()
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
        				url:'/FW/Store.ashx',
        			params: {
          				action:"edit",
          				store:this.storageform
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelStorage()
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
	margin:10px 80px;
}
</style>
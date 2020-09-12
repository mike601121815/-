<template>
	<div class="content">
		<div class="item">
			<div class="btn">
				<el-button icon="el-icon-plus" type="primary" @click="AddFactory">添加</el-button>
				<el-button icon="el-icon-search" type="primary"  @click="SelFactory">查询</el-button>
				<el-button type="primary">导出</el-button>
			</div>
			<el-form ref="selectfactoryForm" inline :model="selectfactoryForm" label-width="80px">
				<el-form-item label="工厂编号">
					<el-input v-model="selectfactoryForm.factoryCode"></el-input>
				</el-form-item>
				<el-form-item label="工厂名称">
					<el-input v-model="selectfactoryForm.factoryName"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="selectfactoryForm.isActive" placeholder="请选择">
						<el-option
						v-for="item in state"
						:key="item.value"
						:label="item.lable"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			
		</div>
		<div class="item">
			<el-table :data="tableData" border>
				<el-table-column prop="FactoryName" label="工厂名称"></el-table-column>
				<el-table-column prop="FactoryCode" label="工厂编号"></el-table-column>
				<el-table-column prop="Address" label="工厂地址"></el-table-column>
				<el-table-column prop="IsActive" label="状态"></el-table-column>
				<el-table-column label="操作" >
					<template slot-scope="scope">
						<el-button type="text" @click="EditFactory(scope)">修改</el-button>
						<el-button type="text" @click="delFactory(scope)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog :title="dialogtype==1 ? '添加工厂':'编辑工厂'" :visible.sync="dialogVisible" width="740px">
      		<el-form ref="factoryForm" inline style="width:auto" :model="factoryForm" :rules="rules" label-width="100px">
				<el-form-item label="工厂名称" prop="factoryName">
                    <el-input v-model="factoryForm.factoryName"></el-input>
                </el-form-item>
				<el-form-item label="工厂编号" prop="factoryCode">
					<el-input :disabled="editVisible" v-model="factoryForm.factoryCode"></el-input>
				</el-form-item>
				<el-form-item label="工厂地址" prop="address">
					<el-input v-model="factoryForm.address"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="linkMan">
					<el-input v-model="factoryForm.linkMan"></el-input>
				</el-form-item>
				<el-form-item label="联系人电话" prop="linkTel">
					<el-input v-model="factoryForm.linkTel"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="note">
					<el-input type="textarea" v-model="factoryForm.note"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="isActive">
					<el-radio v-model="factoryForm.isActive" :label="1">启用</el-radio>
  					<el-radio v-model="factoryForm.isActive" :label="0">禁用</el-radio>
				</el-form-item>
			</el-form>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="restForm">重 置</el-button>
        		<el-button type="primary" @click="SetFactory">确 定</el-button>
      		</span>
    	</el-dialog>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			tableData: [],
			state:[{
				value:'0',
				lable:"禁用"
			},{
				value:'1',
				lable:"启用"
			}],
			dialogVisible:false,
			dialogtype:0,
			editVisible:true,
			selectfactoryForm:{
				factoryName:'',//工厂名称
				factoryCode:'',//工厂编号
				activeFlag:'',//状态
			},
			factoryForm:{
				factoryName:'',//工厂名称
				factoryCode:'',//工厂编号
				cid:'',//企业id
				note:'',//备注
				linkTel:'',//电话
				linkMan:'',//联系人
				address:'',//地址
				isActive:'1',//状态
			},
			rules: {
        		factoryName:[
          			{ required: true, message: '请输入一个工厂名称', trigger: 'change' }
        		],
        		factoryCode:[
          			{ required: true,  message: '请输入一个工厂编码号', trigger: 'blur' }
        		],
        		linkTel:[
          			{ required: true,  message: '请输入联系人电话', trigger: 'blur' }
				],
				linkMan:[
					{ required: true,  message: '请输入联系人姓名', trigger: 'blur' },
				],
				address:[
          			{ required: true,  message: '请输入工厂地址', trigger: 'blur' }
				],
			}
		}
	},
	methods: {
		AddFactory(){
			this.editVisible=false
			this.dialogVisible=true;
			this.dialogtype=1;
		},
		EditFactory(factory){
			this.editVisible=true
			this.factoryForm.factoryName=factory.row.FactoryName;
			this.factoryForm.factoryCode=factory.row.FactoryCode;
			this.factoryForm.address=factory.row.Address;
			this.factoryForm.linkTel=factory.row.LinkTel;
			this.factoryForm.linkMan=factory.row.LinkMan;
			this.factoryForm.isActive=factory.row.IsActive;

			this.dialogVisible=true;
			this.dialogtype=2;
		},
		restForm(){
			this.$nextTick(()=>{
				this.$refs['factoryForm'].resetFields()
			})
		},
		SetFactory(){
			this.$refs['factoryForm'].validate((isValidate)=>{
				if(isValidate){
					var user = JSON.parse(sessionStorage.getItem('user'));
					this.factoryForm.cid=user.QyNum
					if(this.dialogtype==1){
						//添加工厂
					this.$axios({
        				method: 'post',
        				url:'/FW/Factory.ashx',
        			params: {
          				action:"add",
          				factory:this.factoryForm
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelFactory()
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
        				url:'/FW/Factory.ashx',
        			params: {
          				action:"edit",
          				factory:this.factoryForm
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelFactory()
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
		SelFactory(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			//查询工厂
			this.$axios({
        		method: 'post',
        		url:'/FW/Factory.ashx',
        		params: {
          			action:"query",
					cid:user.QyNum,
					factoryName:this.selectfactoryForm.factoryName,
					factoryCode:this.selectfactoryForm.factoryCode,
					activeFlag:this.selectfactoryForm.isActive
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
		delFactory(factory){
					//修改工厂
					this.$axios({
        				method: 'post',
        				url:'/FW/Factory.ashx',
        			params: {
          				action:"delete",
          				factory:factory.row
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelFactory()
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
	margin:10px 80px;
}
</style>
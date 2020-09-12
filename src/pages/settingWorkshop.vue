<template>
	<div class="content">
		<div class="item">
			<div class="btn">
				<el-button icon="el-icon-plus" type="primary" @click="AddWorkShop">添加</el-button>
				<el-button icon="el-icon-search" type="primary" @click="SelWorkShop">查询</el-button>
				<el-button type="primary">导出</el-button>
			</div>
			<el-form inline ref="selectworkshopForm" style="width:auto" :model="selectworkshopForm" label-width="80px">
				<el-form-item label="工厂名称">
					<el-select v-model="selectworkshopForm.factoryID" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.FactoryCode"
						:label="item.FactoryName"
						:value="item.FactoryCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车间编号">
					<el-input v-model="selectworkshopForm.WorkshopId"></el-input>
				</el-form-item>
				<el-form-item label="车间名称">
					<el-input v-model="selectworkshopForm.WorkshopName"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="item" >
			<el-table :data="tableData" border>
				<el-table-column prop="FactoryId" label="工厂编号"></el-table-column>
				<el-table-column prop="Workshopcode" label="车间编号"></el-table-column>
				<el-table-column prop="Workshopname" label="车间名称"></el-table-column>
				<el-table-column prop="IsEnable" label="状态"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="EditWorkShop(scope)">修改</el-button>
						<el-button type="text" @click="delWorkShop(scope)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog :title="dialogtype==1 ? '添加车间':'编辑车间'" :visible.sync="dialogVisible" width="740px">
      		<el-form ref="workshopform" inline style="width:auto" :model="workshopform" :rules="rules" label-width="100px">
				<el-form-item label="工厂名称" prop="factoryID">
                    <el-select v-model="workshopform.factoryID" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.FactoryCode"
						:label="item.FactoryName"
						:value="item.FactoryCode">
						</el-option>
					</el-select>
                </el-form-item>
				<el-form-item :disabled="editVisible" label="车间编号" prop="Workshopcode">
					<el-input v-model="workshopform.Workshopcode"></el-input>
				</el-form-item>
				<el-form-item label="车间名称" prop="WorkshopName">
					<el-input v-model="workshopform.WorkshopName"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="note">
					<el-input v-model="workshopform.note"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="IsEnable">
					<el-radio v-model="workshopform.IsEnable" label='1'>启用</el-radio>
  					<el-radio v-model="workshopform.IsEnable" label='0'>禁用</el-radio>
				</el-form-item>
			</el-form>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="restForm">重 置</el-button>
        		<el-button type="primary" @click="SetWorkShop">保 存</el-button>
      		</span>
    	</el-dialog>
	</div>
</template>

<script>
export default {
	data(){
		return {
			workshopform: {
				factoryID: '',
				Workshopcode: '',
				WorkshopName: '',
				cid:'',
				note:'',
				IsEnable:'1'
			},
			rules: {
        		factoryID:[
          			{ required: true, message: '请选择一个工厂', trigger: 'change' }
        		],
        		Workshopcode:[
          			{ required: true,  message: '请选择一个车间', trigger: 'blur' }
        		],
        		WorkshopName:[
          			{ required: true,  message: '请输入一个生产线编号', trigger: 'blur' }
				]
			},
			selectworkshopForm:{
				factoryID:'',//工厂名称
				WorkshopId:'',//车间编号
				WorkshopName:'',//车间名
			},
			dialogVisible:false,
			dialogtype:0,
			editVisible:true,
			factory:{},//工厂
			tableData: []
		}
	},mounted : function(){
		this.SelFactory();	
	},methods: {
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
		AddWorkShop(){
			this.editVisible=false
			this.dialogVisible=true;
			this.dialogtype=1;
		},
		EditWorkShop(workshop){
			this.editVisible=true
			this.workshopform.factoryID=workshop.row.FactoryID;
			this.workshopform.Workshopcode=workshop.row.Workshopcode;
			this.workshopform.WorkshopName=workshop.row.Workshopname;
			this.workshopform.note=workshop.row.Note;
			this.workshopform.IsEnable=workshop.row.IsEnable;

			this.dialogVisible=true;
			this.dialogtype=2;
		},
		restForm(){
			this.$nextTick(()=>{
				this.$refs['workshopform'].resetFields()
			})
		},
		SetWorkShop(){
			this.$refs['workshopform'].validate((isValidate)=>{
				if(isValidate){
					var user = JSON.parse(sessionStorage.getItem('user'));
					this.workshopform.cid=user.QyNum
					if(this.dialogtype==1){
						//添加工厂
					this.$axios({
        				method: 'post',
        				url:'/FW/WorkShop.ashx',
        			params: {
          				action:"add",
          				workshop:this.workshopform
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelWorkShop()
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
        				url:'/FW/WorkShop.ashx',
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
							this.SelWorkShop()
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
		SelWorkShop(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			//查询工厂
			this.$axios({
        		method: 'post',
        		url:'/FW/WorkShop.ashx',
        		params: {
          			action:"query",
					cid:user.QyNum,
					factoryID:this.selectworkshopForm.factoryID,
					workshopName:this.selectworkshopForm.WorkshopId,
					workshopID:this.selectworkshopForm.WorkshopName,
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
		delWorkShop(scope){
			//修改工厂
					this.$axios({
        				method: 'post',
        				url:'/FW/WorkShop.ashx',
        			params: {
          				action:"delete",
          				workshop:scope.row
        			}
        			}).then(res=>{
          				if(res.Code==0){
							this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
							});
							this.SelWorkShop()
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
	margin: 20px 0;
	padding: 20px;
	border: 1px solid #e3e3e3;
}
.btn{
	width: 500px;
	margin:10px 80px;
}
</style>
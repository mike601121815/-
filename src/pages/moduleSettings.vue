<template>
	<div class="content">
		<el-button type="primary" style="margin: 20px 0 10px 0;"
		icon="el-icon-plus" @click="AddModule">添加</el-button>
		<el-table :data="tableData" border row-key="ModuleId" :header-cell-style="{'text-align':'center'}"
		:tree-props="{children: 'Child', hasChildren: 'hasChildren'}">>
				<el-table-column prop="ModuleName" align="left" label="模块名称"></el-table-column>
				<el-table-column prop="ModuleId" align="center"  label="模块编号"></el-table-column>
                <el-table-column prop="WebPageUrl" align="center"  label="模块路径"></el-table-column>
				<el-table-column align="center"  label="模块状态">
					<template slot-scope="scope">
						{{scope.row.Status ? '启用' : '禁止'}}
					</template>
				</el-table-column>
				<el-table-column align="center"  label="图标">
					<template slot-scope="scope">
						<i :class="scope.row.icon" style="font-size:22px"></i>
					</template>
				</el-table-column>
				<el-table-column align="center"  prop="SeqNo" label="模块序号"></el-table-column>
				<el-table-column align="center"  prop="UserName" label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="UpdateModule(scope)" size="small">编辑</el-button>
						<el-button type="text" @click="DeleteModule(scope)" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		<el-dialog :title="dialogtype==1 ? '添加模块':'编辑模块'" :visible.sync="dialogVisible" width="740px">
      		<el-form ref="form" inline style="width:auto" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="模块编号" prop="ModuleId">
                    <el-input v-model="form.ModuleId"></el-input>
                </el-form-item>
				<el-form-item label="模块名称" prop="ModuleName">
					<el-input v-model="form.ModuleName"></el-input>
				</el-form-item>
				<el-form-item label="模块路径" prop="WebPageUrl">
					<el-input v-model="form.WebPageUrl"></el-input>
				</el-form-item>
				<el-form-item label="所属父模块" prop="ParentModuleId">
					<el-select v-model="form.ParentModuleId" placeholder="请选择">
    					<el-option
      						v-for="item in tableData"
      						:key="item.ModuleId"
      						:label="item.ModuleName"
      						:value="item.ModuleId">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="模块图标" prop="icon">
					<el-select v-model="form.icon" clearable placeholder="请选择">
						<el-option v-for="item in icons" 
						:key="item.value"
      					:label="item.label" 
						:value="item.value">
							<i :class="item.value" style="font-size:22px"></i>
							<span>{{item.value}}</span>
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="模块序号" prop="SeqNo">
					<el-input v-model="form.SeqNo"></el-input>
				</el-form-item>
				<el-form-item label="模块状态" prop="Status" style="line-height: 40px;text-align: center;">
					<el-radio v-model="form.Status" label="0">启用</el-radio>
  					<el-radio v-model="form.Status" label="1">禁用</el-radio>
				</el-form-item>
			</el-form>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="restForm">重 置</el-button>
        		<el-button type="primary" @click="SetMoudle">确 定</el-button>
      		</span>
    	</el-dialog>
	</div>
</template>

<script>
import modulesicon from '../utils/name.json';
export default {
	data(){
		return {
			form:{
				ModuleId:'',
				ModuleName:'',
				WebPageUrl:'',
				ParentModuleId:'',
				icon:'',
				SeqNo:'',
				Status:'1'
			},
			rules: {
        		ModuleId:[
          			{ required: true, message: '请输入模块编号', trigger: 'blur' }
        		],
        		ModuleName:[
          			{ required: true,  message: '请输入模块名称', trigger: 'blur' }
        		],
        		WebPageUrl:[
          			{ required: true,  message: '请输入模块路径', trigger: 'blur' }
        		],
        		ParentModuleId:[
          			{ required: true,  message: '请选择所属父模块', trigger: ['blur','change'] }
        		],
        		icon:[
          			{ required: true,  message: '请选择模块图标', trigger:  ['blur','change'] }
        		],
        		SeqNo:[
          			{ required: true,  message: '请输入模块序号', trigger: 'blur' }
        		]
      		},
			tableData: [],
			dialogVisible: false,
			dialogtype:0,
			icons:[],
		};
	},
	mounted : function(){
		this.GetModules();
		for(let i in modulesicon){
			this.icons.push({
				lable:modulesicon[i]._prevClass,
				value:modulesicon[i]._prevClass
			})
		}
	},
	methods: {
		restForm(){
			this.$nextTick(()=>{
				this.$refs['form'].resetFields()
			})
		},
		GetModules(){
			this.$axios({
        	method: 'post',
        	url:'/FW/RoleAssign.ashx',
        	params: {
          		action:"getModules"
        	}
        	}).then(res=>{
				console.log(res)
          		if(res.Code==0){
            	this.tableData=res.Data;
          		}else{
					this.$message({
            			showClose: true,
            			message:res.Msg,
            			type: 'warning'
            		});
          		}       
      		})
		},
		
		AddModule(){
			this.dialogVisible=true;
			this.dialogtype=1;
		},
		UpdateModule(scope){
			this.dialogVisible=true;
			this.dialogtype=2;
			this.form=scope.row
		},
		SetMoudle(){
			this.$refs['form'].validate((isValidate)=>{
				console.log(isValidate)
				if(isValidate){

				}else{
					isValidate
				}
			})
			return
			if(this.dialogtype==1){
				this.$axios({
        			method: 'post',
        			url:'/FW/SetMoldules.ashx',
        			params: {
						  action:"AddModule",
						  form:this.form
        			}
        		}).then(res=>{
					console.log(res)
          			if(res.Code==0){
						this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
            			});
          			}else{
						this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'warning'
            			});
          			}       
      			})
			}else if(this.dialogtype==2){
				this.$axios({
        			method: 'post',
        			url:'/FW/SetMoldules.ashx',
        			params: {
						  action:"UpdateModule",
						  form:this.form
        			}
        		}).then(res=>{
					console.log(res)
          			if(res.Code==0){
						this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
            			});
          			}else{
						this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'warning'
            			});
          			}       
      			})
			}
			
		},
		DeleteModule(scope){
			this.$axios({
        			method: 'post',
        			url:'/FW/SetMoldules.ashx',
        			params: {
						  action:"DeleteModule",
						  form:this.form
        			}
        		}).then(res=>{
					console.log(res)
          			if(res.Code==0){
						this.$message({
            				showClose: true,
            				message:res.Msg,
            				type: 'success'
            			});
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
	padding: 10px;
	border: 1px solid #e3e3e3;
}
</style>

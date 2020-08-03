<template>
	<div class="content">
		<div class="item">
			<h3>用户添加</h3>
			<el-form ref="form" style="width:auto" :model="form" :rules="rules" label-width="150px">
				<el-form-item label="工厂名称" prop="factoryID">
					<el-select v-model="form.factoryID" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.FactoryID"
						:label="item.FactoryName"
						:value="item.FactoryID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="confirm">
					<el-input v-model="form.confirm" ></el-input>
				</el-form-item>
				<el-form-item label="真实姓名" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio v-model="form.sex" label="1">男</el-radio>
  					<el-radio v-model="form.sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="选择仓库" prop="warehouse">
					<el-select v-model="form.warehouse" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-radio v-model="form.state" label="1">启用</el-radio>
  					<el-radio v-model="form.state" label="0">禁用</el-radio>
				</el-form-item>
				<el-form-item label="是否为经销商" prop="isAgcy">
					<el-radio v-model="form.isAgcy" label="1">是</el-radio>
  					<el-radio v-model="form.isAgcy" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="经销商" prop="Agcyname">
					<el-input v-model="form.Agcyname"></el-input>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary" @click="AddUserInfo('form')">保存</el-button>
			</div>
		</div>
		<div class="item" >
			<h3>用户查询</h3>
			<el-table :data="tableData" border>
				<el-table-column prop="UserName" label="用户名"></el-table-column>
				<el-table-column prop="DisplayName" label="真实姓名"></el-table-column>
				<el-table-column label="性别">
					<template slot-scope="scope">
						{{scope.row.UserGender ? '男' : '女'}}
					</template>
				</el-table-column>
				<el-table-column prop="UserTel" label="联系电话"></el-table-column>
				<el-table-column prop="UserStatus" label="状态"></el-table-column>
				<el-table-column prop="UserType" label="用户类型"></el-table-column>
				<el-table-column prop="" label="负责经销商"></el-table-column>
				<el-table-column prop="UserName" label="角色设置">
					<template slot-scope="scope">
						<el-button type="text" @click="GetRole(scope.row)" size="small">设置</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="UserName" label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="UpdataUser(scope)" size="small">编辑</el-button>
						<el-button type="text" @click="DisableUser(scope)" size="small">禁用</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="设置角色" :visible.sync="dialogVisible" width="30%">
      		<el-table ref="multipleTable" highlight-current-row
    @current-change="handleCurrentChange" @select="selectChange" @selection-change="handleSelectionChange" :data="roles" border>
				<!-- <el-table-column>
					<template slot-scope="scope">
						<el-checkbox @change="checkboxChange(scope.row)" v-model="scope.row.checked"></el-checkbox>
					</template>
				</el-table-column> -->
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="RoleName" label="角色"></el-table-column>
				<el-table-column prop="Remark" label="角色描述"></el-table-column>
			</el-table>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="dialogVisible = false">取 消</el-button>
        		<el-button type="primary" @click="SetRole">确 定</el-button>
      		</span>
    	</el-dialog>
	</div>
</template>

<script>
import {validateTwoPhone} from '../utils/rules'
export default {
	data(){
		var ruleconfirm = (rule, value, callback) => {
        	if (value === '') {
          		callback(new Error('请再次输入密码'));
        	} else if (value !== this.form.password) {
          		callback(new Error('两次输入密码不一致!'));
        	} else {
          		callback();
        	}
      		};
		return {
			form:{
				CID:'',
				factoryID:'',
				username:'',
				password:'',
				confirm:'',
				name:'',
				sex:'1',
				tel:'',
				warehouse:'',
				state:'1',
				isAgcy:'1',
				Agcyname:''
			},
			
			rules: {
        		factoryID:[
          			{ required: true, message: '请选择正确的工厂', trigger: 'change' }
        		],
        		username:[
          			{ required: true,  message: '请输入用户名', trigger: 'blur' }
        		],
        		password:[
          			{ required: true,  message: '请输入密码', trigger: 'blur' }
				],
				confirm:[
					{ required: true,  message: '请输入确认密码', trigger: 'blur' },
					{ validator: ruleconfirm,trigger: "blur"}
				],
				name:[
          			{ required: true,  message: '请输入真实姓名', trigger: 'blur' }
				],
				tel:[
					{ required: true,  message: '请输入联系电话', trigger: 'blur' },
					{ validator: validateTwoPhone,trigger: "blur"}
				],
				warehouse:[
					{ required: true,  message: '请选择仓库', trigger: 'blur' }
				],
				Agcyname:[
					{ required: true,  message: '请输入经销商', trigger: 'blur' }
				],
      		},
			options:[],
			tableData: [],
			dialogVisible: false,
			roles:[],
			multipleSelection:[],
			userId:null,
			roleId:null,
		};
	},
	mounted : function(){
		var user = JSON.parse(sessionStorage.getItem('user'));
		this.form.CID=user.QyNum;
		this.GetFactory(user.QyNum);
		this.GetUsers(user.QyNum);
	},
	methods: {
		selectChange(selection, row){
			this.$refs.multipleTable.clearSelection();
			this.$refs.multipleTable.toggleRowSelection(row)
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleCurrentChange(row,oldrow){
			this.$refs.multipleTable.clearSelection();
			this.$refs.multipleTable.toggleRowSelection(row)
			this.roleId = row.RoleId
		},
		GetFactory(CID){
			this.$axios({
        	method: 'post',
        	url:'/FW/SettingUser.ashx',
        	params: {
          		action:"GetFactory",
          		CID:CID
        	}
        	}).then(res=>{
          		if(res.Code==0){
            	this.options=res.Data;
          		}else{
					this.$message({
            			showClose: true,
            			message:res.Msg,
            			type: 'warning'
            		});
          		}       
      		})
		},
		Getwarehouse(){

		},
		AddUserInfo(form){
			this.$refs[form].validate((valid) => {
          		if (valid) {
					  this.$axios({
        			method: 'post',
        			url:'/FW/SettingUser.ashx',
        			params: {
          				action:"AddUserInfo",
          				form:this.form
        			}
        		}).then(res=>{
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
          		} else {
            		console.log('error submit!!');
            		return false;
          		}
        	});
		},
		GetUsers(CID){
			this.$axios({
        	method: 'post',
        	url:'/FW/SettingUser.ashx',
        	params: {
          		action:"GetUsers",
          		CID:CID
        	}
        	}).then(res=>{
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
		GetRole(data){
			this.dialogVisible=true;
			this.userId = data.UserId
			//初始化获取角色
      		this.$axios({
        		method: 'post',
        		url:'/FW/RoleAssign.ashx',
        		params: {
          			action:"getRoles"
        		}
      		})
      		.then(res=>{
        		if(res.Code==0){
          			this.roles=res.Data
        		}else{
          			this.$message({
            			showClose: true,
            			message:res.Msg,
            			type: 'warning'
            		});
        		}      
      		})
		},
		SetRole(){
			console.log(this.userId,this.roleId)
			this.$axios({
        		method: 'post',
        		url:'/FW/SettingUser.ashx',
        		params: {
					  action:"SetRole",
					  UserId:this.userId,
					  RoleId:this.roleId
        		}
      		})
      		.then(res=>{
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
		},
		UpdataUser(scope){
			console.log(scope.row)
		},
		DisableUser(scope){

		}
	}
}
</script>

<style scoped>
h3{
	margin:10px; 
	font-size:1.17em
}
.title{
  text-align: left;
}
.item{
	margin: 20px 0;
	padding: 10px;
	border: 1px solid #e3e3e3;
}
.btn{
	width: 500px;
	margin:0 150px;
}
</style>
<style>
.el-form-item {
    margin-bottom: 20px;
}
.cell{
	text-align: center;
}
.el-form-item {
    width: 300px;
    display: inline-block;
}
.el-form-item__content {
	text-align: center;
	line-height: 40px;
}
.el-table th.gutter{    
    display: table-cell !important;
}
.el-dialog__body {
    padding: 0px 20px;
}

</style>
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
				<el-form-item label="确认密码">
					<el-input v-model="form.confirm"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio v-model="form.sex" label="1">男</el-radio>
  					<el-radio v-model="form.sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="选择仓库">
					<el-select v-model="form.warehouse" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio v-model="form.state" label="1">启用</el-radio>
  					<el-radio v-model="form.state" label="2">禁用</el-radio>
				</el-form-item>
				<el-form-item label="是否为经销商">
					<el-radio v-model="form.isAgcy" label="1">是</el-radio>
  					<el-radio v-model="form.isAgcy" label="2">否</el-radio>
				</el-form-item>
				<el-form-item label="经销商">
					<el-input v-model="form.Agcyname"></el-input>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary" @click="AddUserInfo">保存</el-button>
			</div>
		</div>
		<div class="item" >
			<h3>用户查询</h3>
			<el-table :data="tableData" border>
				<el-table-column label="用户名"></el-table-column>
				<el-table-column label="真实姓名"></el-table-column>
				<el-table-column label="性别"></el-table-column>
				<el-table-column label="联系电话"></el-table-column>
				<el-table-column label="状态"></el-table-column>
				<el-table-column label="用户类型"></el-table-column>
				<el-table-column label="负责经销商"></el-table-column>
				<el-table-column label="角色设置"></el-table-column>
				<el-table-column label="操作">
					<template>
						<el-button type="text">添加</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			form:{
				CID:'',
				factoryID:'',
				username:'',
				password:'',
				confirm:'',
				name:'',
				sex:'',
				tel:'',
				warehouse:'',
				state:'',
				isAgcy:'',
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
        		]
      		},
			options:[],
			tableData: [],
			
		};
	},
	mounted : function(){
		var user = JSON.parse(sessionStorage.getItem('user'));
		this.form.CID=user.QyNum;
		this.GetFactory(user.QyNum);
	},
	methods: {
		GetFactory(CID){
			this.$axios({
        	method: 'post',
        	url:'/FW/SettingUser.ashx',
        	params: {
          		action:"GetFactory",
          		CID:CID
        	}
        	}).then(res=>{
          		console.log(res);
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
		AddUserInfo(){
			if(this.form.password==this.form.confirm){
				this.$axios({
        			method: 'post',
        			url:'/FW/SettingUser.ashx',
        			params: {
          				action:"AddUserInfo",
          				form:this.form
        			}
        		}).then(res=>{
          			console.log(res);
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
		GetUsers(){
			this.$axios({
        	method: 'post',
        	url:'/FW/SettingUser.ashx',
        	params: {
          		action:"GetUsers",
          		CID:CID
        	}
        	}).then(res=>{
          		console.log(res);
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
</style>
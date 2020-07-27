<template>
	<div class="content">
		<el-button type="primary" style="margin: 20px 0 10px 0;" @click="dialogVisible = true">添加</el-button>
		<el-table :data="tableData" border>
				<el-table-column prop="" label="模块名称"></el-table-column>
				<el-table-column prop="" label="模块编号"></el-table-column>
                <el-table-column prop="" label="模块路径"></el-table-column>
				<el-table-column label="模块状态">
					<template slot-scope="scope">
						{{scope.row ? '启用' : '禁止'}}
					</template>
				</el-table-column>
				<el-table-column prop="" label="图标"></el-table-column>
				<el-table-column prop="" label="模块序号"></el-table-column>
				<el-table-column prop="UserName" label="操作">
					<template>
						<el-button type="text"  size="small">编辑</el-button>
						<el-button type="text"  size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		<el-dialog title="编辑模块" :visible.sync="dialogVisible" width="40%">
      		<el-form ref="form" style="width:auto" :model="form" :rules="rules" label-width="150px">
				<el-form-item label="模块编号" prop="">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
				<el-form-item label="模块名称" prop="">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="模块路径" prop="">
					<el-input v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item label="所属父模块">
					<el-input v-model="form.confirm"></el-input>
				</el-form-item>
				<el-form-item label="模块图标">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="模块序号">
					<el-radio v-model="form.sex" label="1">男</el-radio>
  					<el-radio v-model="form.sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="模块状态">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
			</el-form>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="dialogVisible = false">重 置</el-button>
        		<el-button type="primary" >确 定</el-button>
      		</span>
    	</el-dialog>
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
			tableData: [],
			dialogVisible: false,
		};
	},
	mounted : function(){
		this.GetModules();
	},
	methods: {
		
		
		GetModules(){
			this.$axios({
        	method: 'post',
        	url:'/FW/SettingModules.ashx',
        	params: {
          		action:"GetModules"
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
.el-table th.gutter{    
    display: table-cell !important;
}
</style>
<style>

</style>

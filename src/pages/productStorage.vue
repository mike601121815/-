<template>
	<div class="content">
		<div >
			<h3>创建入库单</h3>
			<div class="btn">
				<el-button type="primary" @click="SelectStorage">查询</el-button>
				<el-button type="primary" @click="AddStorage">创建入库单</el-button>
			</div>
			<div style="margin:0 0 0 20px">
				<el-form ref="form" inline style="width:auto" :model="form" :rules="rules" label-width="auto">
				<el-form-item label="入库单号" prop="username">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="单据类型" prop="factoryID">
					<el-select v-model="form.factoryID" placeholder="请选择">
						<el-option
						v-for="item in storage"
						:key="item.type"
						:label="item.storage"
						:value="item.type">
						</el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="入库库房" prop="password">
					<el-select v-model="form.factoryID" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.FactoryID"
						:label="item.FactoryName"
						:value="item.FactoryID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="建单时间">
					<el-date-picker
						v-model="form.starttime" value-format="yyyy-MM-dd"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="至">
					<el-date-picker
						v-model="form.starttime" value-format="yyyy-MM-dd"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
			</el-form>
			</div>
		</div>
		<div >
			<el-table :data="tableData" align="center" border>
				<el-table-column prop="UserName" label="入库单号"></el-table-column>
				<el-table-column prop="DisplayName" label="单据类型"></el-table-column>
				<el-table-column label="入库时间"></el-table-column>
				<el-table-column prop="UserTel" label="入库库房"></el-table-column>
				<el-table-column prop="UserStatus" label="退货经销商"></el-table-column>
				<el-table-column prop="UserType" label="操作员"></el-table-column>
				<el-table-column prop="" label="是否下载">
					<template slot-scope="scope">
						{{scope.row.UserGender ? '是' : '否'}}
					</template>
				</el-table-column>
				<el-table-column prop="UserName" label="操作">
					<template>
						<el-button type="text" @click="UpdataStorage" size="small">修改</el-button>
						<el-button type="text" @click="DisableStorager" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="创建入库单" :visible.sync="dialogVisible" width="60%">
      		<el-form ref="form" inline style="width:auto" :model="form" :rules="rules" label-width="100px">
				<h3 style="border-width: 0 0 1px;border-style: solid;">单据基础信息</h3>
				<el-form-item label="入库单号" prop="factoryID">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="入库时间" prop="username">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="入库类型" prop="password">
					<el-select v-model="form.factoryID" placeholder="请选择">
						<el-option
						v-for="item in storage"
						:key="item.type"
						:label="item.storage"
						:value="item.type">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="入库库房">
					<el-select v-model="form.warehouse" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<h3 style="border-width: 0 0 1px;border-style: solid;">单据明细信息</h3>
				<el-form-item label="产品">
					<el-select v-model="form.warehouse" placeholder="请选择">
						<el-option
						v-for="item in factory"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="拖数量">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="箱数量">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="盒数量">
					<el-input v-model="form.confirm"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button type="primary" @click="DisableStorager" size="small">添加到明细</el-button>
				</el-form-item>
				
			</el-form>
			<div >
				<el-table :data="tableData" align="center" border>
					<el-table-column prop="UserName" label="序号"></el-table-column>
					<el-table-column prop="DisplayName" label="产品编号"></el-table-column>
					<el-table-column label="产品名称"></el-table-column>
					<el-table-column prop="UserTel" label="包装"></el-table-column>
					<el-table-column prop="UserStatus" label="拖数量"></el-table-column>
					<el-table-column prop="UserType" label="箱数量"></el-table-column>
					<el-table-column prop="" label="盒数量"></el-table-column>
					<el-table-column prop="UserName" label="操作">
						<template>
							<el-button type="text" @click="UpdataStorage" size="small">修改</el-button>
							<el-button type="text" @click="DisableStorager" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

      		<span slot="footer" class="dialog-footer">
        		<el-button @click="dialogVisible = false">添加后继续</el-button>
        		<el-button type="primary" @click="SetStorage">添加后返回</el-button>
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
			factory:[],
			storage:[{
				type:0,
				storage:"生产入库"
			},{
				type:1,
				storage:"退货入库"
			}],
			tableData: [],
			dialogVisible: false
		};
	},
	mounted : function(){
		var user = JSON.parse(sessionStorage.getItem('user'));
		this.form.CID=user.QyNum;

	},
	methods: {
		SelectStorage(){},
		AddStorage(){
			this.dialogVisible=true;
		},
		UpdataStorage(){},
		DisableStorager(){},
		SetStorage(){

			this.dialogVisible=false;
		}
	}
}
</script>

<style scoped>
h3{
	margin:10px; 
	font-size:1.17em;
}
.title{
  text-align: left;
}
.content{
	margin:10px;
	border: 1px solid #e3e3e3;
}
.btn{
	margin:0 0 10px 30px;
}
.el-dialog__body {
    padding: 0px 20px;
}
</style>
<style>
.el-form--inline .el-form-item__content {
    width: 150px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 150px;
}
.el-dialog__body {
    padding: 0px 20px;
}
</style>
<template>
	<div class="content">
		<div class="item">
			<div class="btn">
				<el-button icon="el-icon-plus" type="primary" @click="AddProduct">添加</el-button>
				<el-button icon="el-icon-search" type="primary">查询</el-button>
				<el-button type="primary">导出</el-button>
			</div>
			<el-form ref="form" :inline="true" :model="form" label-width="80px">
				<el-form-item label="产品名称">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="产品编号">
					<el-input v-model="form.username" clearble></el-input>
				</el-form-item>
				<el-form-item label="包装比例">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in state"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<div class="item">
			<el-table :data="tableData" border>
				<el-table-column align="center" label="产品编号"></el-table-column>
				<el-table-column align="center" label="产品名称"></el-table-column>
				<el-table-column align="center" label="包装规格"></el-table-column>
				<el-table-column align="center" label="状态"></el-table-column>
				<el-table-column align="center" label="操作">
					<template>
						<el-button type="text">查看</el-button>
						<el-button type="text">删除</el-button>
						<el-button type="text">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog :title="dialogtype==1 ? '添加产品':'编辑产品'" :visible.sync="dialogVisible" width="740px">
      		<el-form ref="form" inline style="width:auto" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="产品编号" prop="ModuleId">
                    <el-input v-model="form.ModuleId"></el-input>
                </el-form-item>
				<el-form-item label="产品名称" prop="ModuleName">
					<el-input v-model="form.ModuleName"></el-input>
				</el-form-item>
				<el-form-item label="产品类型" prop="WebPageUrl">
					<el-input v-model="form.WebPageUrl"></el-input>
				</el-form-item>
				<el-form-item label="商品条码" prop="SeqNo">
					<el-input v-model="form.SeqNo"></el-input>
				</el-form-item>
				<el-form-item label="查询结果" prop="SeqNo" style="width: 642px;">
					<el-input v-model="form.SeqNo" style="width: 533px;"></el-input>
				</el-form-item>
				<el-form-item label="产品简介" prop="SeqNo" style="width: 642px;">
					<el-input type="textarea" v-model="form.SeqNo" style="width: 533px;"></el-input>
				</el-form-item>
				<el-form-item label="产品图片" prop="SeqNo" style="width: 642px;">
					<el-input v-model="form.SeqNo" style="width: 533px;"></el-input>
				</el-form-item>
				<el-form-item label="扩展属性" prop="SeqNo" style="width: 642px;">
					<span style="width: 543px;display: block;">
						* 如果添加购买地址请将属性名称设为 地址名称+"_buy_site" 格式，如天猫购买地址属性名称应为："天猫_buy_site"</span>
					<el-input v-model="form.SeqNo" style="width: 533px;"></el-input>
				</el-form-item>
				<el-form-item label="包装信息" prop="SeqNo">
					<el-select v-model="form.value" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button style="margin-left:20px;" @click="dialogPack=true">增加包装比例</el-button>
				</el-form-item>
			</el-form>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="restForm">重 置</el-button>
        		<el-button type="primary" @click="SetProduct">确 定</el-button>
      		</span>
    	</el-dialog>
		<el-dialog title="包装比例设置-添加" :visible.sync="dialogPack" width="360px">
			<el-form ref="form" style="width:auto" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="包装层级">
                    <el-input v-model="form.ModuleId"></el-input>
                </el-form-item>
				<el-form-item label="三级包装数量">
                    <el-input v-model="form.ModuleId"></el-input>
                </el-form-item>
				<el-form-item label="二级包装数量">
                    <el-input v-model="form.ModuleId"></el-input>
                </el-form-item>
				<el-form-item label="一级包装数量">
                    <el-input v-model="form.ModuleId"></el-input>
                </el-form-item>
				<el-form-item label="比例表单式">
                    <el-input v-model="form.ModuleId"></el-input>
                </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        		<el-button @click="reback">返 回</el-button>
        		<el-button type="primary" @click="SetPack">提 交</el-button>
      		</span>
		</el-dialog>
		</div>
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
			state: [{
				value: 0,
				label: '禁用'
				}, {
				value: 1,
				label: '启用'
			}],
			tableData: [],
			dialogVisible:false,
			dialogtype:0,
			dialogPack:false,
		}
	},
	methods: {
		AddProduct(){
			this.dialogVisible=true;
			this.dialogtype=1;
		},
		restForm(){
			this.$nextTick(()=>{
				this.$refs['form'].resetFields()
			})
		},
		SetProduct(){
			this.$refs['form'].validate((isValidate)=>{
				console.log(isValidate)
				if(isValidate){

				}else{
					isValidate
				}
			})
		},
		reback(){this.dialogPack=false;},
		setPack(){
			
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
.el-input,.el-select{
	width:220px;
}
</style>
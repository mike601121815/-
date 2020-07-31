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
		<el-dialog :title="dialogtype==1 ? '添加模块':'编辑模块'" :visible.sync="dialogVisible" width="40%">
      		<el-form ref="form" style="width:auto" :model="form" :rules="rules" label-width="90px">
				<el-form-item label="模块编号" prop="">
                    <el-input v-model="form.ModuleId"></el-input>
                </el-form-item>
				<el-form-item label="模块名称" prop="">
					<el-input v-model="form.ModuleName"></el-input>
				</el-form-item>
				<el-form-item label="模块路径" prop="">
					<el-input v-model="form.WebPageUrl"></el-input>
				</el-form-item>
				<el-form-item label="所属父模块">
					<el-select v-model="form.ParentModuleId" placeholder="请选择">
    					<el-option
      						v-for="item in tableData"
      						:key="item.ModuleId"
      						:label="item.ModuleName"
      						:value="item.ModuleId">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="模块图标">
					<el-select v-model="form.icon" clearable placeholder="请选择">
						<el-option v-for="item in icons" :key="item.value"
      						:label="item.label" :value="item.value">
							  	<i :class="item.value" style="font-size:22px"></i>
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="模块序号">
					<el-input v-model="form.SeqNo"></el-input>
				</el-form-item>
				<el-form-item label="模块状态">
					<el-radio v-model="form.Status" label="0">启用</el-radio>
  					<el-radio v-model="form.Status" label="1">禁用</el-radio>
				</el-form-item>
			</el-form>
      		<span slot="footer" class="dialog-footer">
        		<el-button @click="dialogVisible = false">重 置</el-button>
        		<el-button type="primary" @click="SetMoudle">确 定</el-button>
      		</span>
    	</el-dialog>
	</div>
</template>

<script>
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
				Status:''
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
			dialogtype:0,
			icons:[{
				value:'el-icon-platform-eleme',
				label: 'el-icon-platform-eleme'
			},{
				value:'el-icon-eleme',
				label: 'el-icon-eleme'
			},{
				value:'el-icon-delete-solid',
				label: 'el-icon-delete-solid'
			},{
				value:'el-icon-delete',
				label: 'el-icon-delete'
			},{
				value:'el-icon-s-tools',
				label: 'el-icon-s-tools'
			},{
				value:'el-icon-setting',
				label: 'el-icon-setting'
			},{
				value:'el-icon-user-solid',
				label: 'el-icon-user-solid'
			},{
				value:'el-icon-user',
				label: 'el-icon-user'
			},{
				value:'el-icon-phone',
				label: 'el-icon-phone'
			},{
				value:'el-icon-phone-outline',
				label: 'el-icon-phone-outline'
			},{
				value:'el-icon-more',
				label: 'el-icon-more'
			},{
				value:'el-icon-more-outline',
				label: 'el-icon-more-outline'
			},{
				value:'el-icon-star-on',
				label: 'el-icon-star-on'
			},{
				value:'el-icon-star-off',
				label: 'el-icon-star-off'
			},{
				value:'el-icon-s-goods',
				label: 'el-icon-s-goods'
			},{
				value:'el-icon-goods',
				label: 'el-icon-goods'
			},{
				value:'el-icon-warning',
				label: 'el-icon-warning'
			},{
				value:'el-icon-warning-outline',
				label: 'el-icon-warning-outline'
			},{
				value:'el-icon-question',
				label: 'el-icon-question'
			},{
				value:'el-icon-info',
				label: 'el-icon-info'
			},{
				value:'el-icon-remove',
				label: 'el-icon-remove'
			},{
				value:'el-icon-circle-plus',
				label: 'el-icon-circle-plus'
			},{
				value:'el-icon-success',
				label: 'el-icon-success'
			},{
				value:'el-icon-error',
				label: 'el-icon-error'
			},{
				value:'el-icon-zoom-in',
				label: 'el-icon-zoom-in'
			},{
				value:'el-icon-zoom-out',
				label: 'el-icon-zoom-out'
			},{
				value:'el-icon-remove-outline',
				label: 'el-icon-remove-outline'
			},{
				value:'el-icon-circle-plus-outline',
				label: 'el-icon-circle-plus-outline'
			},{
				value:'el-icon-circle-check',
				label: 'el-icon-circle-check'
			},{
				value:'el-icon-circle-close',
				label: 'el-icon-circle-close'
			},{
				value:'el-icon-s-help',
				label: 'el-icon-s-help'
			},{
				value:'el-icon-help',
				label: 'el-icon-help'
			},{
				value:'el-icon-minus',
				label: 'el-icon-minus'
			},{
				value:'el-icon-plus',
				label: 'el-icon-plus'
			},{
				value:'el-icon-check',
				label: 'el-icon-check'
			},{
				value:'el-icon-close',
				label: 'el-icon-close'
			},{
				value:'el-icon-picture',
				label: 'el-icon-picture'
			},{
				value:'el-icon-picture-outline',
				label: 'el-icon-picture-outline'
			},{
				value:'el-icon-picture-outline-round',
				label: 'el-icon-picture-outline-round'
			},{
				value:'el-icon-upload',
				label: 'el-icon-upload'
			},{
				value:'el-icon-upload2',
				label: 'el-icon-upload2'
			},{
				value:'el-icon-download',
				label: 'el-icon-download'
			},{
				value:'el-icon-camera-solid',
				label: 'el-icon-camera-solid'
			},{
				value:'el-icon-camera',
				label: 'el-icon-camera'
			},{
				value:'el-icon-video-camera-solid',
				label: 'el-icon-video-camera-solid'
			},{
				value:'el-icon-video-camera',
				label: 'el-icon-video-camera'
			},{
				value:'el-icon-message-solid',
				label: 'el-icon-message-solid'
			},{
				value:'el-icon-bell',
				label: 'el-icon-bell'
			},{
				value:'el-icon-s-cooperation',
				label: 'el-icon-s-cooperation'
			},{
				value:'el-icon-s-order',
				label: 'el-icon-s-order'
			},{
				value:'el-icon-s-platform',
				label: 'el-icon-s-platform'
			},{
				value:'el-icon-s-fold',
				label: 'el-icon-s-fold'
			},{
				value:'el-icon-s-unfold',
				label: 'el-icon-s-unfold'
			},{
				value:'el-icon-s-operation',
				label: 'el-icon-s-operation'
			},{
				value:'el-icon-s-promotion',
				label: 'el-icon-s-promotion'
			},{
				value:'el-icon-s-home',
				label: 'el-icon-s-home'
			},{
				value:'el-icon-s-release',
				label: 'el-icon-s-release'
			},{
				value:'el-icon-s-ticket',
				label: 'el-icon-s-ticket'
			},{
				value:'el-icon-s-management',
				label: 'el-icon-s-management'
			},{
				value:'el-icon-s-open',
				label: 'el-icon-s-open'
			},{
				value:'el-icon-s-shop',
				label: 'el-icon-s-shop'
			},{
				value:'el-icon-s-marketing',
				label: 'el-icon-s-marketing'
			},{
				value:'el-icon-s-flag',
				label: 'el-icon-s-flag'
			},{
				value:'el-icon-s-comment',
				label: 'el-icon-s-comment'
			},{
				value:'el-icon-s-finance',
				label: 'el-icon-s-finance'
			},{
				value:'el-icon-s-claim',
				label: 'el-icon-s-claim'
			},{
				value:'el-icon-s-custom',
				label: 'el-icon-s-custom'
			},{
				value:'el-icon-s-opportunity',
				label: 'el-icon-s-opportunity'
			},{
				value:'el-icon-s-data',
				label: 'el-icon-s-data'
			},{
				value:'el-icon-s-check',
				label: 'el-icon-s-check'
			},{
				value:'el-icon-s-grid',
				label: 'el-icon-s-grid'
			},{
				value:'el-icon-menu',
				label: 'el-icon-menu'
			},{
				value:'el-icon-share',
				label: 'el-icon-share'
			},{
				value:'el-icon-d-caret',
				label: 'el-icon-d-caret'
			},{
				value:'el-icon-caret-left',
				label: 'el-icon-caret-left'
			},{
				value:'el-icon-caret-right',
				label: 'el-icon-caret-right'
			},{
				value:'el-icon-caret-bottom',
				label: 'el-icon-caret-bottom'
			},{
				value:'el-icon-caret-top',
				label: 'el-icon-caret-top'
			},{
				value:'el-icon-bottom-left',
				label: 'el-icon-bottom-left'
			},{
				value:'el-icon-bottom-right',
				label: 'el-icon-bottom-right'
			},{
				value:'el-icon-back',
				label: 'el-icon-back'
			},{
				value:'el-icon-right',
				label: 'el-icon-right'
			},{
				value:'el-icon-bottom',
				label: 'el-icon-bottom'
			},{
				value:'el-icon-top',
				label: 'el-icon-top'
			},{
				value:'el-icon-top-left',
				label: 'el-icon-top-left'
			},{
				value:'el-icon-top-right',
				label: 'el-icon-top-right'
			},{
				value:'el-icon-arrow-left',
				label: 'el-icon-arrow-left'
			},{
				value:'el-icon-arrow-right',
				label: 'el-icon-arrow-right'
			},{
				value:'el-icon-arrow-down',
				label: 'el-icon-arrow-down'
			},{
				value:'el-icon-arrow-up',
				label: 'el-icon-arrow-up'
			},{
				value:'el-icon-d-arrow-left',
				label: 'el-icon-d-arrow-left'
			},{
				value:'el-icon-d-arrow-right',
				label: 'el-icon-d-arrow-right'
			},{
				value:'el-icon-video-pause',
				label: 'el-icon-video-pause'
			},{
				value:'el-icon-video-play',
				label: 'el-icon-video-play'
			},{
				value:'el-icon-refresh',
				label: 'el-icon-refresh'
			},{
				value:'el-icon-refresh-right',
				label: 'el-icon-refresh-right'
			},{
				value:'el-icon-refresh-left',
				label: 'el-icon-refresh-left'
			},{
				value:'el-icon-finished',
				label: 'el-icon-finished'
			},{
				value:'el-icon-sort',
				label: 'el-icon-sort'
			},{
				value:'el-icon-sort-up',
				label: 'el-icon-sort-up'
			},{
				value:'el-icon-sort-down',
				label: 'el-icon-sort-down'
			},{
				value:'el-icon-rank',
				label: 'el-icon-rank'
			},{
				value:'el-icon-loading',
				label: 'el-icon-loading'
			},{
				value:'el-icon-view',
				label: 'el-icon-view'
			},{
				value:'el-icon-c-scale-to-original',
				label: 'el-icon-c-scale-to-original'
			},{
				value:'el-icon-date',
				label: 'el-icon-date'
			},{
				value:'el-icon-edit',
				label: 'el-icon-edit'
			},{
				value:'el-icon-edit-outline',
				label: 'el-icon-edit-outline'
			},{
				value:'el-icon-folder',
				label: 'el-icon-folder'
			},{
				value:'el-icon-folder-opened',
				label: 'el-icon-folder-opened'
			},{
				value:'el-icon-folder-add',
				label: 'el-icon-folder-add'
			},{
				value:'el-icon-folder-remove',
				label: 'el-icon-folder-remove'
			},{
				value:'el-icon-folder-delete',
				label: 'el-icon-folder-delete'
			},{
				value:'el-icon-folder-checked',
				label: 'el-icon-folder-checked'
			},{
				value:'el-icon-tickets',
				label: 'el-icon-tickets'
			},{
				value:'el-icon-document-remove',
				label: 'el-icon-document-remove'
			},{
				value:'el-icon-document-delete',
				label: 'el-icon-document-delete'
			},{
				value:'el-icon-document-copy',
				label: 'el-icon-document-copy'
			},{
				value:'el-icon-document-checked',
				label: 'el-icon-document-checked'
			},{
				value:'el-icon-document',
				label: 'el-icon-document'
			},{
				value:'el-icon-document-add',
				label: 'el-icon-document-add'
			},{
				value:'el-icon-printer',
				label: 'el-icon-printer'
			},{
				value:'el-icon-paperclip',
				label: 'el-icon-paperclip'
			},{
				value:'el-icon-takeaway-box',
				label: 'el-icon-takeaway-box'
			},{
				value:'el-icon-search',
				label: 'el-icon-search'
			},{
				value:'el-icon-monitor',
				label: 'el-icon-monitor'
			},{
				value:'el-icon-attract',
				label: 'el-icon-attract'
			},{
				value:'el-icon-mobile',
				label: 'el-icon-mobile'
			},{
				value:'el-icon-scissors',
				label: 'el-icon-scissors'
			},{
				value:'el-icon-umbrella',
				label: 'el-icon-umbrella'
			},{
				value:'el-icon-headset',
				label: 'el-icon-headset'
			},{
				value:'el-icon-brush',
				label: 'el-icon-brush'
			},{
				value:'el-icon-mouse',
				label: 'el-icon-mouse'
			},{
				value:'el-icon-coordinate',
				label: 'el-icon-coordinate'
			},{
				value:'el-icon-magic-stick',
				label: 'el-icon-magic-stick'
			},{
				value:'el-icon-reading',
				label: 'el-icon-reading'
			},{
				value:'el-icon-data-line',
				label: 'el-icon-data-line'
			},{
				value:'el-icon-data-board',
				label: 'el-icon-data-board'
			},{
				value:'el-icon-pie-chart',
				label: 'el-icon-pie-chart'
			},{
				value:'el-icon-data-analysis',
				label: 'el-icon-data-analysis'
			},{
				value:'el-icon-collection-tag',
				label: 'el-icon-collection-tag'
			},{
				value:'el-icon-film',
				label: 'el-icon-film'
			},{
				value:'el-icon-suitcase',
				label: 'el-icon-suitcase'
			},{
				value:'el-icon-suitcase-1',
				label: 'el-icon-suitcase-1'
			},{
				value:'el-icon-receiving',
				label: 'el-icon-receiving'
			},{
				value:'el-icon-collection',
				label: 'el-icon-collection'
			},{
				value:'el-icon-files',
				label: 'el-icon-files'
			},{
				value:'el-icon-notebook-1',
				label: 'el-icon-notebook-1'
			},{
				value:'el-icon-notebook-2',
				label: 'el-icon-notebook-2'
			},{
				value:'el-icon-toilet-paper',
				label: 'el-icon-toilet-paper'
			},{
				value:'el-icon-office-building',
				label: 'el-icon-office-building'
			},{
				value:'el-icon-school',
				label: 'el-icon-school'
			},{
				value:'el-icon-table-lamp',
				label: 'el-icon-table-lamp'
			},{
				value:'el-icon-house',
				label: 'el-icon-house'
			},{
				value:'el-icon-no-smoking',
				label: 'el-icon-no-smoking'
			},{
				value:'el-icon-smoking',
				label: 'el-icon-smoking'
			},{
				value:'el-icon-shopping-cart-full',
				label: 'el-icon-shopping-cart-full'
			},{
				value:'el-icon-shopping-cart-1',
				label: 'el-icon-shopping-cart-1'
			},{
				value:'el-icon-shopping-cart-2',
				label: 'el-icon-shopping-cart-2'
			},{
				value:'el-icon-shopping-bag-1',
				label: 'el-icon-shopping-bag-1'
			},{
				value:'el-icon-shopping-bag-2',
				label: 'el-icon-shopping-bag-2'
			},{
				value:'el-icon-sold-out',
				label: 'el-icon-sold-out'
			},{
				value:'el-icon-sell',
				label: 'el-icon-sell'
			},{
				value:'el-icon-present',
				label: 'el-icon-present'
			},{
				value:'el-icon-box',
				label: 'el-icon-box'
			},{
				value:'el-icon-bank-card',
				label: 'el-icon-bank-card'
			},{
				value:'el-icon-money',
				label: 'el-icon-money'
			},{
				value:'el-icon-coin',
				label: 'el-icon-coin'
			},{
				value:'el-icon-wallet',
				label: 'el-icon-wallet'
			},{
				value:'el-icon-discount',
				label: 'el-icon-discount'
			},{
				value:'el-icon-price-tag',
				label: 'el-icon-price-tag'
			},{
				value:'el-icon-news',
				label: 'el-icon-news'
			},{
				value:'el-icon-guide',
				label: 'el-icon-guide'
			},{
				value:'el-icon-male',
				label: 'el-icon-male'
			},{
				value:'el-icon-female',
				label: 'el-icon-female'
			},{
				value:'el-icon-thumb',
				label: 'el-icon-thumb'
			},{
				value:'el-icon-cpu',
				label: 'el-icon-cpu'
			},{
				value:'el-icon-link',
				label: 'el-icon-link'
			},{
				value:'el-icon-connection',
				label: 'el-icon-connection'
			},{
				value:'el-icon-open',
				label: 'el-icon-open'
			},{
				value:'el-icon-turn-off',
				label: 'el-icon-turn-off'
			},{
				value:'el-icon-set-up',
				label: 'el-icon-set-up'
			},{
				value:'el-icon-chat-round',
				label: 'el-icon-chat-round'
			},{
				value:'el-icon-chat-line-round',
				label: 'el-icon-chat-line-round'
			},{
				value:'el-icon-chat-square',
				label: 'el-icon-chat-square'
			},{
				value:'el-icon-chat-dot-round',
				label: 'el-icon-chat-dot-round'
			}
			],
		};
	},
	mounted : function(){
		this.GetModules();
	},
	methods: {
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
<style>
.el-table th.gutter{    
    display: table-cell !important;
}
.el-dialog__body {
    padding: 10px 20px;;
}
</style>

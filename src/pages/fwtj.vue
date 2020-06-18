<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				<el-form-item label="起始日期">
					<el-date-picker
						v-model="form.strattime"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="终止日期">
					<el-date-picker
						v-model="form.endtime"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="查询数量" style="width:360px">
                    <el-select v-model="form.numtype" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
					<el-input class="num" v-model="form.num"  clearble></el-input>
				</el-form-item>
                
			</el-form>
			<div class="btn">
				<el-button type="primary" @click="aa">查询</el-button>
			</div>
			<div class="table">
			<el-table border v-if="gridData.length" :data="gridData">
				<el-table-column align="center" width="280" property="id" label="防伪码"></el-table-column>
				<el-table-column align="center" property="num" label="查询次数"></el-table-column>
				<el-table-column align="center" label="查看明细">
					<template slot-scope="scope">
        			<el-button @click="handleClick(scope.row)" type="text" size="small">查看明细</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>	
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			form: {
				strattime: '',
				endtime: '',
				numtype: '',
				num:''
			},
            options: [{
				value: '1',
				label: '>='
				}, {
				value: '2',
				label: '<='
			    },{
				value: '3',
				label: '='
			}],
			gridData: []
		}
	},
	mounted(){
		
	},
	methods:{
		aa(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			console.log(this.form)
      		this.$axios({
        		method: 'post',
        		url:'/FW/fwtj.ashx',
        		data :qs.stringify({
					 cid:8005,
					 form:this.form
        		})
      		})
      		.then(res=>{
				console.log(res)
        		if(res!=null){
          			this.gridData = res.map((item,index)=>{
						  return {
							  id: this.FWCode[index],
							  num: item
						  }
					  })
        		}else{
					this.$message.error('查询出错');
				}
      		})		
		},
		handleClick(val){

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
	margin:0 80px;
}
.el-form--inline .el-form-item{
    width:300px;
}
.el-input,.el-select{
	width:220px;
}
.num{
    width:50px;
}
</style>
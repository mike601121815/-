<template>
	<div class="content">
		<div class="item">
		    <div>
		        <div class="search" ref="search">
			        <el-input
    		        placeholder="请输入防伪码"
    		        v-model="input">
    			        <i slot="prefix" class="el-input__icon el-icon-search"></i>
  			        </el-input>
		        </div>
		    </div>
		    <div class="btn">
		        <el-button  type="primary" @click="aa">查询</el-button>	
		    </div>

			<div class="table" v-if="gridData.length">
			<div>
				<div>
					<strong>产品基本信息</strong>
				</div>
				<div>
					<el-row :gutter="20">
  					<el-col :span="6"><div>防伪码</div></el-col>
  					<el-col :span="6"><div>产品</div></el-col>
  					<el-col :span="6"><div>包装比例</div></el-col>
					</el-row>
					<el-row :gutter="20">
  					<el-col :span="6"><div>{{productdata.FWcode}}</div></el-col>
  					<el-col :span="6"><div>{{productdata.product}}</div></el-col>
  					<el-col :span="6"><div>{{productdata.scale}}</div></el-col>
					</el-row>
					<el-row :gutter="20">
  					<el-col :span="6"><div>批号</div></el-col>
  					<el-col :span="6"><div>产品规格</div></el-col>
					</el-row>
					<el-row :gutter="20">
  					<el-col :span="6"><div>{{productdata.batch}}</div></el-col>
  					<el-col :span="6"><div>{{productdata.qty}}</div></el-col>
					</el-row>
				</div>
			</div>
			<el-table border :data="gridData">
				<el-table-column align="center" property="id" label="时间"></el-table-column>
				<el-table-column align="center" property="num" label="经销商编号"></el-table-column>
				<el-table-column align="center" property="num" label="经销商"></el-table-column>
				<el-table-column align="center" property="num" label="省份"></el-table-column>
				<el-table-column align="center" property="num" label="地区"></el-table-column>
				<el-table-column align="center" property="num" label="查询方式"></el-table-column>
				<el-table-column align="center" property="num" label="号码/IP"></el-table-column>
			</el-table>
			</div>	

		</div>
		
	</div>
</template>

<script>
export default {
	data(){
		return {
			input:'',
			productdata:{
					FWcode:'',
					product:'',
					scale:'',
					batch:'',
					qty:'',
			},
			gridData: []
		}
	},
	mounted(){
		
	},
	methods:{
		aa(){
			var user = JSON.parse(sessionStorage.getItem('user'));
      		this.$axios({
        		method: 'post',
        		url:'/FW/antiFakeSingleStatics.ashx',
        		data :qs.stringify({
					 cid:8005,
					 form:this.input
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
	margin:10px 0;
}
</style>
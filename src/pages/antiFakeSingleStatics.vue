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
				<div class="product">
					<el-row :gutter="20">
  					<el-col :span="6"><div>防伪码</div></el-col>
  					<el-col :span="6"><div>产品</div></el-col>
  					<el-col :span="6"><div>包装比例</div></el-col>
					</el-row>
					<el-row :gutter="20">
  					<el-col class="productdata" :span="6"><div>{{productdata.FwCode}}</div></el-col>
  					<el-col class="productdata" :span="6"><div>{{productdata.ProductName}}</div></el-col>
  					<el-col class="productdata" :span="6"><div>{{productdata.TypeName}}</div></el-col>
					</el-row>
					<el-row :gutter="20">
  					<el-col :span="6"><div>批号</div></el-col>
  					<el-col :span="6"><div>产品规格</div></el-col>
					</el-row>
					<el-row :gutter="20">
  					<el-col class="productdata" :span="6"><div>{{productdata.BathNo}}</div></el-col>
  					<el-col class="productdata" :span="6"><div>{{productdata.Psid}}</div></el-col>
					</el-row>
				</div>
			</div>
			<el-table border :data="gridData">
				<el-table-column align="center" property="QueryTime" :formatter="data_string" label="时间"></el-table-column>
				<el-table-column align="center" property="AgencyID" label="经销商编号"></el-table-column>
				<el-table-column align="center" property="AgencyName" label="经销商"></el-table-column>
				<el-table-column align="center" property="Province" label="省份"></el-table-column>
				<el-table-column align="center" property="City" label="地区"></el-table-column>
				<el-table-column align="center" property="QueryType" label="查询方式"></el-table-column>
				<el-table-column align="center" property="IP" label="号码/IP"></el-table-column>
			</el-table>
			</div>	

		</div>
		
	</div>
</template>

<script>
import qs from 'qs'
export default {
	data(){
		return {
			input:'',
			productdata:{},
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
        		url:'/FW/SingelQueryHandler.ashx',
        		data :qs.stringify({
					 cid:user.QyNum,
					 fwcode:this.input
        		})
      		})
      		.then(res=>{
				console.log(res)
        		if(res!=null){
					if(Array.isArray(res)){
						this.gridData = res;
						this.productdata=res[0];
					}else{
						this.$message.error(res);
					}
        		}else{
					this.$message.error('查询出错');
				}
      		})		
		},
		data_string(row) {
			var str=row.QueryTime;
        var d = eval('new ' + str.substr(1, str.length - 2));
        var ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate() ];
        var ar_time = [d.getHours(), d.getMinutes(), d.getSeconds()];
        for (var i = 0; i < ar_date.length; i++) ar_date[i] = dFormat(ar_date[i]);
        for (var i = 0; i < ar_time.length; i++) ar_time[i] = dFormat(ar_time[i]);
        return ar_date.join('-')+" "+ar_time.join(':');

        function dFormat(i) { return i < 10 ? "0" + i.toString() : i; }
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
.product .el-col{
	margin: 10px 10px;
}
.product .productdata{
	color: cornflowerblue;
}
</style>
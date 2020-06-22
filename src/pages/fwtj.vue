<template>
	<div class="content">
		<div class="item">
			<el-form ref="form" :inline="true" style="width:800px" :model="form" :rules="rules1" label-width="80px">
				<el-form-item label="起始日期">
					<el-date-picker
						v-model="form.startTime" value-format="yyyy-MM-dd"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="终止日期">
					<el-date-picker
						v-model="form.endTime" value-format="yyyy-MM-dd"
						type="date"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="查询数量" style="width:360px">
                    <el-select v-model="form.quyType" placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
					<el-input class="num" v-model="form.quyNums"  clearble></el-input>
				</el-form-item>
                
			</el-form>
			<div class="btn">
				<el-button type="primary" @click="aa">查询</el-button>
			</div>
			<div class="table">
			<el-table border v-if="gridData.length" :data="gridData">
				<el-table-column align="center" width="280" property="Fwcode" label="防伪码"></el-table-column>
				<el-table-column align="center" property="QueryNums" label="查询次数"></el-table-column>
				<el-table-column align="center" label="查看明细">
					<template slot-scope="scope">
        			<el-button @click="handleClick(scope.row)" type="text" size="small">查看明细</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>	
		</div>

		<el-dialog
			title="查询明细"
			:visible.sync="dialogVisible"
			width="800px">

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
  					<el-col class="productdata" :span="6"><div>{{product.FwCode}}</div></el-col>
  					<el-col class="productdata" :span="6"><div>{{product.ProductName}}</div></el-col>
  					<el-col class="productdata" :span="6"><div>{{product.TypeName}}</div></el-col>
					</el-row>
					<el-row :gutter="20">
  					<el-col :span="6"><div>批号</div></el-col>
  					<el-col :span="6"><div>产品规格</div></el-col>
					</el-row>
					<el-row :gutter="20">
  					<el-col class="productdata" :span="6"><div>{{product.BathNo}}</div></el-col>
  					<el-col class="productdata" :span="6"><div>{{product.Psid}}</div></el-col>
					</el-row>
				</div>
			</div>

			<el-table :data="productInfo" highlight-current-row border
    			>
				<el-table-column align="center"  property="QueryTime" :formatter="data_string" label="查询时间"></el-table-column>
				<el-table-column align="center"  property="num" label="查询省份"></el-table-column>
				<el-table-column align="center"  property="City" label="查询城市"></el-table-column>
				<el-table-column align="center"  property="QueryType" label="查询方式"></el-table-column>
				<el-table-column align="center"  property="IP" label="号码/IP"></el-table-column>
			</el-table>
		</el-dialog>

	</div>
</template>

<script>
import qs from 'qs'
import {validateFigure} from '../utils/rules'
export default {
	data(){
		return {
			dialogVisible: false,
			form: {
				cid:'',
				startTime: '',
				endTime: this.$moment().format("YYYY-MM-DD"),
				quyType: 1,
				quyNums:0
			},
			rules1: {
        		startTime:[
          			{ required: true,  message: '请选择起始日期', trigger: 'blur' }
        		],
        		endTime:[
          			{ required: true,  message: '请选择终止日期', trigger: 'blur' }
        		],
      		},
            options: [{
				value: 1,
				label: '>='
				}, {
				value: 2,
				label: '<='
			    },{
				value: 3,
				label: '='
			}],
			gridData: [],
			productInfo:[],
			product:{},
		}
	},
	mounted : function(){
		this.form.startTime=this.getCurrentMonthFirst();
	},
	methods:{
		aa(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			this.form.cid=user.QyNum;
			console.log(this.form)
			if(this.form.startTime!=null&&this.form.endTime!=null){
					this.$axios({
        		method: 'post',
        		url:'/FW/QuerySummaryHandle.ashx',
        		params :{QuyForm:this.form}
      		})
      		.then(res=>{
        		if(res!=null){
					console.log(res)
					if(Array.isArray(res)){
          			this.gridData = res;
					  }else{
						  this.$message.error(res);
					  }
        		}else{
					this.$message.error('查询出错');
				}
      		})		
			}else{
				this.$message.error('请选择查询日期');
			}
      		
		},
		handleClick(row){
			this.dialogVisible=true,
			this.productInfo=row.Details;
			this.product=this.productInfo[0];
			console.log(this.product)
		},
		getCurrentMonthFirst(){
            var date=new Date();
            date.setDate(1);
            return this.$moment(date).format("YYYY-MM-DD");
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
	margin:0 0 20px 80px;
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
.product .el-col{
	margin: 10px 10px;
}
.product .productdata{
	color: cornflowerblue;
}
</style>
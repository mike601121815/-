<template>
	<div class="content">
		<div class="item">
            <el-form ref="form" :inline="true"  :model="form" label-width="80px">
				<el-form-item label="起始日期">
					<el-date-picker 
                    v-model="form.starttime" 
						type="date"  value-format="yyyy-MM-dd"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="终止日期">
					<el-date-picker
                    v-model="form.endtime"
						type="date" value-format="yyyy-MM-dd"
						placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="查询方式">
					<el-select v-model="form.quymode"  placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="产品">
					<el-input v-model="form.productName" placeholder="请选择产品" @focus="productfocus"></el-input>
					<el-button class="del" icon="el-icon-delete" @click="delPdt" circle></el-button>
				</el-form-item>
                <el-form-item label="查询省份">

					<el-select v-model="form.province" placeholder="请选择省份" @change="getProCode" @focus="provincefocus">
						<el-option
						v-for="item in provinceData"
						:key="item.PRO_CODE"
						:label="item.PRO_NAME"
						:value="item.PRO_NAME">
						</el-option>
					</el-select>	
					<el-button class="del" icon="el-icon-delete" @click="delPro" circle></el-button>
				</el-form-item>
				<el-form-item label="查询地区">

					<el-select v-model="form.city"  placeholder="请选择地区" @focus="cityfocus">
						<el-option
						v-for="item in cityData"
						:key="item.CITY_CODE"
						:label="item.CITY_NAME"
						:value="item.CITY_NAME">
						</el-option>
					</el-select>
					<el-button class="del" icon="el-icon-delete" @click="delCity" circle></el-button>
				</el-form-item>
                <el-form-item label="查询次数">
					<el-select v-model="form.quyType"  placeholder="请选择">
						<el-option
						v-for="item in selectnum"
						:key="item.num"
						:label="item.lable"
						:value="item.num">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div class="btn">
				<el-button type="primary" @click="aa">查询</el-button>
			</div>
			<div class="table">
			<el-table border v-if="gridData.length" :data="gridData">
				<el-table-column align="center" property="FwCode" label="防伪码"></el-table-column>
				<el-table-column align="center" property="BathNo" label="批号"></el-table-column>
				<el-table-column align="center" property="Psid" label="产品品规"></el-table-column>
				<el-table-column align="center" property="TypeName" label="包装比例"></el-table-column>
				<el-table-column align="center" property="ProductName" label="产品"></el-table-column>
				<el-table-column align="center" property="AgencyID" label="经销商编号"></el-table-column>
				<el-table-column align="center" property="AgencyName" label="经销商"></el-table-column>
				<el-table-column align="center" property="QueryTime" :formatter="data_string" label="查询时间"></el-table-column>
				<el-table-column align="center" property="Province" label="省份"></el-table-column>
				<el-table-column align="center" property="City" label="地区"></el-table-column>
				<el-table-column align="center" property="QueryType" label="查询方式"></el-table-column>
				<el-table-column align="center" property="IP" label="号码/IP"></el-table-column>
			</el-table>
		</div>	
        </div>
		<el-dialog
			title="选择产品"
			:visible.sync="dialogVisible"
			width="800px">

			<el-form ref="form" :inline="true" style="width:800px" :model="form" label-width="80px">
				<el-form-item label="产品编号">
					<el-input v-model="qryform.sysCode" placeholder="查询产品编号"></el-input>
				</el-form-item>
				<el-form-item label="产品名称">
					<el-input v-model="qryform.productName" placeholder="查询产品名称"></el-input>
				</el-form-item>
				<el-form-item label="包装比例">
					<el-input v-model="qryform.specName" placeholder="查询包装比例"></el-input>
				</el-form-item>
				<el-button type="primary" @click="productfocus">查 询</el-button>
			</el-form>

			<el-table :data="productData" highlight-current-row
    		@row-click="handleCurrentChange">
				<el-table-column align="center" type="index" label="序号"></el-table-column>
				<el-table-column align="center" property="ProductCode" label="产品编号"></el-table-column>
				<el-table-column align="center" property="ProductName" label="产品名称"></el-table-column>
				<el-table-column align="center" property="Property" label="产品品柜"></el-table-column>
				<el-table-column align="center" property="Norms" label="包装比例"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import qs from 'qs'
export default {
	data(){
		return {
			dialogVisible: false,
			provincecode:'',
			form:{
				cid:'',
				starttime:'',  //起始日期
				endtime: this.$moment().format("YYYY-MM-DD"),    //终止日期
				quymode:0,  //查询方式
				productName:'',    //产品
				province:'', //省份
				city:'',     //地区
				quyType:0,  //次数
			},
			options: [
				{
				value: 0,
				label: '全部'
				}, {
				value: 1,
				label: 'WEB(网络查询)'
				}, {
				value: 2,
				label: 'APP(移动终端查询)'
				}],
			
			productData: [],//产品表
			qryform:{
				cid:'',
				sysCode:'',  //产品编号
				productName:'',    //产品名称
				specName:'',  //包装比例
			},

			provinceData: [],//省份

			cityData:[],     //地区

			selectnum:[{
				num:0,
				lable:"全部",
			},{
				num:1,
				lable:"首查记录",
			}],
			

			gridData: [],
		}
	},
	mounted(){
		this.form.starttime=this.getCurrentMonthFirst();
	},
	methods:{

		confirm(){
			this.form.productName = this.current.ProductName ;
			this.dialogVisible = false
		},
		handleCurrentChange(data){
			this.current = data
		},
		productfocus(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			this.qryform.cid=user.QyNum;
			//	请求产品数据
			this.$axios({
				method: 'post',
				url:'/FW/QueryProductHandler.ashx',
				params:{
					QuyForm:this.qryform
				}
			})
			.then(res=>{
				console.log(res);
				if(res!=null){
					this.productData=res;
				}else{
					this.$message.error('查询出错');
				}
			})
			this.dialogVisible = true
		},

		provincefocus(){
			//	请求省份
			this.$axios({
				method: 'post',
				url:'/FW/QueryProvinceHandler.ashx',
				params:{}
			})
			.then(res=>{
				if(res!=null){
					this.provinceData=res;
				}else{
					this.$message.error('查询出错');
				}
			})
		},

		getProCode(val){
			let obj = {};
			obj = this.provinceData.find((item)=>{//这里的userRoleList就是上面遍历的数据源
			return item.PRO_NAME === val;//筛选出匹配数据
			});
			console.log(obj)
			this.provincecode = obj.PRO_CODE;
			this.cityData=null;
			this.form.city='';
		},

		cityfocus(){
			//	请求省份
			this.$axios({
				method: 'post',
				url:'/FW/QueryCityHandler.ashx',
				params:{
					provinceId:this.provincecode
				}
			})
			.then(res=>{
				if(res!=null){
					this.cityData=res;
					console.log(this.cityData);
				}else{
					this.$message.error('查询出错');
				}
			})
		},
		delPdt(){
			this.form.productName='';
		},
		delPro(){
			this.form.province='';
			this.cityData=null;
			this.form.city='';
		},
		delCity(){
			this.form.city='';
		},
		aa(){
			var user = JSON.parse(sessionStorage.getItem('user'));
			this.form.cid=user.QyNum;
			console.log(this.form);
			if(this.form.starttime!=null&&this.form.endtime!=null){
					this.$axios({
        		method: 'post',
        		url:'/FW/QueryFWHandle.ashx',
        		params:{
					 QuyForm:this.form
        		}
      		})
      		.then(res=>{
				console.log(res)
        		if(res!=null){
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

.item{
	margin: 20px 0;
	padding: 20px;
	border: 1px solid #e3e3e3;
}
.el-form--inline .el-form-item{
    width:400px;
}
.el-input,.el-select{
	width:220px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
    font-size: 12px;
}
.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
.btn{
	width: 500px;
	margin:0 80px;
}
.del{
	border: none;
}
</style>
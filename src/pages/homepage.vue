<template>
	<div class="content">
        <div class="welcom">
            欢迎使用
        </div>
		<div class="title">
            兆信产品数字身份管理系统
        </div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	mounted(){
		this.$axios({
            method: 'get',
            url: "../../sdfasdf",
            params:{
                user1
            }
        })
        .then(res=>{

        })
        this.$axios({
            method: 'post',
            url: "../../sdfasdf",
            data:{
                user:1
            }
        })
        .then(res=>{
            
        })
	},
	methods:{
		
	}
}
</script>

<style scoped>
.welcom{
    margin: 50px;
    text-align: left;
    font-size:35px;
}
.title{
    text-align: left;
    font-size:25px;
    margin: 0 100px;
}
</style>
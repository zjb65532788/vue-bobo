<template>
	<div>
		<div @click="open">点击打开对话框</div>
		<div @click="open1">图片裁剪</div>
		<img :src="img" style="width:200px" v-if="img" />

		<bobo-dialog title="一个对话框demo" :visible.sync="visible" @close="close" @open="opendia">
			<p>对话框内容哦！！！</p>
			<div slot="footer">
				<bobo-button @click.native="visible=false">取消</bobo-button>
				<bobo-button type="primary" @click.native="success">确定</bobo-button>
			</div>
		</bobo-dialog>

		<bobo-clipper v-model="clippershow" @crop-success="cropSuccess" ></bobo-clipper>
	</div>
	
</template>
<script>
	export default {
		data(){
			return {
				visible:false,
				clippershow:false,
				img:""
			}
		},
		methods:{
			cropSuccess(value){
				this.clippershow=false;
				this.img=value;
			},
			open(){
				this.visible=true;
			},
			close(){
				console.log('关闭了');
			},
			opendia(){
				console.log('对话框打开了')
			},
			success(){
				console.log("确定");
				this.visible=false;
			},
			open1(){
				this.clippershow=true;
			}
		}
	}
</script>
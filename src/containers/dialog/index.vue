<template>
	<div>
		<div @click="open">点击打开对话框</div>

		<bobo-dialog title="一个对话框demo" :visible.sync="visible" @close="close" @open="opendia">
			<p>对话框内容哦！！！</p>
			<div slot="footer">
				<bobo-button @click.native="visible=false">取消</bobo-button>
				<bobo-button type="primary" @click.native="success">确定</bobo-button>
			</div>
		</bobo-dialog>
	</div>
	
</template>
<script>
	export default {
		data(){
			return {
				visible:false
			}
		},
		methods:{
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
			}
		}
	}
</script>
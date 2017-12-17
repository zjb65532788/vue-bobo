<!-- 组件说明:对话框组件
	属性 visible : 对话框显示不显示 默认false
		 title   : 对话框标题

	Slot  footer : 对话框底部内容

	evnet  close : 对话框关闭时触发
			open : 对话框打开时出发
 -->
 <template>
	<div class="bobo-dia" v-show="visible" ref="dialog">
		<div class="bobo-dia-wrap">
			<div class="bobo-dia-shade"  @click="closedia"></div>
			<div class="bobo-dia-content">
				<span class="iconfont icon-guanbi bobo-dia-close" @click="closedia"></span>
				<div class="bobo-dia-header" v-if="title">
					<div class="bobo-dia-title">{{title}}</div>
				</div>
				<div class="bobo-dia-body">
					<slot></slot>
				</div>
				<div class="bobo-dia-footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		mounted(){
			document.body.appendChild(this.$refs.dialog);
		},	
		beforeDestroy(){
			document.body.removeChild(this.$refs.dialog);

		},
		props:{
			title:{
				type:String,
				default:""
			},
			visible:{
				type:Boolean,
				default:true
			}
		},
		watch:{
			visible(value){
				if (value) {
          			this.$emit('open');
				}
			}
		},
		data(){
			return {}
		},
		methods:{
			closedia(){
				this.$emit('update:visible', false);
          		this.$emit('close');
			}
		}
	}
</script>
<style scoped>
	.bobo-dia-shade {
	    position: absolute;
	    top: 0;
	    right: 0;
	    left: 0;
	    bottom: 0;
	    background-color: #373737;
	    background-color: rgba(0, 0, 0, 0.65);
	    height: 100%;
	    z-index: 1000;
	    filter: alpha(opacity=50);
	}
	.bobo-dia-wrap{
		    position: fixed;
	    overflow: auto;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    z-index: 1000;
	    -webkit-overflow-scrolling: touch;
	    outline: 0;
	}
	.bobo-dia-content{
	    font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	    font-size: 14px;
	    line-height: 1.5;
	    color: rgba(0, 0, 0, 0.65);
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    position: relative;
	    z-index: 1001;
	    width: auto;
	    margin: 0 auto;
	    top: 100px;
	    width: 520px;
    	transform-origin: -149px 220px 0px;

    	background-color: #fff;
	    border: 0;
	    border-radius: 4px;
	    background-clip: padding-box;
	    text-align: left;
	}

	.bobo-dia-header{
		padding: 16px 24px;
	    border-radius: 4px 4px 0 0;
	    background: #fff;
	    color: rgba(0, 0, 0, 0.65);
	    border-bottom: 1px solid #e8e8e8;
	}
	.bobo-dia-title{
		margin: 0;
	    font-size: 16px;
	    line-height: 22px;
	    font-weight: 500;
	    color: rgba(0, 0, 0, 0.85);
	    text-align: left;
	}
	.bobo-dia-close{
		position: absolute;
	    right: 10px;
	    top: 15px;
	    font-weight: bold;
	    cursor: pointer;
	}
	.bobo-dia-body{
		padding: 24px;
	    font-size: 14px;
	    line-height: 1.5;
	}
	.bobo-dia-footer{    padding: 15px;
    padding-top: 10px;
    text-align: right;
    box-sizing: border-box;}
</style>
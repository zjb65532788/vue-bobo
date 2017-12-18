<template>
	<div class="upload-face-out" v-show="value">
		<div class="upload-face-shade"></div>
		<div class="upload-face-model">
			<div class="upload-face-title ft16 co-3">上传头像</div>
			<i class="el-icon-close upload-face-close co-9" @click="closedia"></i>
			<div class="clearfix text-center" style="margin:30px 20px 20px 30px">
				<div class="left">
						<div class="upload-face-show pr  "  
							@dragleave="preventDefault" 
							@dragover="preventDefault" 
							@dragenter="preventDefault" 
							@click="handleClick 

						">
						
						<div class="face-img-show" v-if="sourceImgUrl">
							<img class="face-img" :src="sourceImgUrl" :style="sourceImgStyle" 
								@drag="preventDefault"
								@dragstart="preventDefault"
								@dragend="preventDefault"
								@dragleave="preventDefault"
								@dragover="preventDefault"
								@dragenter="preventDefault"
								@drop="preventDefault"
								@mousedown="imgStartMove"
								@mousemove="imgMove"
								@mouseup="createImg"
								@mouseout="createImg"
							>
							<div class="top-shade" :style="styleTop"></div>
							<div class="bottom-shade" :style="styleBottom"></div>
							<div class="left-shade"  :style="styleLeft"></div>
							<div class="right-shade"   :style="styleRight"></div>
						</div>
						<div v-else>
							<div class="add-btn">
								<i class="el-icon-plus"></i>
							</div>
							<div class="ft16 co-9">添加图片</div>
							<div class="ft14 co-9">只支持JPG、PNG、GIF，大小不超过5M建</div>
							<div class="ft14 co-9">议尺寸为240X240</div>
						</div>
					</div>
					<div class="text-left clearfix mt5" v-show="sourceImgUrl">
						<div class="right">
							<i class="iconfont icon-shanchu set-img-size mr20" @click="changescale(0)"></i>
							<i class="iconfont icon-xinzeng set-img-size mr20" @click="changescale(1)"></i>
							<!-- <i class="iconfont icon-icon19 set-img-size mr10" @click="setrotate()"></i> -->
						</div>
						<a class="ft12" style="color:#f34141" @click="openupload">重新选择</a>
						
					</div>
				</div>

				<div class="face-preview">
					<div class="face-preview-circle"><img :src="createImgUrl||previewImg" style="width:100%" /> </div>
					<div class="ft14 co-9 mt10">图片预览</div>
				</div>
                <input type="file" v-show="false" @change="handleChange" ref="fileinput" />
			</div>
			<div class="upload-face-btn text-center pt20 pb20">
				<bobo-button size="small" style="width:90px"  type="primary" @click="cropsuccess">确定</bobo-button>
				<bobo-button size="small" style="width:90px"  @click="closedia">取消</bobo-button>
			</div>
		</div>
		<canvas v-show="false" :width="width1" :height="height1" ref="canvas"></canvas>
	</div>
</template>
<script>
	export default{
		props:{
			value: {
				type:Boolean,
				default:false
	        },
	        // 剪裁图片的宽
			sizewidth: {
				type: Number,
				default: 240
			},
			// 剪裁图片的高
			sizeheight: {
				type: Number,
				default: 240
			},
			sourceImgUrl:{
				type:String,
				default:""
			}
		},
		data(){
			return {
				isSupportTouch: document.hasOwnProperty("ontouchstart"),
				previewImg:require('assets/face-preview.png'),
				maxSize:5*1024,
				sourceImg:null,
				createImgUrl:"",
				scale:1,
				outSize:320,
				size:240,
				max:240,//截图框最大尺寸
				x:40,
				y:40,
				trueWidth:0,
				trueHeight:0,
				width:0,//图片的宽
				height:0,//图片的高
				width1:0,//截图框的宽
				height1:0,//截图框的高
				left:40,
				top:40,
				rotate:0,
				firstleft:40,
				firsttop:40,
				// 原图片拖动事件初始值
				sourceImgMouseDown: {
					on: false,
					mX: 0, //鼠标按下的坐标
					mY: 0,
					x: 0, //scale原图坐标
					y: 0
				},
				styleTop:{},
				styleLeft:{},
				styleBottom:{},
				styleRight:{}
			}
		},
		created(){
			let outSize=this.outSize;
			let width=0,
				height=0;
			if (this.sizewidth>=this.sizeheight) {
				width=this.max;
				height=this.sizeheight*width/this.sizewidth;
			}else{
				height=this.max;
				width=this.sizewidth*height/this.sizeheight;
			}
			this.height1=height;
			this.width1=width;

			this.x=(outSize-width)/2;
			this.y=(outSize-height)/2;
			this.firstleft=this.x;
			this.firsttop=this.y;
			this.styleTop={
				height:((outSize-height)/2)+"px"
			}
			this.styleLeft={
				width:((outSize-width)/2)+"px",
				top:((outSize-height)/2)+"px",
				height:height+"px"
			}
			this.styleRight={
				width:((outSize-width)/2)+"px",
				top:((outSize-height)/2)+"px",
				height:height+"px"
			}

			this.styleBottom={
				height:(outSize-height)/2+"px"
			}
			//alert(this.y);
		},
		computed:{
			sourceImgStyle() {
				return {
					top:this.top+"px",
					left:this.left+"px",
					width: this.width + 'px',
					height: this.height + 'px',
					transform:"scale("+this.scale+")"
				}
			}
		},
		methods:{
			cropsuccess(){
				if (this.createImgUrl) {
					this.$emit('crop-success', this.createImgUrl);
				}
			},
			changescale(type){
				if (type==0&&this.scale>1) {
					this.scale-=0.1;
				}else if(type==1&&this.scale<2){
					this.scale+=0.1;
				}
				this.createImg();
			},
			setrotate(){

			},
			closedia(){
				this.$emit('input', false);
			},
			handleClick(e) {
				if (!this.sourceImgUrl) {
					if (e.target !== this.$refs.fileinput) {
						this.openupload(e);
					}
				}
			},
			openupload(e){
				e.preventDefault();
				if (document.activeElement !== this.$refs) {
					this.$refs.fileinput.click();
				}
			},
			preventDefault(e) {
				e.preventDefault();
				return false;
			},
			reset(){
				this.scale=1;
				this.width=0;
				this.height=0;
				let outSize=this.outSize;
				let width=this.width1;
				let height=this.height1;
				this.x=(outSize-width)/2;
				this.y=(outSize-height)/2;
				this.firstleft=this.x;
				this.firsttop=this.y;
			},
			handleChange(e) {
				e.preventDefault();
				if (this.loading !== 1) {
					let files = e.target.files || e.dataTransfer.files;
					this.reset();
					if (this.checkFile(files[0])) {
						this.setSourceImg(files[0]);
					}
				}
			},
			setSourceImg(file){
				let that = this,
					fr = new FileReader();
				fr.onload = (e)=> {

					this.sourceImgUrl = fr.result;
					this.startCrop();
				}
				fr.readAsDataURL(file);
			},
			checkFile(file) {
				let that = this;
				// 仅限图片
				if (file.type.indexOf('image') === -1) {
					return false;
				}

				// 超出大小
				if (file.size / 1024 > this.maxSize) {
					return false;
				}
				return true;
			},
			// 剪裁前准备工作
			startCrop() {
				let img=new Image();
				let height1=this.height1;
				let width1=this.width1;
				let ratio1=height1/width1;
				img.onload = ()=> {
					let height=img.height,
						width=img.width,
						ratio=height/width;
					this.trueWidth=width;
					this.trueHeight=height;
					if (ratio>=ratio1) {
						this.width=this.width1;
						this.height=this.width1*ratio;
						this.left=this.x;
						this.top=this.y-(this.height-height1)/2;
						this.firsttop=this.y-(this.height-height1)/2;
					}else{
						this.height=this.height1;
						this.width=this.height1/ratio;
						this.top=this.y;
						this.left=this.x-(this.width-width1)/2;
						this.firstleft=this.x-(this.width-width1)/2;
					}
					this.sourceImg=img;
					this.createImg();
				}
				img.src = this.sourceImgUrl;
			},
			imgStartMove(e) {
				e.preventDefault();
				// 支持触摸事件，则鼠标事件无效
				if(this.isSupportTouch && !e.targetTouches){
					return false;
				}
				let et = e.targetTouches ? e.targetTouches[0] : e;
				let simd=this.sourceImgMouseDown;
				simd.mX = et.screenX;
				simd.mY = et.screenY;
				simd.x = this.left;
				simd.y = this.top;
				simd.on = true;
			},
			imgMove(e){
				e.preventDefault();
				let simd=this.sourceImgMouseDown;
				if (!simd.on) {
					return false;
				}
				// 支持触摸事件，则鼠标事件无效
				if(this.isSupportTouch && !e.targetTouches){
					return false;
				}
				let et = e.targetTouches ? e.targetTouches[0] : e,
				    nowX=et.screenX,
					nowY=et.screenY,
					czX=nowX-simd.mX,
					czY=nowY-simd.mY;

				this.left=simd.x+czX;

				let maxleft=(this.width*this.scale-this.width1)/2;
				let maxtop=(this.height*this.scale-this.height1)/2;

				if (this.left-this.firstleft>maxleft) {
					this.left=maxleft+this.firstleft;
				}else if( this.firstleft-this.left>maxleft ){
					this.left=this.firstleft-maxleft;
				}

				this.top=simd.y+czY;
				if (this.top-this.firsttop>maxtop) {
					this.top=maxtop+this.firsttop;
				}else if( this.firsttop-this.top>maxtop ){
					this.top=this.firsttop-maxtop;
				}

			},
			createImg(e) {
				if (e) {
					if (this.sourceImgMouseDown.on) {
						this.sourceImgMouseDown.on=false;
					}else{
						return false;
					}
				}

				let maxleft=(this.width*this.scale-this.width1)/2;
				let maxtop=(this.height*this.scale-this.height1)/2;
				
				if (this.left-this.firstleft>maxleft) {
					this.left=maxleft+this.firstleft;
				}else if( this.firstleft-this.left>maxleft ){
					this.left=this.firstleft-maxleft;
				}

				
				if (this.top-this.firsttop>maxtop) {
					this.top=maxtop+this.firsttop;
				}else if( this.firsttop-this.top>maxtop ){
					this.top=this.firsttop-maxtop;
				}

				

				let canvas = this.$refs.canvas,
				ctx = canvas.getContext('2d');
				let sourceImg=this.sourceImg;
				ctx.clearRect(0, 0, this.width, this.height);

				let x=(this.width*this.scale)/2-this.width/2+(this.x-this.left);
				let y=(this.height*this.scale)/2-this.height/2+(this.y-this.top);

				x=x*this.trueWidth/(this.scale*this.width);
				y=y*this.trueHeight/(this.scale*this.height);

				let width=(this.width1*this.trueWidth) / (this.scale*this.width);
				let height=(this.height1*this.trueHeight) / (this.scale*this.height);


				ctx.drawImage(sourceImg, x, y , width, height,0,0,this.width1,this.height1);
				this.createImgUrl = canvas.toDataURL('image/png');
			}
		},
		watch: {
 			value(newvalue){
 				
 			},
 			sourceImgUrl(value){
 				if (value) {
 					this.reset();
					this.startCrop();
 				}else{
 					this.createImgUrl="";
 				}
 			}
		}
	}
</script>
<style scoped>
	.add-btn{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #2fa5fb;
		color: #FFF;
		margin: 88px auto 5px;
	}
	.add-btn i{
		line-height: 30px;
	}
	.upload-face-shade{
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;left: 0;
		background: #000;
		opacity: 0.5;
		z-index: 11111;
	}
	.upload-face-model{
		position: fixed;
		width: 504px;
		left:50%;
		margin-left: -252px;
		top: 50%;
		margin-top: -240px;
		background-color: #FFF;
		border-radius: 8px;
		z-index: 11112;
	}
	.upload-face-title{
		padding: 10px 30px
	}
	.upload-face-show{
		width: 320px;
		height: 320px;
		background-color: #eeeeee;
		overflow: hidden;
		cursor: pointer;
	}
	.upload-face-close{
		position: absolute;right: 20px;top: 20px;
		cursor: pointer;
	}
	.face-preview{
		margin-left: 340px;
	}
	.face-preview-circle{
		width: 114px;
	}
	.upload-face-btn{
		border-top: 1px solid #e0e0e0;
	}
	.face-img-show{
		height: 100%;
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	.face-img{
		position: absolute;
	}
	.top-shade{
		height: 40px;
	    background-color: #000;
	    opacity: 0.5;
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	}
	.bottom-shade{
		height: 40px;
	    background-color: #000;
	    opacity: 0.5;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	}
	.left-shade{
		height: 240px;
		top: 40px;
		left: 0;
		width: 40px;
		background-color: #000;
	    opacity: 0.5;
	    position: absolute;
	}
	.right-shade{
		height: 240px;
		top: 40px;
		right: 0;
		width: 40px;
		background-color: #000;
	    opacity: 0.5;
	    position: absolute;
	}
	.set-img-size{
		color: #a6a6a6;
		cursor: pointer;
	}
</style>
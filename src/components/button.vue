<template>
	<a :class="'bobo-btn bobo-btn-'+type" >
		<slot></slot>
	</a>
</template>
<script>
	export default {
		props:{
			type:{
				type:String,
				default:"default"
			}
		}
	}
</script>
<style>
	.bobo-btn{
		font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    display: inline-block;
	    margin-bottom: 0;
	    font-weight: 400;
	    text-align: center;
	    -ms-touch-action: manipulation;
	    touch-action: manipulation;
	    cursor: pointer;
	    background-image: none;
	    border: 1px solid transparent;
	    white-space: nowrap;
	    padding: 0 15px;
	    font-size: 14px;
	    border-radius: 4px;
	    height: 32px;
	    line-height: 32px;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	    position: relative;
	    color: rgba(0, 0, 0, 0.65);
	    background-color: #fff;
	    border-color: #d9d9d9;
	}
	.bobo-btn, .bobo-btn:active, .bobo-btn:focus {
	    outline: 0;
	}

	.bobo-btn-primary {
	    color: #fff;
	    background-color: #1890ff;
	    border-color: #1890ff;
	}
</style>
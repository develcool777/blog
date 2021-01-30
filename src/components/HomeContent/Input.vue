<template>
	<div class="input">
		<div class="input__contener">
			<input class="input__field" type="text" placeholder="Напишите что нибудь" v-model="msg" v-on:keyup.enter="post()">
		</div> 
		<div class="input__btn" @click="$refs.fileInput.click()">
			<input class="input__upload" type="file" ref="fileInput">
			<img src="@/assets/Input/photo.png" alt="upload">
		</div>
		<div class="input__btn" @click="post()">
			<img src="@/assets/Input/send.png" alt="arrow">
		</div>
	</div>
</template>
<script>
const url = 'http://localhost:3000/homeData';
import CurrentDate from '@/mixins/currentDate';
import Api from '@/services/api';
export default {
	name: 'Name',
	mixins: [CurrentDate],
	data() {
		return {
			api: new Api(url),
			msg: '',
		}
	},
	methods: {
		object() {
			return {
				title: '',
				text: this.msg,
				data: this.currentDate(),
				label: '',
				img: '',
				alt: '',
				btn: ''
			} 
		},
		async post() {
			if (this.cheak(this.msg)) {
				await this.api.makePost(this.object());
				this.msg = ''
				this.$emit('reload');
			}
		},
    cheak(str) {
			return str === '' ? false : true;
    },
	}
}
</script>

<style lang="scss">
.input {
	height: rem(75);
	margin: rem(30) 0;
	padding: 0 rem(20) 0 rem(30);
	@include Flex(space-between);
	@include boxShadow(0.2);
	background-color: $backColor;
	border-radius: 5px;
	transition-duration: .5s;
	&__contener {
		width: rem(450);
		height: rem(30);
	}
	&__field {
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		background-color: transparent;
		color: $white;
	}
	&__btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: rem(44);
		height: rem(44);
		border-radius: 50%;
		background-color: $btn;
		cursor: pointer;
	}
	&__btn:last-child {
		background-color: $active;
	}
	&__upload {
		display: none;
	}
}
.input:hover {
	@include boxShadow(0.5);
}
</style>
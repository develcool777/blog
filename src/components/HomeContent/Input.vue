<template>
	<div class="input">
		<div class="input__contener">
			<input 
				class="input__field" 
				type="text" 
				placeholder="Напишите что нибудь" 
				v-model="msg" 
				v-on:keyup.enter="post()"
			>
		</div> 
		<div class="input__btn" @click="$refs.fileInput.click()">
			<input 
				class="input__upload" 
				type="file" 
				ref="fileInput"
				accept="images/*"
				@change="onFilePicked"
			>
			<img src="@/assets/Input/photo.png" alt="upload">
		</div>
		<div class="input__btn" @click="post()">
			<img src="@/assets/Input/send.png" alt="arrow">
		</div>
	</div>
</template>
<script>
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import CurrentDate from '@/mixins/currentDate';
export default {
	name: 'Name',
	mixins: [CurrentDate],
	props: {
		Id: {
			type: Number
		} 
	},
	data() {
		return {
			msg: '',
			imgUrlForPreview: '',
			imgUrlFirebase: '',
			image: null,
			imageName: '',
			uploadValue: 0,
			isImage: false
		}
	},
	methods: {
		async post() {
			if (this.cheak(this.msg)) {
				if (this.isImage) { 
					console.log('how')
					await this.upload() 
				}
				const db = firebase.firestore();
				const id = this.Id + 1;
				await db.collection('HomeData').doc(`${id}`).set({
					title: '',
					text: this.msg,
					date: this.currentDate(),
					label: '',
					img: this.imgUrlFirebase,
					imgName: this.imageName,
					alt: '',
					btn: ''
				});
				console.log('here pls');
				this.msg = '';
				this.image = null;
				this.imageName = '';
				this.imgUrlFromFirebase = '';
				this.imgUrlForPreview = ''; 
				this.isImage = false;
				this.$emit('reload');
			}
		},
    cheak(str) {
			return str === '' ? false : true;
		},
		onFilePicked(event) {
			const files = event.target.files;
			const fileName = files[0].name;
			if (fileName.lastIndexOf('.') <= 0) {
				return alert('please add normal file');
			}
			// const fileReader = new FileReader();
			// fileReader.addEventListener('load', () => {
			// 	this.imgUrlForPreview = fileReader.result;
			// })	
			// fileReader.readAsDataURL(files[0]);
			this.image = files[0];
			const splitByDot =  fileName.split('.');
			this.imageName = `img${this.Id + 1}.${splitByDot[splitByDot.length - 1]}`
			this.isImage = true;
		},
		async upload() {
			const storage = firebase.storage().ref('homeData').child(`${this.imageName}`);
			await	storage.put(this.image)
			this.imgUrlFirebase = await storage.getDownloadURL();
			// storage.put(this.image).on('loading', snapshot => {
			// 	this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
			// })
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
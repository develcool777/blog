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
		<div 
			class="input__btn" 
			@click="addImg($refs)" 
			:style="{cursor: imageAdded ? 'default' : 'pointer'}"
		>
			<input 
				class="input__upload" 
				type="file" 
				ref="fileInput"
				accept="images/*"
				@change="onFilePicked"
			>
			<div class="input__selected" v-if="imageAdded" @click="preview()"></div>
			<img src="@/assets/Input/photo.svg" alt="upload">
		</div>
		<div class="input__btn" @click="post()">
			<img src="@/assets/Input/send.svg" alt="arrow">
		</div>
	</div>
	<Preview 
		:status="showPreview"
		:imgUrl="imgUrlForPreview"
		v-on:close="closePreview()"
		v-on:delete="deletePreview()"
	/>
</template>
<script>
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import CurrentDate from '@/mixins/currentDate';
import Preview from '@/components/HomeContent/Input/Preview';
export default {
	name: 'Name',
	mixins: [CurrentDate],
	components: {
		Preview
	},
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
			image: '',
			imageName: '',
			uploadValue: 0,
			isImage: false,
			imageAdded: false,
			showPreview: false,
		}
	},
	methods: {
		async post() {
			if (this.cheak(this.msg)) {
				if (this.isImage) { 
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
				this.deletePreview();
				// this.image = '';
				// this.imageName = '';
				// this.imgUrlFirebase = '';
				// this.imgUrlForPreview = ''; 
				// this.isImage = false;
				this.$emit('reload');
				console.log('posted');
			}
		},
    cheak(str) {
			return str === '' ? false : true;
		},
		preview() {
			this.showPreview = true;
			console.log('preview');
		},
		closePreview() {
			this.showPreview = false
		},
		deletePreview() {
			this.image = '';
			this.imageName = '';
			this.imgUrlFirebase = '';
			this.imgUrlForPreview = ''; 
			this.isImage = false;
			this.showPreview = false;
			this.imageAdded = false;
			console.log('del');
		},
		addImg(e) {
			if (!this.imageAdded) {
				e.fileInput.click()
			}
		},
		typeOfError() {

		},
		onFilePicked(event) {
			const MAX_SIZE = 100000;
			const MAX_WIDTH = 700;
			const MAX_HEIGHT = 300;
			const file = event.target.files[0];
			const fileName = file.name;
			if (fileName.lastIndexOf('.') <= 0) {
				return alert('please add file with extention: .png, .jpg, jpeg');
				// this.typeOfError();
			}
			// console.log(file.size);
			if (file.size > MAX_SIZE) {
				console.log('Error');
			}
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = e => {
				this.imgUrlForPreview = fileReader.result;
				const src = e.target.result;
				const img = new Image();
				img.onload = () => {
					if (img.width > MAX_WIDTH) {
						console.log('img width');
					}
					if (img.width > MAX_HEIGHT) {
						console.log('img height');
					}
					console.log(img.width, img.height, 'iqbrvpbqip');
						// this.$emit('loaded', {src, file, width: img.width});
				};
				img.src = src;
			}
			this.image = file;
			const splitByDot =  fileName.split('.');
			this.imageName = `img${this.Id + 1}.${splitByDot[splitByDot.length - 1]}`;
			this.isImage = true;
			this.imageAdded = true;
		},
		async upload() {
			const storage = firebase.storage().ref('homeData').child(`${this.imageName}`);
			await	storage.put(this.image);
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
		position: relative;
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
	&__selected {
		position: absolute;
		top: 0;
		right: 0;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: red;
		cursor: pointer;
	}
	&__upload {
		display: none;
	}
}
.input:hover {
	@include boxShadow(0.5);
}
</style>
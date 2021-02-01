<template>
  <div class="works" :class="{'fullHeight': loading}">
		<div class="wrapper">
			<h2 class="works__title" v-once>Мои Работы</h2>
			<section class="works__items">
				<Work 
					v-cloak
					class="works__item" 
					:work="item" 
					v-for="(item, i) in worksData" 
					:key="i" 
				/>
			</section> 
			<ProgressBar v-if="loading" class="works__progress" :step="5"/>
		</div>
  </div>
</template>

<script>
import firebase from 'firebase/app'; 
import "firebase/firestore";
import "firebase/storage";
import Work from '@/components/Works/Work';
import ProgressBar from '@/components/ProgressBar'
export default {
	name: 'Works',
	components: {
		Work,
		ProgressBar
	},
	data() {
		return {
			worksData: [],
			imgs: [],
			showData: false,
			loading: true
		}
	},
	created() {
		console.time();
		this.getData();
		// this.getImages();
		console.timeEnd();
	},
	mounted() {
		// console.time();
		// this.getData();
		// // this.getImages();
		// console.timeEnd();
	},
	methods: {
		async getData() {
			const db = firebase.firestore();
			// db.settings({timestampsInSnapshots: true});
			const res = await db.collection('myWorks').get();
			res.docs.forEach(doc => {
				this.worksData.push(doc.data())
			})
			this.loading = false;
			console.log('data');
		},
		// async getImages() {
		// 	const storageImgs = firebase.storage().ref('myWork');
		// 	const imgNames = (await storageImgs.listAll()).items.map(i => i.name)
		// 	const promises = imgNames.map(async name => {
		// 		const itemRef = storageImgs.child(name);
		// 		const res = await itemRef.getDownloadURL();
		// 		return res;
		// 	})
		// 	this.imgs = await Promise.all(promises);
		// 	console.log('imgs', this.imgs[1]);
		// 	this.merge();
		// },
		// merge() {
		// 	this.imgs.forEach((url, i) => {
		// 		this.worksData[i].img = url
		// 	})
		// 	console.log(this.worksData)
		// }
	}
}
</script>

<style lang="scss">
.works {
	background-color: red;
	background-color: $background;
	padding: rem(60) 0 rem(80);
	&__title {
		color: $white;
		font-size: rem(20);
		font-weight: normal;
		margin-bottom: rem(30);
	}
	&__items {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	&__item:not(:last-child) {
		margin-bottom: rem(30);
	}
	&__progress {
		@include Flex(center);
	}
}
.fullHeight {
	height: 100vh;
}
[v-cloak] {
  display: none;
}
</style>
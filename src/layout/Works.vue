<template>
  <div class="works">
		<div class="wrapper">
			<h2 class="works__title" v-once>Мои Работы</h2>
			<section class="works__items">
				<Work class="works__item" :work="item" v-for="(item, i) in worksData" :key="i" />
			</section> 
		</div>
  </div>
</template>

<script>
import firebase from 'firebase/app'; 
import "firebase/firestore";
import "firebase/storage";
import Work from '@/components/Works/Work';
export default {
	name: 'Works',
	components: {
		Work
	},
	data() {
		return {
			worksData: [],
			imgs: []
		}
	},
	mounted() {
		this.getData();
		this.getImages();
	},
	methods: {
		async getData() {
			const db = firebase.firestore();
			// db.settings({timestampsInSnapshots: true});
			const res = await db.collection('myWorks').get();
			res.docs.forEach(doc => {
				this.worksData.push(doc.data())
			})
			console.log('data');
		},
		async getImages() {
			const storageImgs = firebase.storage().ref('myWork');
			const imgNames = (await storageImgs.listAll()).items.map(i => i.name)
			const promises = imgNames.map(async name => {
				const itemRef = storageImgs.child(name);
				const res = await itemRef.getDownloadURL();
				return res;
			})
			this.imgs = await Promise.all(promises);
			console.log('imgs');
			this.merge();
		},
		merge() {
			this.imgs.forEach((url, i) => {
				this.worksData[i].img = url
			})
			console.log(this.worksData)
		}
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
}
</style>
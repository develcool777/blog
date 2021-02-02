<template>
  <div class="content">
		<div class="wrapper" v-if="isShow">
			<section class="content__videos">
				<Video 
					:video="item" 
					v-for="(item, i) in VideoData" 
					:key="i"/>
			</section>
			<Input 
				v-on:reload="reload()" 
				:Id="ItemDataLen"
			/>
			<section class="content__items">
				<Item 
					class="content__item" 
					v-for="(item, i) in chosenItems(currentPage)" 
					:key="i" 
					:Item="item"
					v-on:deleteItem="deleteItem($event)"
					v-on:more="showMore($event)"
				/>
			</section>
			<Pagination 
				v-if="render"
				:Pages="pages"
				v-on:changePage="change($event)"
			/>
		</div>
		<div class="wrapper" v-else>
			<More 
				:Item="ItemDataMore"
				v-on:back="back()"
			/>
		</div>
		<ProgressBar v-if="false"/>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

import Video from '@/components/HomeContent/Video';
import Input from '@/components/HomeContent/Input';
import Item from '@/components/HomeContent/Item';
import Pagination from '@/components/HomeContent/Pagination';
import More from '@/components/HomeContent/More';
import ProgressBar from '@/components/ProgressBar';
export default {
	name: 'HomeContent',
	components: {
		Video,
		Input,
		Item,
		Pagination,
		More,
		ProgressBar
	},
	data() {
		return {
			VideoData: [],
			ItemData: [],
			ItemDataLen: 0,
			amountOfImgs: 0,
			ItemDataMore: {},
			currentPage: 0,
			pages: [],
			onPage: 5, 
			render: false,
			isShow: true,
		}
	},
	created() {
		this.init();
	},
	methods: {
		async init() {
			this.VideoData = await this.getData('Videos');
			this.ItemData = await this.getData('HomeData', true);
		},
		async reload() {
			this.ItemData = await this.getData('HomeData', true);
		},
		async getData(location, pages=false) {
			const result = [];
			const db = firebase.firestore();
			// db.settings({timestampsInSnapshots: true});
			const collection = await db.collection(location).get();
			// res.on('state_changed',
			// function progress(snapshot) {
			// 	console.log("snapshot: " + snapshot);
			// 	const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			// 	console.log("percentage: " + percentage);
			// })
			// console.log(res.docs.length);
			collection.docs.forEach(doc => {
				const merged = this.merge(doc.data(), doc.id, 'docName');
				result.push(merged)
			})
			if (pages) { 
				const imgs = firebase.storage().ref('homeData');
				this.amountOfImgs = (await imgs.listAll()).items.length;
				this.ItemDataLen = collection.docs.length;
				this.$nextTick(() => {
					this.pages = this.createPages(result) 
				});
				result.reverse();
			}
			return result;
		},
		merge(obj, value, key) {
			if (obj[key] === undefined) {
				obj[key] = value;
			}
			return obj;
		},
		async getMore(id) {
			this.ItemDataMore = await this.api3.makeGet(`/${id}`);
		},
		async deleteItem(obj) {
			const {id, isImg, name} = obj
			if (isImg) {
				const imgs = firebase.storage().ref('homeData').child(name);
				await imgs.delete();
			}
			const data = firebase.firestore().collection('HomeData').doc(id);
			await data.delete();
			console.log('done');
			this.reload();
		},
		chosenItems(i) {
			const left = i * this.onPage;
			const right = left + this.onPage;
			return this.ItemData.slice(left, right);
		},
		createPages(data) {
			const amount = Math.ceil(data.length / 5);
			const result = [];
			for (let i = 1; i <= amount; i++) {
				result.push(i);
			}
			this.render = true;
			return result;
		},
		change(i) {
			this.currentPage = i-1;
		},
		showMore(id) {
			this.getMore(id)
			this.isShow = false;
		},
		back() {
			this.isShow = true;
		}
	}
}
</script>

<style lang="scss">
.content {
	background-color: red;
	background-color: $background;
	padding: rem(70) 0 rem(80);
	&__videos {
		@include Flex(space-between);
	}
	&__items {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	&__item {
		margin: rem(15) 0;
	}
	&__item:first-child {
		margin-top: 0;
	}
	&__item:last-child {
		margin-bottom: 0;
	}
}
</style>
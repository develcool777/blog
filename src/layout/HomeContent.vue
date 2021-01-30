<template>
  <div class="content">
		<div class="wrapper" v-if="isShow">
			<section class="content__videos">
				<Video :video="item" v-for="(item, i) in VideoData" :key="i"/>
			</section>
			<Input v-on:reload="getRequest()"/>
			<section class="content__items" >
				<Item 
					class="content__item" 
					v-for="(item, i) in chosenItems(currentPage)" 
					:key="i" 
					:Item="item"
					v-on:deleteID="deleteItem($event)"
					v-on:more="showMore($event)"
				/>
			</section>
			<Pagination 
				v-if="render"
				:Pages="AmountOfPages"
				:Right="rightEdge"
				v-on:changePage="change($event)"
			/>
		</div>
		<div class="wrapper" v-else>
			<More 
				:Item="ItemDataMore"
				v-on:back="back()"
			/>
		</div>
  </div>
</template>

<script>
const url = 'http://localhost:3000/videos';
const url2 = 'http://localhost:3000/homeData';
const url3 = 'http://localhost:3000/homeDataMore';
import Api from '@/services/api';
import Video from '@/components/HomeContent/Video';
import Input from '@/components/HomeContent/Input';
import Item from '@/components/HomeContent/Item';
import Pagination from '@/components/HomeContent/Pagination';
import More from '@/components/HomeContent/More';
export default {
	name: 'HomeContent',
	components: {
		Video,
		Input,
		Item,
		Pagination,
		More
	},
	data() {
		return {
			VideoData: [],
			ItemData: [],
			ItemDataMore: {},
			currentPage: 0,
			AmountOfPages: [],
			rightEdge: 0,
			onPage: 5, 
			render: false,
			isShow: true,
			api: new Api(url),
			api2: new Api(url2),
			api3: new Api(url3),
		}
	},
	mounted() {
		this.getRequest();
	},
	methods: {
		async getRequest() {
			this.VideoData = await this.api.makeGet();
			const data = await this.api2.makeGet();
			this.ItemData = data.reverse();
			this.pages();
			this.right();
			this.render = true;
		},
		async getMore(id) {
			this.ItemDataMore = await this.api3.makeGet(`/${id}`);
		},
		async deleteItem(id) {
			await this.api2.makeDelete(`/${id}`);
			this.getRequest();
		},
		chosenItems(i) {
			const left = i * this.onPage;
			const right = left + this.onPage;
			return this.ItemData.slice(left, right);
		},
		pages() {
			const amount = Math.ceil(this.ItemData.length / 5);
			for (let i = 1; i <= amount; i++) {
				this.AmountOfPages.push(i);
			}
		},
		right() {
			const pages = this.AmountOfPages.length;
			this.rightEdge = pages < 3 ? pages : 3;
		},
		change(i) {
			this.currentPage = i;
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
<template>
	<div class="video" @click="show(video.id)">
		<img :src="video.img" :alt="video.alt" class="video__img">
		<div class="video__title">{{video.title}}</div>
		<div class="video__date">{{video.date}}</div>
	</div>
	<BigVideo :showVideo="showVideo" :url="video.video" :id="video.id" v-on:closeBigVideo="show($event)"/>
</template>

<script>
import BigVideo from '@/components/HomeContent/Video/BigVideo';
export default {
	name: 'Video',
	components: {
		BigVideo 
	},
	props: {
		video: {
			type: Object
		}
	},
	data() {
		return {
			showVideo: NaN
		}
	},
	methods: {
		show(i) {
			this.showVideo = i
		}
	}
}
</script>

<style lang="scss">
.video {
	width: rem(140);
	height: rem(195);
	position: relative;
	cursor: pointer;
	transition-duration: .5s;
	&__img {
		width: 100%;
		height: 100%;
		border: none;
	}
	&__title, &__date {
		position: absolute;
		color: $white;
		font-family: 'Lato', sans-serif;
		font-weight: normal;
		font-size: rem(12);
	}
	&__title {
		top: rem(14);
		left: rem(12);
		max-width: rem(110);
		@include ColorDirectionText(red, $white, .5s, to right, 100%); 
	}
	&__date {
		bottom: rem(14);
		right: rem(16);
		@include ColorDirectionText(red, $white, .5s, to left, 0);
	}
}
.video:hover {
	transform: translateY(-10px);
}
.video:hover .video__title {
	background-position: 0 100%;
}
.video:hover .video__date {
	background-position: 100% 0; 
}

</style>
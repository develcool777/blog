<template>
  <transition name="fade">
		<div class="modal" v-if="show()">
			<div class="mask" @click="close()"></div>
			<div class="bigVideo center">
				<img class="bigVideo__video" :src="require(`@/assets/HomeContent/big/${url}`)" alt="">
			</div>
		</div>
  </transition>
</template>

<script>
export default {
	name: 'BigVideo',
	props: {
		showVideo: {
			type: Number
		},
		url: {
			type: String
		},
		id: {
			type: Number
		}
	},
	data() {
		return {
			isShow: false
		}
	},
	methods: {
		close() {
			this.$emit('closeBigVideo', NaN)
		},
		show() {
			return this.id === this.showVideo ? true : false;
		}
	}
}
</script>

<style lang="scss">
.bigVideo {
	width: rem(450);
	height: rem(600);
	background-color: $white;
	z-index: $modalContent;
	&__video {
		width: 100%;
		height: 100%;
		border: none;
	}
}
</style>
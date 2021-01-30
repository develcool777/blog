<template>
	<div class="block">
		<section class="block__background">
			<img class="block__avatar" src="./../assets/ShortInfo/avatar.png" alt="Avatar">
		</section>
		<section class="block__author">
			<div class="block__title">Vadim Pavliuk</div>
			<div class="block__subtitle">блог front-end разработчика</div>
		</section>
		<section class="block__social">
			<a 
				class="block__soc" 
				target="_blank"
				v-for="(item, i) in imgs"
				:key="i"
				:href="item.href" 
			>
				<img :src="require(`./../assets/ShortInfo/${item.src}`)" :alt="item.alt"/>
			</a>
		</section>
		<section class="block__text">
				Front-end разработчик. Практик верстки сайтов.Созданием сайтов занимаюсь с 2012 года. Работал в нескольких ИТ компаниях и наработал более 10 000 часов в создании сайтов различной сложности.
		</section>
		<section class="block__btns">
			<router-link tag="div" to="/works" class="block__btn">Мои работы</router-link>
			<div class="block__btn block__btn--blue" @click="isShow = true">Написать мне</div>
		</section>
	</div>
	<Contact :status="isShow" v-on:close="updated()"/>
</template>
<script>
import Contact from '@/components/ShortInfo/Contact';
export default {
  name: 'ShortInfo',
  components: {
		Contact
  },
  data() {
		return {
			isShow: false,
			imgs: [
				{ href: 'https://www.instagram.com', src: 'instagram.png', alt: 'instagram'},
				{ href: 'https://www.vk.com', src: 'vk.png', alt: 'vk'},
				{ href: 'https://www.pinterest.com', src: 'pinterest.png', alt: 'pinterest'},
			]
		}
  },
  methods: {
		updated() {
			this.isShow = false
		}
  }
}
</script>

<style lang="scss">
.block {
	width: 100%;
	max-width: rem(300);
	background-color: $background;
	color: $white;
	&__background {
		position: relative;
		height: rem(180);
		background-image: url('./../assets/ShortInfo/background.jpg');
	}
	&__avatar {
		border-radius: 50%;
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	&__author {
		margin-top: rem(70); 
		text-align: center;
	}
	&__title {
		font-size: rem(18);
		font-weight: normal;
	}
	&__subtitle {
		font-size: rem(14);
		font-weight: lighter;
	}
	&__social {
		@include Flex(space-between);
		width: rem(105);
		margin: rem(18) auto 0;
	}
	&__soc {
		transition: .5s;
	}
	&__soc:hover {
		transform: translateY(-5px);
	}
	&__text, &__btns {
		width: 100%;
		max-width: rem(260);
		margin: rem(60) auto;
	}
	&__text {
		position: relative;
		text-align: center;
		line-height: 1.5;
		font-size: rem(12);
		font-weight: normal;
	}
	&__text::before, &__text::after {
		position: absolute;
		content: "";
		left: 0;
		width: rem(260);
		height: 1px;
		background: lightgray;
	}
	&__text::before {
		top: rem(-30);
	}
	&__text::after {
		bottom: rem(-30);
	}
	&__btns {
		@include Flex(space-between);
	}
	&__btn {
		padding: rem(12) rem(25);
		border-radius: rem(25);
		background-color: $red;
		font-size: rem(12);
		text-decoration: none;
		color: $white;
		cursor: pointer;
		transition-duration: .5s;
		&--blue {
			background-color: $blue;
		}
	}
	&__btn:hover {
		background-color: $white; 
		color: $red;
	}
	&__btn:hover:nth-child(2) {
		color: $blue;
	}
}
</style>
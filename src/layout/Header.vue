<template>
	<header class="header">
		<nav class="header__menu">
			<div class="header__link header__link--relative" 
				@click="menu(true, 1)"
				v-bind:class="{ activeMenu: stage === 1 }">Статьи
				<div v-if="isShow" class="header__secondary">
					<router-link class="header__link2" 
						tag="div" 
						v-for="(item, i) in navbars2" 
						:key="i" 
						:to="{path:item.router}" 
						@click="menu(false, null)">{{item.name}}
					</router-link> 
				</div>
			</div>
			<router-link class="header__link" 
				tag="div" 
				v-for="(item, i) in navbars" 
				:key="i" 
				:to="{path:item.router}"
				@click="menu(false, i+2)"
				v-bind:class="{ activeMenu: stage === i+2 }">{{item.name}}
			</router-link> 
		</nav>
		<div class="header__searchBox" @click="menu(false)">
			<input class="header__input" type="text" placeholder="Поиск по блогу">
		</div>
	</header>
</template>
<script>
export default {
	name: 'Header',
	props: {
		active: {
			type: Number
		}
	},
	data() {
		return {
			isShow: false,
			stage: this.active,
			navbars: [
				{ name: 'Главная', router: '/home' },
				{ name: 'Обо мне', router: '/about' },
				{ name: 'Реклама', router: '/advertisement' },
				{ name: 'Профиль', router: '/profile' },
			],
			navbars2: [
				{ name: 'Создание сайтов', router: '/home', },
				{ name: 'Интернет-маркетинг', router: '/xx2' },
				{ name: 'Продвижение видео', router: '/xx3' },
			]
		}
	},
	methods: {
		menu(boolean, active=0) {
			this.isShow = boolean;
			if (active !== 0) {
				this.stage = active
			}
		}
	}
}
</script>
<style lang="scss">
.header {
	@include Flex(space-between);
	background-color: $dark;
	height: rem(40);
	&__searchBox {
		width: rem(212);
		height: inherit;
	}
	&__input {
		width: 100%;
		height: 100%;
		border: none;
		outline: none;
		background-color: $input;
		color: $white;
		padding: rem(12) 0 rem(12) rem(20);
	}
	&__menu {
		display: flex;
		cursor: default;
	}
	&__menu :nth-child(1) { order: 2; }
	&__menu :nth-child(2) { order: 1; }
	&__menu :nth-child(3) { order: 3; }
	&__menu :nth-child(4) { order: 3; }
	&__menu :nth-child(5) { order: 3; }
	&__link, &__link2 {
		color: $white;
		text-decoration: none;
	}
	&__link {
		padding: 13px 20px;
		font-size: rem(12);
		text-transform: uppercase;
		cursor: pointer;
		&--relative {
			position: relative;
		}
	}
	&__link:hover {
		background-color: $active;
	}
	&__link:nth-child(1) {
		padding-right: rem(30);
	}
	&__link:nth-child(1)::after {
		position: absolute;
		content: "";
		position: absolute;
		top: 50%;
		left: 80%;
		transform: translateY(-15%); 
		border: 5px solid transparent;
		border-top: 5px solid $white; 
	}
	&__secondary {
		display: flex;
		flex-direction: column;
		width: rem(188);
		position: absolute;
		top: 100%;
		left: 0;
		background-color: $active;
		z-index: $secondaryMenu;
	}
	&__link2 {
		font-size: rem(10);
		margin: rem(10) 0 rem(10) rem(20);
		text-transform: none;
		display: inline-flex;
	}
}
.activeMenu {
	background-color: $active; 
}
</style>
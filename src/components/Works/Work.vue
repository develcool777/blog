<template>
	<div class="work">
		<div class="work__cImg">
			<img class="work__img" :src="work.img" :alt="work.alt">
		</div>
		<div class="work__info">
			<div class="work__block">
				<h3 class="work__title">{{work.title}}</h3>
				<p class="work__text">{{work.text}}</p>
				<div class="work__tags">
					<div class="work__tag" v-for="(item, i) in work.tags" :key="i">{{item}}</div>
				</div>
			</div>
			<a class="work__link" :href="work.link" target="_blank">
				<div class="work__btn">Перейти на сайт</div>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Work',
	props: {
		work: {
			type: Object
		}
	}
}
</script>

<style lang="scss">
.work {
	display: flex;
	justify-content: space-between;
	width: rem(600);
	min-height: rem(512);
	max-height: rem(552);
	background-color: $input;
	border-radius: 0 5px 5px 0;
	color: $white;
	@include boxShadow(0.2);
	transition-duration: .5s;
	&__cImg {
		background-color: $back;
		width: rem(310);
	}
	&__img {
		border: none;
	}
	&__info {
		width: rem(290);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: rem(25) 0;
		height: inherit;
	}
	&__block {
		width: rem(240);
	}
	&__title {
		font-size: rem(24);
		font-weight: 400;
	}
	&__text {
		font-size: rem(16);
		font-weight: lighter;
		max-height: rem(270);
		overflow: scroll;
		margin: rem(30) 0;
		line-height: 1.5;
		color: $text;
	}
	&__tags {
		@include Flex(space-between);
		flex-wrap: wrap;
		max-width: rem(200);
	}
	&__tag {
		padding: 5px rem(10);
		background-color: $tag;
		border-radius: 5px;
		font-size: rem(10);
	}
	&__tag:nth-child(n + 4) {
		margin-top: rem(10);
	}
	&__btn {
		padding: rem(10) rem(15);
		background-color: $active;
		border-radius: 5px;
		cursor: pointer;
		transition-duration: .5s;
	}
	&__btn:hover {
		color: $active;
		background-color: $white;
	}
	@include LinkShort(none, $white);
}
.work:hover {
  @include boxShadow(0.5);
}
</style>
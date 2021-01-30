<template>
	<div class="page">
		<ShortInfo/>
		<div class="page__right">
			<Header :active="activeMenu"/>
			<div class="advertisement">Реклама</div>
		</div>
	</div>
</template>

<script>
import ShortInfo from '@/layout/ShortInfo';
import Header from '@/layout/Header';
export default {
	name: 'Advertisement',
	props: ['activeMenu'],
	components: {
		ShortInfo,
		Header,
	}
}
</script>

<style lang="scss">
.advertisement {
  padding-top: rem(70);
  height: 100vh;
  background-color: $background;
  color: $white;
}
</style>
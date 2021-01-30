<template>
	<transition name="fade">
		<div class="modal" v-if="status">
			<div class="mask" @click="close()"/>
			<div class="share center">
				<div class="share__close" @click="close()"></div>
        <div class="share__blocks">
          <a href="https://www.facebook.com" target="_blank">
            <img class="share__block" src="@/assets/HomeContent/share/facebook.png" alt="facebook">
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <img class="share__block" src="@/assets/HomeContent/share/twitter.png" alt="twitter">
          </a>
          <a href="https://www.vk.com" target="_blank">
            <img class="share__block" src="@/assets/HomeContent/share/vk.png" alt="vk">
          </a>
          <a href="https://www.copy.com" target="_blank">
            <img class="share__block" src="@/assets/HomeContent/share/copy.png" alt="copy">
          </a>
        </div>
			</div>
		</div>
	</transition>
</template>

<script>
import closeModals from '@/mixins/closeModals';
export default {
  name: "Share",
  mixins: [closeModals],
}
</script>

<style lang="scss">
.share {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: rem(500);
  height: rem(200);
	background-color: $input;
	z-index: $modalContent;
  border-radius: 5px;
  &__blocks {
    width: rem(225);
    @include Flex(space-between);
  }
  &__block {
    transition-duration: .5s;
  }
  &__block:hover {
    transform: translateY(-10px);
  }
  @include CloseModal();
}
</style>
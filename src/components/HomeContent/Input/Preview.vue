<template>
	<transition name="fade">
		<div class="modal" v-if="status">
			<div class="mask" @click="close()"/>
			<div class="preview center">
				<div class="preview__close" @click="close()"></div>
				<img :src="imgUrl" class="preview__img">
        <div class="preview__btn" @click="deleteImage()">Delete image</div>
			</div>
		</div>
	</transition>
</template>

<script>
import closeModals from '@/mixins/closeModals';
export default {
  name: 'Preview',
  mixins: [closeModals],
  props: {
    imgUrl: {
      type: String
    }
  },
  methods: {
    deleteImage() {
      this.$emit('delete');
    }
  }
}
</script>

<style lang="scss">
.preview {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	width: rem(800);
	height: rem(500);
	background-color: $input;
	z-index: $modalContent;
  @include CloseModal();
  &__btn {
    margin-top: rem(30);
    padding: rem(10) rem(20);
    background: $red;
    color: $white;
    border-radius: rem(10);
    font-size: rem(20);
    cursor: pointer;
    transition-duration: .5s;
  }
  &__btn:hover {
    color: $red;
    background: $white;
  }
}
</style>
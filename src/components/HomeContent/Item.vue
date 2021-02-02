<template>
  <div class="item">
    <section class="item__cimg" v-if="cheak(Item.img)">
      <img class="item__img" :src="Item.img" :alt="Item.alt">
    </section>
    <section class="item__info">
      <h3 class="item__title">{{Item.title}}</h3>
      <p class="item__text">{{Item.text}}</p>
      <div class="item__footer">
        <div class="item__merge">
          <div class="item__date">{{Item.date}}</div>
          <div class="item__dot" v-if="cheak(Item.label)"></div>
          <div class="item__label">{{Item.label}}</div>
        </div>
        <div class="item__btn" @click="showMore(Item.id)">{{Item.btn}}</div>
      </div>
    </section>
    <div class="item__close" @click="deleteItem(Item.imgName, Item.docName)"></div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    Item: {
      type: Object
    }
  },
  methods: {
    cheak(str) {
      return str !== '' ? true : false;
    },
    deleteItem(name, id) {
      let isImg = true
      if (name === '') {
        isImg = false
      }
      const obj = {id, isImg, name}
      this.$emit('deleteItem', obj);
    },
    showMore(id) {
      this.$emit('more', id);
    }
  }
}
</script>

<style lang="scss">
.item {
  position: relative;
  width: rem(600);
  @include boxShadow(0.2);
  border-radius: 5px;
  background-color: $input;
  transition-duration: .5s;
  &__cimg {
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding-top: rem(25); if image smaller
  }
  &__img {
    border-radius: 5px 5px 0 0;
  }
  &__info {
    padding: rem(25);
  }
  &__title {
    color: $white;
    font-weight: rem(18);
  }
  &__text {
    margin: rem(15) 0 rem(20);
    font-size: rem(14);
    font-weight: normal;
    max-height: rem(80);
    overflow: hidden;
    color: $text;
    line-height: 1.5;
  }
  &__footer, &__merge {
    @include Flex(space-between);
  }
  &__merge {
    width: rem(200);
    color: $adds;
  }
  &__date, &__label {
    font-size: rem(12);
    font-weight: normal;
  }
  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: $adds;
  }
  &__btn {
    color: $link;
    cursor: pointer;
  }
	&__close, &__close::before, &__close::after {
		position: absolute;
		width: rem(20);
		content: "";
		transition-duration: .5s;
	}
	&__close {
		top: rem(20);
		right: rem(20);
		height: rem(20);
		cursor: pointer;
	}
	&__close::before, &__close::after {
		top: rem(10);
		height: 2px;
		background: #FF4500;
	}
	&__close::before {
		transform: rotate(45deg);
	}
	&__close::after {
		transform: rotate(135deg);
	}
	&__close:hover::before, &__close:hover::after {
		// transform: rotate(360deg);
		height: 5px;
		background: $red;
	}
}
.item:hover {
  @include boxShadow(0.5);
}
</style>
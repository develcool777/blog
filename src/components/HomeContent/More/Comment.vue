<template>
  <div class="comment">
    <div class="comment__person">
      <img :src="require(`@/assets/HomeContent/more/comments/${Item.img}`)" alt="avatar">
      <div class="comment__info">
        <div class="comment__name">{{Item.name}}</div>
        <div class="comment__date">{{Item.date}}</div>
      </div>
    </div>
    <div class="comment__text">{{Item.text}}</div>
    <div class="comment__btn">Ответить</div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    Item: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
.comment {
  color: $white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: rem(12);
  &__person {
    @include Flex(flex-start);
    font-weight: normal;
  }
  &__info {
    margin-left: rem(15);
  }
  &__date {
    color: $color13;
  }
  &__text {
    margin: rem(15) 0 5px;
  }
  &__btn {
    color: $active;
    cursor: pointer;
  }
}
</style>
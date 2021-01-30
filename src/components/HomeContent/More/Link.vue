<template>
  <div class="link">
    <div class="link__title">{{Item.title}}</div>
    <div class="link__data">{{Item.data}}</div>
  </div>
</template>

<script>
export default {
  name: "Link",
  props: {
    Item: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
.link {
  width: rem(250);
  &__title {
    color: $title;
    font-size: rem(14);
    max-width: rem(250);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  &__data {
    font-family: 'Lato', sans-serif;
    font-size: rem(12);
    font-weight: normal;
    color: $adds;
    margin-top: 5px;
  }
}
</style>
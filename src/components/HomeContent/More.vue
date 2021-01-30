<template>
  <section class="more">
    <div class="more__menu">
      <div class="more__back" @click="back()">вернутся назад</div>
      <div class="more__share" @click="change()">
        <div class="">поделится</div>
        <img src="@/assets/HomeContent/more/1.png" alt="share">
      </div>
    </div>
    <div class="more__header">
      <div class="more__title">{{Item.title}}</div>
        <div class="more__merge">
          <div class="more__date">{{Item.data}}</div>
          <div class="more__dot"></div>
          <div class="more__label">{{Item.label}}</div>
        </div>
    </div>
    <div class="more__info">
      <p class="more__text">{{Item.text}}</p>
    </div>
    <div class="more__interesting">
      <h2 class="more__title2">Интересно почитать</h2>
      <div class="more__items">
        <Link 
          class="more__item" 
          v-for="(item, i) in Item.links" 
          :key="i"  
          :Item="item"
        />
      </div>
    </div>
    <div class="more__discussion">
      <div class="more__title2">Обсуждение</div>
      <Field 
        class="more__field"
      />
      <div class="more__comments">
        <Comment 
          class="more__comment" 
          v-for="(comment, i) in Item.comments" 
          :key="i"
          :Item="comment"  
        />
      </div>
    </div>
  </section>
  <Share 
    :status="isShare" 
    v-on:close="change()"
  />
</template>

<script>
import Share from '@/components/HomeContent/More/Share';
import Link from '@/components/HomeContent/More/Link';
import Field from '@/components/HomeContent/More/Field';
import Comment from '@/components/HomeContent/More/Comment';
export default {
  name: "More",
  data() {
    return {
      isShare: false
    }
  },
  props: {
    Item: {
      type: Object
    }
  },
  components: {
    Link,
    Share,
    Field,
    Comment
  },
  methods: {
    back() {
      this.$emit('back');
    },
    change() {
      this.isShare = !this.isShare;
    }
  }
}
</script>

<style lang="scss">
.more {
  padding: rem(16) rem(24);
  background-color: $input;
  @include boxShadow(0.2);
  border-radius: 5px;
  transition-duration: .5s;
  &__menu, &__share, &__merge {
    @include Flex(space-between);
  }
  &__menu {
    color: $white;
    font-size: rem(12);
    font-weight: normal;
  }
  &__back, &__share {
    cursor: pointer;
    transition-duration: .5s;
    opacity: .6;
  }
  &__share {
    width: rem(80);
  }
  &__back:hover, &__share:hover {
    opacity: 1;
  }
  &__header {
    margin: rem(15) 0 rem(30);
  }
  &__title, &__text {
    color: $white;
    font-size: rem(18);
    font-weight: normal;
  }
  &__merge {
    width: rem(190);
    color: $adds;
    margin-top: 5px;
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
  &__text {
    font-size: rem(14);
  }
  &__interesting {
    margin: rem(60) 0;
  }
  &__title2 {
    color: $white;
    font-size: rem(16);
    font-weight: normal;
  }
  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: rem(20);
  }
  &__item:nth-child(n+3) {
    margin-top: rem(25);
  }
  &__field {
    margin-top: rem(20);
  }
  &__comments {
    display: flex;
    flex-direction: column;
    margin-top: rem(50);
    max-height: rem(500);
    overflow: scroll;
  }
  &__comment:nth-child(n+2) {
    margin-top: rem(30);
  }
}
.more:hover {
  @include boxShadow(0.5);
}
</style>
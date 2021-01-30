<template>
  <div class="pagination">
    <div class="pagination__item pagination__prev" @click="changeLeft()"></div>
    <div class="pagination__item" 
      v-for="(num, i) in Pages.slice(left, right)" 
      :key="i"
      :class="{activePage: active === num - 1}"
      @click="changePage(num - 1)"
      >{{num}}
    </div>
    <div class="pagination__item pagination__next" @click="changeRight()"></div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    Pages: {
      type: Array
    },
    Right: {
      type: Number
    }
  },
  data() {
    return {
      left: 0,
      right: this.Right,
      active: 0
    }
  },
  methods: {
    changeLeft() {
      if (this.left > 0) {
        this.left -= 1
        this.right -= 1  
      }
      if (this.active > 0) {
        this.active -= 1
        this.$emit('changePage', this.active);
      }
      console.log('L',this.left,  this.right, this.Pages.length, this.active);
    },
    changeRight() {
      if (this.active >= 2 && this.active !== this.Pages.length - 1) {
        this.left += 1
        this.right += 1  
      }
      if (this.active !== this.Pages.length - 1) {
        this.active += 1
        this.$emit('changePage', this.active);
      }
      console.log('R',this.left,  this.right, this.Pages.length, this.active);
    },
    changePage(i) {
      this.$emit('changePage', i);
      this.active = i
      console.log('C',this.left,  this.right, this.Pages.length, this.active);
    }
  }
}
</script>

<style lang="scss">
.pagination {
  margin: rem(80) auto 0;
  width: rem(240);
  @include Flex(space-between);
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: rem(40);
    height: rem(40);
    border-radius: 5px;
    color: $white;
    background-color: $dark;
    @include boxShadow(0.2);
    cursor: pointer;
    outline: none;
    transition-duration: .5s;
  }
  &__item:hover {
    @include boxShadow(0.5);
    background-color: $activePage;
  }
  &__prev, &__next {
    position: relative;
  }
  &__prev::before, &__next::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__prev::before {
    content: "<";
  }
  &__next::after {
    content: ">";
  }
}
.activePage {
  background-color: $activePage;
}
</style>
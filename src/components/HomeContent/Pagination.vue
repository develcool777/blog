<template>
  <div class="pagination">
    <div class="pagination__item pagination__start" @click="toStart()"></div>
    <div class="pagination__item pagination__prev" @click="changeLeft()"></div>
    <div class="pagination__item" 
      v-for="(num, i) in pagesToShow" 
      :key="i"
      :class="{activePage: active === num}"
      @click="userChoosePage(num)"
      >{{num}}
    </div>
    <div class="pagination__item pagination__next" @click="changeRight()"></div>
    <div class="pagination__item pagination__end" @click="toEnd()"></div>
  </div>
</template>

<script>
import Pagination from '@/services/pagination';
export default {
  name: 'Pagination',
  props: {
    Pages: {
      type: Array
    }
  },
  data() {
    return {
      pag: new Pagination(this.Pages),
      pagesToShow: [],
      active: 0
    }
  },
  mounted() {
    this.initial(); 
  },
  methods: {
    initial() {
      this.pagesToShow = this.pag.pagesShow();
      this.active = this.pag.currentPage();
    },
    changeLeft() {
      this.pag.changeLeft();
      this.pag.prev();
      this.changePage();
    },
    changeRight() {
      this.pag.changeRight();
      this.pag.next();
      this.changePage();
    },
    toStart() {
      this.pag.toStart();
      this.changePage();
    },
    toEnd() {
      this.pag.toEnd();
      this.changePage();
    },
    userChoosePage(page) {
      this.pag.userChoosePage(page)
      this.changePage();
    },
    changePage() {
      this.active = this.pag.currentPage();
      this.pagesToShow = this.pag.pagesShow();
      this.$emit('changePage', this.active);
      // this.pag.log(); 
    }
  }
}
</script>

<style lang="scss">
.pagination {
  margin: rem(80) auto 0;
  width: rem(340);
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
  &__prev, &__next, &__start, &__end {
    position: relative;
  }
  &__prev::before, &__next::before, &__start::before, &__end::before{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__prev::before {
    content: "<";
  }
  &__next::before {
    content: ">";
  }
  &__start::before {
    content: "<<";
  }
  &__end::before {
    content: ">>";
  }
}
.activePage {
  background-color: $activePage;
}
</style>
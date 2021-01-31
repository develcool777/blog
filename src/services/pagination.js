class Pagination {
  constructor(pages) {
    if (!Array.isArray(pages)) {
      throw Error(`Pagination.constructor pages must be Array`);
    }
    if (!pages.every(i => typeof i === 'number')) {
      throw Error(`Pagination.constructor pages items must be typeof Number`);
    }
    this.pages = pages;
    this.index = 0;
    this.left = 0;
    this.amountOfPages = this.pages.length;
    this.right = this.amountOfPages < 3 ? this.amountOfPages : 3;
  }
  log() {
    console.log(`pages: ${this.pages} index: ${this.index} left: ${this.left} right: ${this.right}`);
  }
  next() {
    if (this.index < this.pages.length - 1) {
      this.index++
    }
  }
  prev() {
    if (this.index > 0) {
      this.index--
    }
  }
  userChoosePage(page) {
    if (typeof page !== 'number') {
      throw Error(`Pagination.userChoosePage() page must be Number`);
    }
    const cheak = this.pages.indexOf(page)
    this.index = cheak !== -1 ? cheak : this.index;
  }
  currentPage() {
    if (this.index >= 0 && this.index <= this.pages.length - 1) {
      return this.pages[this.index]
    }
  }
  changeLeft() {
    if (this.left > 0 && this.right - this.index === 3) {
      this.left--
      this.right--
    }
  }
  changeRight() {
    if (this.index >= 2 && this.right < this.pages.length) {
      this.left++
      this.right++
    }
  }
  toStart() {
    this.index = 0;
    this.left = 0;
    this.right = this.amountOfPages < 3 ? this.amountOfPages : 3;
  }
  toEnd() {
    this.index = this.amountOfPages - 1;
    this.right = this.amountOfPages;
    this.left = this.right < 3 ? 0 : this.right - 3;
  }
  pagesShow() {
    if (typeof this.left !== 'number' && typeof this.right !== 'number') {
      throw Error(`Pagination.pagesShow() left and right must be Number`);
    }
    return this.pages.slice(this.left, this.right);
  }
}
export default Pagination
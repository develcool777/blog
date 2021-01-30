export default {
  methods: {
    currentDate() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const cheak = (num) => num < 10 ? `0${num}` : num; 
      const year = date.getFullYear();
      return `${cheak(day)}.${cheak(month)}.${year}`;
    }
  }
}
export default {
  data() {
    return {
      form: {
        vModel: []
      },
      activeField: null,
      isActive: true,
      isSend: false,
      greenArray: []
    }
  },
  methods: {
    active(i) {
      this.activeField = i;
      this.isActive = true;
    },
		cheak(str) {
      return str === undefined || str === '' ? false : true;
    },
    passwordEqual() {
      //???????????? not working shit
      return this.form.vModel[1] === this.form.vModel[2]
    },
    addGreen(number) {
      if (!this.greenArray.includes(number)) {
        this.greenArray.push(number)
      }
    },
    removeGreen(number) {
      this.greenArray.forEach((item, i) => {
        if (item === number) {
          this.greenArray.splice(i,1);
        }
      })
    },
		colors(number) {
      const str = this.form.vModel[number]
			if (this.cheak(str)) {
        this.addGreen(number);
				return 'green'
			} else if (this.activeField === number && this.isActive) {
				return '#3137C9'; // $activeMenu
			} else if (!this.greenArray.includes(number) && this.isSend) { 
				return 'red';
			} else {
        this.removeGreen(number);
				return '#3f3f3f'; // $border
			}
    }
  }
}
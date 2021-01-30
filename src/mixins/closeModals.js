export default {
  props: {
    status: {
      type: Boolean
    }
  },
  methods: {
    close() {
			this.$emit('close')
		},
  }
}
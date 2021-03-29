<template>
  <span class="counter">{{ displayedNumber }}</span>
</template>
<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0
    }
  },

  data: ({ number }) => ({
    displayedNumber: number,
    interval: false
  }),

  watch: {
    number() {
      clearInterval(this.interval)
      this.interval = window.setInterval(this.calcNextStep, 20)
    }
  },

  methods: {
    calcNextStep() {
      if (this.displayedNumber !== this.number) {
        let change = (this.number - this.displayedNumber) / 10

        change = change >= 0 ? Math.ceil(change) : Math.floor(change)
        this.displayedNumber = this.displayedNumber + change
      } else {
        clearInterval(this.interval)
      }
    }
  }
}
</script>

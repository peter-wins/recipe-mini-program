const { getMealPlans } = require('../../meal-plans')

const minutes = [0, 20, 30, 45, 60]

Component({
  properties: {
    inventory: { type: Array, value: [] },
    inventoryReady: { type: Boolean, value: false }
  },

  data: {
    plans: [],
    minutesIndex: 0,
    readyOnly: false,
    timeLabels: ['不限耗时', ...minutes.slice(1).map(limit => `${limit} 分钟内`)]
  },

  observers: {
    'inventory, inventoryReady'(inventory, inventoryReady) {
      this.updatePlans(inventoryReady ? {} : { readyOnly: false })
    }
  },

  lifetimes: {
    attached() {
      this.updatePlans({})
    }
  },

  methods: {
    changeTime(event) {
      this.updatePlans({ minutesIndex: Number(event.detail.value) })
    },

    toggleReadyOnly() {
      this.updatePlans({ readyOnly: !this.data.readyOnly })
    },

    resetFilters() {
      this.updatePlans({ minutesIndex: 0, readyOnly: false })
    },

    updatePlans(update) {
      const { inventory, minutesIndex, readyOnly } = { ...this.data, ...update }
      const plans = getMealPlans(inventory, { maxMinutes: minutes[minutesIndex], readyOnly })
      this.setData({ ...update, plans })
    }
  }
})

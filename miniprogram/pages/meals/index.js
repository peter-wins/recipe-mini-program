const { getMealPlans } = require('../../meal-plans')
const { matchRecipes } = require('../../catalog')

Component({
  properties: {
    inventory: { type: Array, value: [] },
    inventoryReady: { type: Boolean, value: false }
  },

  data: {
    recipes: [], plans: [], quickOnly: false, readyOnly: false,
    planPreviewLimit: 2, showAllPlans: false
  },

  observers: {
    'inventory, inventoryReady'(inventory, inventoryReady) {
      this.updateMeals(inventoryReady && inventory.length ? {} : { readyOnly: false })
    }
  },

  lifetimes: {
    attached() {
      this.updateMeals({})
    }
  },

  methods: {
    togglePlans() {
      this.setData({ showAllPlans: !this.data.showAllPlans })
    },

    toggleQuickOnly() {
      this.updateMeals({ quickOnly: !this.data.quickOnly })
    },

    toggleReadyOnly() {
      this.updateMeals({ readyOnly: !this.data.readyOnly })
    },

    resetFilters() {
      this.updateMeals({ quickOnly: false, readyOnly: false })
    },

    updateMeals(update) {
      const { inventory, quickOnly, readyOnly } = { ...this.data, ...update }
      const options = { maxMinutes: quickOnly ? 30 : 0, readyOnly }
      const recipes = matchRecipes(inventory, { ...options, lightOnly: true, rankByStock: false })
      if (inventory.length) {
        recipes.sort((left, right) => left.missingCount - right.missingCount || left.minutes - right.minutes)
      }
      this.setData({ ...update, recipes, plans: getMealPlans(inventory, options) })
    }
  }
})

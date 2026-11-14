const nutrients = {
  chicken: { kcal: 120, protein: 22.5 },
  broccoli: { kcal: 34, protein: 2.82 },
  rice: { kcal: 130, protein: 2.69 },
  oil: { kcal: 884, protein: 0, gramsPerMl: 13.6 / 15 },
  soy: { kcal: 53, protein: 8.14, gramsPerMl: 16 / 15 },
  starch: { kcal: 381, protein: 0.26 }
}

function estimatePerServing(items, servings) {
  let kcal = 0
  let protein = 0
  let counted = 0
  for (const [id, amount, unit] of items) {
    const nutrient = nutrients[id]
    if (!nutrient) continue
    const grams = unit === '克' ? amount : unit === '毫升' ? amount * nutrient.gramsPerMl : NaN
    if (!Number.isFinite(grams)) continue
    kcal += grams * nutrient.kcal / 100
    protein += grams * nutrient.protein / 100
    counted += 1
  }
  if (!counted) return null
  return {
    kcal: Math.round(kcal / servings / 10) * 10,
    protein: Math.round(protein / servings)
  }
}

module.exports = { estimatePerServing }

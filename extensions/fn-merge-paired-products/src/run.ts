import type { RunInput, FunctionRunResult, CartLine, ProductVariant } from "../generated/api"

export function run(input: RunInput): FunctionRunResult {
  const RESULT: FunctionRunResult = {
    operations: []
  }

  let pairedProducts = input.cart.lines.reduce((acc, line) => {
    if(!!line.pairedProductAttr && !!line.pairedProductAttr.value) {
      if(!!acc[line.pairedProductAttr.value]) acc[line.pairedProductAttr.value].push(line)
      else acc[line.pairedProductAttr.value] = [line]
    }

    return acc
  }, {})

  for(const key in pairedProducts) {
    let pairedProduct = pairedProducts[key]

    let cartLines = pairedProduct.map((line: CartLine) => ({ cartLineId: line.id, quantity: line.quantity }))

    RESULT.operations.push({
      merge: {
        attributes: [ { key: "_pairedProduct", value: key } ],
        cartLines,
        parentVariantId: (pairedProduct[0].merchandise as ProductVariant).id,
        price: {
          percentageDecrease: {
            value: 10
          }
        }
      }
    })
  }

  return RESULT
}
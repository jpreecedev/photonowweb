import { DEFAULT_MOMENT_PRICE } from '../../config'

async function calculateOrderAmount(moments: IMoment[]) {
  moments.forEach((moment: IMoment) => {
    let amount = Number.parseInt(DEFAULT_MOMENT_PRICE)

    //eslint-disable-next-line
    moment.amount = amount
  })

  return moments.reduce((acc, current) => (acc += current.amount), 0)
}

async function priceEachMoment(moments: IMoment[]) {
  moments.forEach((moment: IMoment) => {
    let amount = Number.parseInt(DEFAULT_MOMENT_PRICE)

    //eslint-disable-next-line
    moment.amount = amount
  })
}

export { calculateOrderAmount, priceEachMoment }

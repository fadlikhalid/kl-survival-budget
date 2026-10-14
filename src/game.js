export const MAX_WEEKS = 4
export const START_VIBES = 50
export const VIBES_DECAY = 5

export const PRESETS = [
  { key: 'grad', label: 'Fresh grad', hint: 'RM2.8k, Cheras', values: { salary: 2800, rent: 800, transport: 200, food: 600 } },
  { key: 'share', label: 'Room in Setapak', hint: 'RM2.2k, shared', values: { salary: 2200, rent: 450, transport: 150, food: 500 } },
  { key: 'south', label: 'Bangsar South', hint: 'RM4.2k, solo', values: { salary: 4200, rent: 1800, transport: 250, food: 800 } },
  { key: 'commuter', label: 'Car commuter', hint: 'RM3k, tolls', values: { salary: 3000, rent: 900, transport: 450, food: 600 } },
]

export const MOVES = [
  { key: 'hemat', name: 'Hemat', blurb: 'Pack lunch, skip the mamak', cost: 0, vibes: -10, icon: 'lunch' },
  { key: 'biasa', name: 'Biasa', blurb: 'Business as usual', cost: 40, vibes: 0, icon: 'walk' },
  { key: 'lepak', name: 'Lepak', blurb: 'Mamak run, then a movie', cost: 120, vibes: 15, icon: 'ticket' },
]

// Each event rolls its own amount (to the nearest RM5) every time it is drawn.
// `income: true` means the roll pays you instead of costing you.
export const EVENTS = [
  { key: 'tyre', name: 'Tyre', range: [120, 260], vibes: -10, icon: 'wrench', quip: 'Flat on the Federal Highway. The bengkel uncle sighs and reaches for the jack.' },
  { key: 'kenduri', name: 'Kenduri', range: [60, 160], vibes: 10, icon: 'bowl', quip: "Angpau for a cousin you've met twice. The rendang was worth every sen." },
  { key: 'phone', name: 'Phone screen', range: [150, 350], vibes: -15, icon: 'phone', quip: 'Dropped it stepping off the LRT. Spiderweb edition, now with a repair quote.' },
  { key: 'shopping', name: 'Online Shopping Spree', range: [40, 300], vibes: 10, icon: 'bag', quip: 'Cart said RM12. The total says otherwise. Free shipping though!' },
  { key: 'saman', name: 'Parking saman', range: [30, 100], vibes: -10, icon: 'parking', quip: 'The enforcement officer was extremely punctual today.' },
  { key: 'grab', name: 'Grab surge', range: [20, 70], vibes: -5, icon: 'car', quip: 'Rain at 6pm. Surge pricing: 2.4x. Your umbrella is at home.' },
  { key: 'klinik', name: 'Klinik visit', range: [40, 150], vibes: -5, icon: 'pulse', quip: 'Haze cough. The doctor says rest. The bill says otherwise.' },
  { key: 'gig', name: 'Freelance gig', range: [80, 300], income: true, vibes: 15, icon: 'banknote', quip: "A friend's cousin needed a logo. They paid on time. Miracles happen." },
  { key: 'angpau', name: 'Auntie angpau', range: [30, 100], income: true, vibes: 10, icon: 'envelope', quip: "Auntie slipped you an envelope 'for makan'. Do not argue." },
  { key: 'power', name: 'Electricity bill spike', range: [40, 120], vibes: -5, icon: 'bolt', quip: 'The aircond worked overtime. TNB noticed.' },
  { key: 'wifi', name: 'Wi-Fi gave up', range: [20, 60], vibes: -5, icon: 'wifi', quip: 'Router died mid-meeting. The hotspot data was not cheap.' },
  { key: 'flood', name: 'Flash flood', range: [30, 150], vibes: -10, icon: 'umbrella', quip: 'KL streets became rivers. Your shoes did not survive.' },
  { key: 'boba', name: 'Bubble tea run', range: [15, 50], vibes: 10, icon: 'cup', quip: 'Brown sugar, extra pearls. Zero regrets, some sugar.' },
  { key: 'gift', name: 'Birthday collection', range: [40, 150], vibes: 5, icon: 'gift', quip: "A colleague's birthday. The group chat expects a contribution." },
  { key: 'topup', name: "Touch 'n Go top-up", range: [20, 60], vibes: -5, icon: 'train', quip: 'Reloaded at the kiosk. The queue was longer than the ride.' },
  { key: 'cashback', name: 'E-wallet cashback', range: [20, 80], income: true, vibes: 10, icon: 'tag', quip: 'The cashback you forgot about finally landed.' },
  { key: 'overtime', name: 'Overtime pay', range: [60, 200], income: true, vibes: -5, icon: 'banknote', quip: 'You stayed late. At least the payslip noticed.' },
  { key: 'carousell', name: 'Sold old stuff', range: [30, 150], income: true, vibes: 10, icon: 'bag', quip: 'The sofa went to a buyer who haggled for an hour.' },
  { key: 'lunch', name: "Boss shouted lunch", range: [10, 40], income: true, vibes: 10, icon: 'bowl', quip: 'Free lunch exists. Order the sambal squid.' },
  { key: 'calm', name: 'No surprise', range: [0, 0], vibes: 5, icon: 'check', quip: 'Nothing broke this week. Suspicious.' },
]

// Returns the event with a concrete `amount`: positive costs money, negative pays you.
export function rollEvent(event) {
  const [low, high] = event.range
  const rolled = Math.round((low + Math.random() * (high - low)) / 5) * 5
  return { ...event, amount: event.income ? -rolled : rolled }
}

const money = new Intl.NumberFormat('en-MY', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatMoney(value) {
  return value < 0 ? `−RM ${money.format(-value)}` : `RM ${money.format(value)}`
}

export function isNumber(value) {
  return value !== '' && value !== null && Number.isFinite(Number(value))
}

export function areInputsValid(inputs) {
  const keys = ['salary', 'rent', 'transport', 'food']
  return (
    keys.every((key) => isNumber(inputs[key]) && Number(inputs[key]) >= 0) &&
    Number(inputs.salary) > 0
  )
}

function clamp(value, low, high) {
  return Math.min(high, Math.max(low, value))
}

function num(value) {
  return Number(value) || 0
}

// Everything the screen shows is worked out from the inputs and the weeks played.
export function summarise(inputs, weeks) {
  const salary = num(inputs.salary)
  const weekly = {
    rent: num(inputs.rent) / MAX_WEEKS,
    transport: num(inputs.transport) / MAX_WEEKS,
    food: num(inputs.food) / MAX_WEEKS,
  }
  const spent = { rent: 0, transport: 0, food: 0, extras: 0, events: 0 }
  let income = 0
  let vibes = START_VIBES
  const history = []

  weeks.forEach((week) => {
    spent.rent += weekly.rent
    spent.transport += weekly.transport
    spent.food += weekly.food
    spent.extras += week.moveCost
    if (week.eventAmount >= 0) spent.events += week.eventAmount
    else income += -week.eventAmount
    vibes = clamp(vibes - VIBES_DECAY + week.moveVibes + week.eventVibes, 0, 100)
    const moneySpent =
      spent.rent + spent.transport + spent.food + spent.extras + spent.events
    history.push({ left: salary + income - moneySpent, vibes })
  })

  const moneySpent =
    spent.rent + spent.transport + spent.food + spent.extras + spent.events
  return {
    salary,
    spent,
    income,
    moneySpent,
    moneyLeft: salary + income - moneySpent,
    vibes,
    weeksPlayed: weeks.length,
    history,
  }
}

export function getHealth(left, salary) {
  const ratio = salary > 0 ? left / salary : 1
  if (ratio < 0.1) return 'danger'
  if (ratio < 0.3) return 'tight'
  return 'safe'
}

export function getStatus(moneyLeft, weeksPlayed) {
  const weeksLeft = MAX_WEEKS - weeksPlayed
  if (moneyLeft < 0) return `${formatMoney(-moneyLeft)} over`
  if (weeksLeft <= 0) return 'Month complete'
  return `${weeksLeft} ${weeksLeft === 1 ? 'week' : 'weeks'} to go`
}

export function getVibeFace(vibes) {
  if (vibes < 20) return 'face-0'
  if (vibes < 40) return 'face-1'
  if (vibes < 60) return 'face-2'
  if (vibes < 80) return 'face-3'
  return 'face-4'
}

export function getEnding(summary) {
  const { moneyLeft, salary, vibes, weeksPlayed } = summary
  if (moneyLeft < 0) {
    return vibes >= 50
      ? { key: 'broke-happy', title: 'Broke but fabulous', line: `Ran out in week ${weeksPlayed}, but the memories are priceless. The bank disagrees.`, tone: 'lose' }
      : { key: 'broke-sad', title: 'Broke and tired', line: `Ran out in week ${weeksPlayed}. At least the suffering was short.`, tone: 'lose' }
  }
  const rich = moneyLeft >= salary * 0.2
  const happy = vibes >= 50
  if (rich && happy) return { key: 'legend', title: 'KL Legend', line: 'Wallet healthy, vibes high. Please teach us your ways.', tone: 'win' }
  if (rich) return { key: 'stingy', title: 'Kedekut Champion', line: 'Ringgit saved, joy not included.', tone: 'win' }
  if (happy) return { key: 'yolo', title: 'YOLO Survivor', line: 'Close call, great stories.', tone: 'win' }
  return { key: 'barely', title: 'Barely Alive', line: 'You made it. Nobody is sure how.', tone: 'win' }
}

// One entry per week: 'safe' | 'tight' | 'danger', or null if the week was never played.
export function getWeekHealths(summary) {
  return Array.from({ length: MAX_WEEKS }, (_, index) => {
    const entry = summary.history[index]
    return entry ? getHealth(entry.left, summary.salary) : null
  })
}

// The copied text keeps coloured squares: that is the Wordle-style format people paste into chats.
const HEALTH_SQUARE = { safe: '🟩', tight: '🟨', danger: '🟥' }

export function buildShareText(ending, summary) {
  const squares = getWeekHealths(summary)
    .map((health) => (health ? HEALTH_SQUARE[health] : '⬛'))
    .join('')
  return [
    `KL Survival Budget · ${ending.title}`,
    squares,
    `${formatMoney(summary.moneyLeft)} left · Vibes ${summary.vibes}/100`,
  ].join('\n')
}

const STATS_KEY = 'kl-survival-stats'
const EMPTY_STATS = { runs: 0, survived: 0, best: null }

export function loadStats() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STATS_KEY))
    return {
      runs: Number(parsed?.runs) || 0,
      survived: Number(parsed?.survived) || 0,
      best: Number.isFinite(parsed?.best) ? parsed.best : null,
    }
  } catch {
    return EMPTY_STATS
  }
}

export function addRunToStats(stats, { survived, moneyLeft }) {
  const beatsBest = survived && (stats.best === null || moneyLeft > stats.best)
  const next = {
    runs: stats.runs + 1,
    survived: stats.survived + (survived ? 1 : 0),
    best: beatsBest ? moneyLeft : stats.best,
  }
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(next))
  } catch {
    // Private mode or storage full: the run still counts for this session.
  }
  return next
}

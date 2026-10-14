import { useEffect, useRef, useState } from 'react'
import './App.css'
import Icon from './Icons.jsx'
import Skyline from './Skyline.jsx'
import {
  EVENTS,
  MAX_WEEKS,
  MOVES,
  PRESETS,
  VIBES_DECAY,
  addRunToStats,
  areInputsValid,
  buildShareText,
  formatMoney,
  getEnding,
  getHealth,
  getStatus,
  getVibeFace,
  getWeekHealths,
  loadStats,
  rollEvent,
  summarise,
} from './game.js'
import { isMuted, setMuted, sfx } from './sound.js'

const SAMPLE_INPUTS = PRESETS[0].values
const REEL_TICKS = 12
const REEL_MS = 90
const CONFETTI_COLOURS = ['#ffd23f', '#12c2a9', '#ff5a4d', '#ffffff']

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function signed(value) {
  return `${value > 0 ? '+' : value < 0 ? '−' : ''}${Math.abs(value)}`
}

function pickEvent() {
  return EVENTS[Math.floor(Math.random() * EVENTS.length)]
}

function Masthead({ stats, muted, onToggleMute }) {
  return (
    <header className="masthead">
      <button
        type="button"
        className="mute-btn"
        aria-pressed={muted}
        aria-label={muted ? 'Sound is off. Turn sound on' : 'Sound is on. Turn sound off'}
        onClick={onToggleMute}
      >
        <Icon name={muted ? 'volume-off' : 'volume'} />
      </button>
      <div className="masthead-copy">
        <p className="eyebrow">Kuala Lumpur · 4-week challenge</p>
        <h1 className="app-name">KL Survival Budget</h1>
        <p className="app-purpose">
          Can your salary outlast rent, transport, food and whatever KL throws at you?
        </p>
        {stats.runs > 0 && (
          <p className="stats-chip">
            <Icon name="trophy" /> Survived {stats.survived} of {stats.runs}{' '}
            {stats.runs === 1 ? 'run' : 'runs'}
            {stats.best !== null && <> · best {formatMoney(stats.best)}</>}
          </p>
        )}
      </div>
      <Skyline />
    </header>
  )
}

function SetupCard({ inputs, locked, onChange, onPreset }) {
  const fields = [
    { key: 'salary', label: 'Gross monthly salary' },
    { key: 'rent', label: 'Rent per month' },
    { key: 'transport', label: 'Transport per month' },
    { key: 'food', label: 'Food per month' },
  ]

  return (
    <section className="card setup-card">
      <h2 className="sticker">Setup</h2>
      <div className="chips" role="group" aria-label="Quick start presets">
        {PRESETS.map((preset) => {
          const active = Object.keys(preset.values).every(
            (key) => Number(inputs[key]) === preset.values[key],
          )
          return (
            <button
              key={preset.key}
              type="button"
              className={`chip${active ? ' chip-on' : ''}`}
              aria-pressed={active}
              disabled={locked}
              onClick={() => onPreset(preset.values)}
            >
              <span className="chip-label">{preset.label}</span>
              <span className="chip-hint">{preset.hint}</span>
            </button>
          )
        })}
      </div>
      <div className="fields">
        {fields.map((field) => (
          <div className="field" key={field.key}>
            <label htmlFor={field.key}>{field.label}</label>
            <div className="input-wrap">
              <span className="input-prefix" aria-hidden="true">RM</span>
              <input
                id={field.key}
                type="number"
                inputMode="decimal"
                min="0"
                value={inputs[field.key]}
                disabled={locked}
                onChange={(event) => onChange(field.key, event.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      {locked && (
        <p className="inputs-note">Locked for this run. Start again to change them.</p>
      )}
    </section>
  )
}

function Meter({ className, percent, label }) {
  return (
    <div className={`meter ${className}`} role="img" aria-label={label}>
      <div className="meter-fill" style={{ width: `${percent}%` }} />
    </div>
  )
}

function HeroCard({ summary }) {
  const { moneyLeft, salary, vibes, weeksPlayed } = summary
  const health = getHealth(moneyLeft, salary)
  const walletPercent =
    salary > 0 ? Math.min(100, Math.max(0, (moneyLeft / salary) * 100)) : 0

  return (
    <section className={`hero hero-${health}`}>
      <div className="hero-top">
        <p className="hero-label">Wallet</p>
        <p className="week-chip">Week {weeksPlayed} / {MAX_WEEKS}</p>
      </div>
      <p className="hero-figure" key={weeksPlayed}>{formatMoney(moneyLeft)}</p>
      <p className="hero-status">{getStatus(moneyLeft, weeksPlayed)}</p>
      <Meter
        className="meter-hp"
        percent={walletPercent}
        label={`Wallet is ${Math.round(walletPercent)} percent of the starting salary`}
      />
      <div className="vibes">
        <Icon name={getVibeFace(vibes)} className="vibes-face" />
        <div className="vibes-body">
          <div className="vibes-row">
            <span>Vibes</span>
            <span className="vibes-score">{vibes} / 100</span>
          </div>
          <Meter className="meter-vibes" percent={vibes} label={`Vibes ${vibes} out of 100`} />
        </div>
      </div>
    </section>
  )
}

function Stage({ phase, face, last, weekNumber }) {
  if (phase === 'drawing' && face) {
    return (
      <div className="stage stage-drawing">
        <div className="stage-icon stage-icon-spin"><Icon name={face.icon} /></div>
        <div className="stage-copy">
          <p className="stage-kicker">Week {weekNumber} · drawing a card</p>
          <p className="stage-name">{face.name}</p>
        </div>
      </div>
    )
  }

  if (!last) {
    return (
      <div className="stage stage-empty">
        <div className="stage-icon"><Icon name="question" /></div>
        <div className="stage-copy">
          <p className="stage-kicker">Week {weekNumber}</p>
          <p className="stage-name">Pick a move, then draw a card</p>
        </div>
      </div>
    )
  }

  const gain = last.eventAmount < 0
  const hit = last.eventAmount >= 150
  return (
    <div
      className={`stage stage-landed${hit ? ' stage-hit' : ''}${gain ? ' stage-gain' : ''}`}
      key={last.week}
    >
      <div className="stage-icon"><Icon name={last.eventIcon} /></div>
      <div className="stage-copy">
        <p className="stage-kicker">Week {last.week} event</p>
        <p className="stage-name">{last.eventName}</p>
        <p className="stage-quip">{last.eventQuip}</p>
        <p className="stage-deltas">
          <span className={`delta ${gain ? 'delta-gain' : last.eventAmount > 0 ? 'delta-loss' : ''}`}>
            {last.eventAmount === 0
              ? 'RM 0.00'
              : `${gain ? '+' : '−'}${formatMoney(Math.abs(last.eventAmount))}`}
          </span>
          <span className="delta delta-vibes">Vibes {signed(last.eventVibes)}</span>
        </p>
      </div>
    </div>
  )
}

function MovePicker({ moveKey, disabled, onPick }) {
  return (
    <fieldset className="moves" disabled={disabled}>
      <legend className="moves-legend">Your move this week</legend>
      <p className="moves-hint">Vibes slip by {VIBES_DECAY} every week on their own.</p>
      <div className="moves-grid">
        {MOVES.map((move) => (
          <label
            key={move.key}
            className={`move${moveKey === move.key ? ' move-on' : ''}`}
          >
            <input
              type="radio"
              name="move"
              value={move.key}
              checked={moveKey === move.key}
              onChange={() => onPick(move.key)}
            />
            <span className="move-icon"><Icon name={move.icon} /></span>
            <span className="move-name">{move.name}</span>
            <span className="move-blurb">{move.blurb}</span>
            <span className="move-meta">
              <span>{move.cost === 0 ? 'Free' : formatMoney(move.cost)}</span>
              <span>Vibes {signed(move.vibes)}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function WeekCard({ phase, face, weeks, moveKey, onPick, finished }) {
  const last = weeks[weeks.length - 1]
  return (
    <section className="card week-card">
      <h2 className="sticker">This week</h2>
      <Stage
        phase={phase}
        face={face}
        last={last}
        weekNumber={Math.min(weeks.length + 1, MAX_WEEKS)}
      />
      {last && phase === 'idle' && (
        <p className="sr-only" role="status">
          {last.eventName}: {last.eventQuip}
        </p>
      )}
      {!finished && (
        <MovePicker moveKey={moveKey} disabled={phase === 'drawing'} onPick={onPick} />
      )}
    </section>
  )
}

function Confetti() {
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 32 }, (_, index) => (
        <span
          key={index}
          style={{
            '--x': `${(index * 37) % 100}%`,
            '--delay': `${(index % 8) * 0.1}s`,
            '--spin': `${(index * 53) % 360}deg`,
            '--colour': CONFETTI_COLOURS[index % CONFETTI_COLOURS.length],
          }}
        />
      ))}
    </div>
  )
}

function SummaryBanner({ ending, summary, copied, onShare, onStartAgain }) {
  const ref = useRef(null)
  const healths = getWeekHealths(summary)

  // The button the player just pressed is far below this card, so bring it into view.
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'center',
    })
  }, [])

  return (
    <section ref={ref} className={`summary summary-${ending.key}`} role="status">
      {ending.tone === 'win' && <Confetti />}
      <p className="sticker sticker-ink">Result</p>
      <h2 className="summary-title">{ending.title}</h2>
      <p className="summary-line">{ending.line}</p>
      <ul className="summary-squares" aria-label="Wallet health each week">
        {healths.map((health, index) => (
          <li key={index} className={`square square-${health ?? 'none'}`}>
            <span className="sr-only">
              Week {index + 1}: {health ?? 'not played'}
            </span>
          </li>
        ))}
      </ul>
      <dl className="summary-stats">
        <div>
          <dt>Money left</dt>
          <dd>{formatMoney(summary.moneyLeft)}</dd>
        </div>
        <div>
          <dt>Vibes</dt>
          <dd>{summary.vibes} / 100</dd>
        </div>
      </dl>
      <div className="summary-actions">
        <button type="button" className="btn btn-ink" onClick={onShare}>
          {copied ? 'Copied!' : 'Copy result'}
        </button>
        <button type="button" className="btn btn-paper" onClick={onStartAgain}>
          Play again
        </button>
      </div>
    </section>
  )
}

function StackedBar({ spent }) {
  const parts = [
    { key: 'rent', value: spent.rent },
    { key: 'transport', value: spent.transport },
    { key: 'food', value: spent.food },
    { key: 'extras', value: spent.extras },
    { key: 'events', value: spent.events },
  ]
  const total = parts.reduce((sum, part) => sum + part.value, 0)
  return (
    <div
      className="stacked-bar"
      role="img"
      aria-label={
        total > 0
          ? `Spent so far: ${parts.map((part) => `${part.key} ${formatMoney(part.value)}`).join(', ')}`
          : 'Nothing spent yet'
      }
    >
      {parts.map((part) => (
        <div
          key={part.key}
          className={`stacked-seg seg-${part.key}`}
          style={{ width: total > 0 ? `${(part.value / total) * 100}%` : '0%' }}
        />
      ))}
    </div>
  )
}

const LEDGER_ROWS = [
  { key: 'rent', label: 'Rent' },
  { key: 'transport', label: 'Transport' },
  { key: 'food', label: 'Food' },
  { key: 'extras', label: 'Makan & lepak' },
]

function EventFeed({ weeks }) {
  return (
    <div className="feed">
      {Array.from({ length: MAX_WEEKS }, (_, index) => {
        const week = weeks[index]
        if (!week) {
          return (
            <div className="feed-item feed-empty" key={index}>
              <span className="feed-glyph"><Icon name="dice" /></span>
              <span className="feed-name">Week {index + 1}</span>
              <span className="tag tag-empty">—</span>
            </div>
          )
        }
        const gain = week.eventAmount < 0
        const tagClass = gain
          ? 'tag-gain'
          : week.eventAmount === 0
            ? 'tag-empty'
            : week.eventKey === 'shopping'
              ? 'tag-shopee'
              : 'tag-loss'
        return (
          <div className="feed-item" key={index}>
            <span className="feed-glyph"><Icon name={week.eventIcon} /></span>
            <span className="feed-name">{week.eventName}</span>
            <span className="feed-week">Week {index + 1} · {week.moveName}</span>
            <span className={`tag ${tagClass}`}>
              {week.eventAmount === 0
                ? formatMoney(0)
                : `${gain ? '+' : '−'}${formatMoney(Math.abs(week.eventAmount))}`}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function LedgerCard({ weeks, summary }) {
  const { spent, moneySpent } = summary
  return (
    <section className="card ledger-card">
      <h2 className="sticker">The ledger</h2>
      <StackedBar spent={spent} />
      <ul className="legend" aria-hidden="true">
        <li><span className="dot seg-rent" />Rent</li>
        <li><span className="dot seg-transport" />Transport</li>
        <li><span className="dot seg-food" />Food</li>
        <li><span className="dot seg-extras" />Lepak</li>
        <li><span className="dot seg-events" />Events</li>
      </ul>
      <div className="rows-group">
        {LEDGER_ROWS.map((row) => (
          <div className="category" key={row.key}>
            <span className={`row-dot seg-${row.key}`} aria-hidden="true" />
            <span className="row-name">{row.label}</span>
            <span className="row-amount">{formatMoney(spent[row.key])}</span>
            <div className="row-bar">
              <div
                className={`row-bar-fill seg-${row.key}`}
                style={{
                  width: moneySpent > 0 ? `${(spent[row.key] / moneySpent) * 100}%` : '0%',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <h3 className="rows-subtitle">Life events</h3>
      <EventFeed weeks={weeks} />
    </section>
  )
}

function ActionBar({ onPlay, onStartAgain, drawing, disabled, reason, started, weekNumber }) {
  return (
    <>
      <div className="action-bar">
        <button type="button" className="btn btn-primary" onClick={onPlay} disabled={disabled}>
          {drawing ? 'Drawing…' : `Play week ${weekNumber}`}
        </button>
        {reason && <p className="controls-reason">{reason}</p>}
      </div>
      <div className="controls-secondary">
        <button type="button" className="btn-link" onClick={onStartAgain} disabled={drawing}>
          {started ? 'Start again' : 'Reset sample data'}
        </button>
      </div>
    </>
  )
}

function App() {
  const [inputs, setInputs] = useState(SAMPLE_INPUTS)
  const [locked, setLocked] = useState(false)
  const [weeks, setWeeks] = useState([])
  const [moveKey, setMoveKey] = useState('biasa')
  const [phase, setPhase] = useState('idle')
  const [face, setFace] = useState(null)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState(loadStats)
  const [muted, setMutedState] = useState(isMuted)
  const timers = useRef({ reel: null, copy: null, end: null })

  useEffect(() => {
    const active = timers.current
    return () => {
      clearInterval(active.reel)
      clearTimeout(active.copy)
      clearTimeout(active.end)
    }
  }, [])

  const summary = summarise(inputs, weeks)
  const valid = areInputsValid(inputs)
  const finished = summary.moneyLeft < 0 || weeks.length >= MAX_WEEKS
  const drawing = phase === 'drawing'
  const ending = finished ? getEnding(summary) : null
  const reason = valid ? '' : 'Fill in all four numbers (salary above 0) to start.'

  function handleInputChange(key, value) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  function commitWeek(event, move) {
    const nextWeeks = [
      ...weeks,
      {
        week: weeks.length + 1,
        eventKey: event.key,
        eventName: event.name,
        eventAmount: event.amount,
        eventVibes: event.vibes,
        eventIcon: event.icon,
        eventQuip: event.quip,
        moveName: move.name,
        moveCost: move.cost,
        moveVibes: move.vibes,
      },
    ]
    const after = summarise(inputs, nextWeeks)
    setWeeks(nextWeeks)
    setPhase('idle')
    setFace(null)
    if (event.amount < 0) sfx.gain()
    else if (event.amount >= 150) sfx.hit()
    else if (event.amount > 0) sfx.loss()
    else sfx.land()
    if (after.moneyLeft < 0 || nextWeeks.length >= MAX_WEEKS) {
      const survived = after.moneyLeft >= 0
      timers.current.end = setTimeout(() => (survived ? sfx.win() : sfx.lose()), 700)
      setStats((prev) =>
        addRunToStats(prev, { survived: after.moneyLeft >= 0, moneyLeft: after.moneyLeft }),
      )
    }
  }

  function handlePlay() {
    if (!valid || finished || drawing) return
    const event = rollEvent(pickEvent())
    const move = MOVES.find((item) => item.key === moveKey)
    setLocked(true)
    sfx.play()

    if (prefersReducedMotion()) {
      commitWeek(event, move)
      return
    }

    setPhase('drawing')
    setFace(pickEvent())
    let ticks = 0
    timers.current.reel = setInterval(() => {
      ticks += 1
      sfx.tick(ticks)
      if (ticks >= REEL_TICKS) {
        clearInterval(timers.current.reel)
        commitWeek(event, move)
        return
      }
      setFace(pickEvent())
    }, REEL_MS)
  }

  function handleStartAgain() {
    sfx.pick(0)
    clearInterval(timers.current.reel)
    clearTimeout(timers.current.end)
    setInputs(SAMPLE_INPUTS)
    setLocked(false)
    setWeeks([])
    setMoveKey('biasa')
    setPhase('idle')
    setFace(null)
    setCopied(false)
  }

  function handleToggleMute() {
    const next = !muted
    setMuted(next)
    setMutedState(next)
    if (!next) sfx.pick(1)
  }

  function handlePreset(values) {
    sfx.pick(0)
    setInputs(values)
  }

  function handlePickMove(key) {
    sfx.pick(MOVES.findIndex((move) => move.key === key))
    setMoveKey(key)
  }

  async function handleShare() {
    const text = buildShareText(ending, summary)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const area = document.createElement('textarea')
      area.value = text
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    sfx.copy()
    setCopied(true)
    clearTimeout(timers.current.copy)
    timers.current.copy = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="app">
      <Masthead stats={stats} muted={muted} onToggleMute={handleToggleMute} />
      <SetupCard
        inputs={inputs}
        locked={locked}
        onChange={handleInputChange}
        onPreset={handlePreset}
      />
      <HeroCard summary={summary} />
      {finished && (
        <SummaryBanner
          ending={ending}
          summary={summary}
          copied={copied}
          onShare={handleShare}
          onStartAgain={handleStartAgain}
        />
      )}
      <WeekCard
        phase={phase}
        face={face}
        weeks={weeks}
        moveKey={moveKey}
        onPick={handlePickMove}
        finished={finished}
      />
      <LedgerCard weeks={weeks} summary={summary} />
      {!finished && (
        <ActionBar
          onPlay={handlePlay}
          onStartAgain={handleStartAgain}
          drawing={drawing}
          disabled={!valid || drawing}
          reason={reason}
          started={locked}
          weekNumber={weeks.length + 1}
        />
      )}
    </div>
  )
}

export default App

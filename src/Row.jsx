import { useMemo } from "react"

export const rows = {
  'load': ExpensiveLoad,
  'paint': ExpensivePaint,
  'dom': ExpensiveDom,
}

export function ExpensiveLoad({i, difficulty, height}) {
  useMemo(() => {
    let str = ""
    for (let i = 0; i < difficulty * 1000; i++) {
      str += Math.random().toString().slice(3, 4)
    }
  }, [difficulty]);
  return <div className="item" style={{height: `${height ?? 30}px`}}>{i}</div>
}

export function ExpensivePaint({i, difficulty, height}) {
  return <div className="item" style={{height: `${height ?? 30}px`}}>
    {i}
    {new Array(difficulty).fill(0).map((_, i) => (<div key={i} className="paint"></div>))}
  </div>
}

export function ExpensiveDom({i, difficulty, height}) {
  return <div className="item" style={{height: `${height ?? 30}px`}}>
    {!!(i % 2) && new Array(difficulty * 10).fill(0).map((_, j) => (<div key={j} className="dom">{i}&nbsp;</div>))}
    {!(i % 2) && new Array(difficulty * 10).fill(0).map((_, j) => (<section key={j} className="dom">{i}&nbsp;</section>))}
  </div>
}

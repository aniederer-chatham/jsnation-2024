import './App.css'
import {rows} from "./Row.jsx"

export function Traditional({rowType, rowCount, rowDifficulty, viewportHeight}) {
  const Row = rows[rowType];
  const items = new Array(rowCount).fill(0).map((_, i) => (
    <Row key={i} i={i} difficulty={rowDifficulty}></Row>
  ))

  return (
    <div className="viewport" style={{height: `${viewportHeight}px`}}>
      <div className="tray">
        <div className="items">
          {items}
        </div>
      </div>
    </div>
  )
}

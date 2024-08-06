import './App.css'
import {rows} from "./Row.jsx"

export function ContentVisibility({rowType, rowCount, rowDifficulty, viewportHeight}) {
  const Row = rows[rowType];
  const items = new Array(rowCount).fill(0).map((_, i) => (
    <div style={{contentVisibility: 'auto'}}>
      <Row key={i} i={i} difficulty={rowDifficulty}></Row>
    </div>
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

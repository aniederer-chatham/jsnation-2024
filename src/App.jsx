import { useState } from 'react'
import './App.css'
import { Traditional } from "./Traditional.jsx"
import { Virtual } from "./Virtual.jsx"
import { VariableHeight } from "./VariableHeight.jsx"
import { ElementSharing } from "./ElementSharing.jsx"
import { WraparoundRendering } from "./WraparoundRendering.jsx"
import { ContentVisibility } from "./ContentVisibility.jsx"

function App() {
  const [scrollType, setScrollType] = useState('elementsharing')
  const [rowType, setRowType] = useState('load')
  const [rowCount, setRowCount] = useState(1000)
  const [rowDifficulty, setRowDifficulty] = useState(10)
  const [viewportHeight, setViewportHeight] = useState(600)

  return (
    <>
      <div className="controls">
        <div>
          <label htmlFor="count">Row Count</label>
          <input
            id="count"
            type="range"
            min="1000"
            max="100000"
            value={rowCount}
            onChange={(event) => setRowCount(+event.target.value)}/>
        </div>
        <div>
          <label htmlFor="difficulty">Row Difficulty</label>
          <input
            id="difficulty"
            type="range"
            min="1"
            max="100"
            value={rowDifficulty}
            onChange={(event) => setRowDifficulty(+event.target.value)}/>
        </div>
        <div>
          <label htmlFor="viewport-height">Viewport Height</label>
          <input
            id="viewport-height"
            type="range"
            min="300"
            max="900"
            value={viewportHeight}
            onChange={(event) => setViewportHeight(+event.target.value)}/>
        </div>

        <div>
          <span>Row Type</span>
          <input
            type="radio"
            id="paint"
            name="Paint"
            value="paint"
            checked={rowType === 'paint'}
            onChange={() => setRowType('paint')} />
          <label htmlFor="paint">Paint</label>
          <input
            type="radio"
            id="load"
            name="Load"
            value="load"
            checked={rowType === 'load'}
            onChange={() => setRowType('load')}/>
          <label htmlFor="load">Load</label>
          <input
            type="radio"
            id="dom"
            name="Dom"
            value="dom"
            checked={rowType === 'dom'}
            onChange={() => setRowType('dom')} />
          <label htmlFor="dom">DOM</label>
        </div>

        <div>
          <span>Scrolling Type</span>
          <input
            type="radio"
            id="traditional"
            name="Traditional"
            value="traditional"
            checked={scrollType === 'traditional'}
            onChange={() => setScrollType('traditional')}/>
          <label htmlFor="traditional">Traditional</label>
          <input
            type="radio"
            id="virtual"
            name="Virtual"
            value="virtual"
            checked={scrollType === 'virtual'}
            onChange={() => setScrollType('virtual')} />
          <label htmlFor="virtual">Virtual</label>
          <input
            type="radio"
            id="variable"
            name="VariableHeight"
            value="variable"
            checked={scrollType === 'variable'}
            onChange={() => setScrollType('variable')} />
          <label htmlFor="variable">Variable Height</label>
          <input
            type="radio"
            id="elementsharing"
            name="ElementSharing"
            value="elementsharing"
            checked={scrollType === 'elementsharing'}
            onChange={() => setScrollType('elementsharing')} />
          <label htmlFor="elementsharing">Element Sharing</label>
          <input
            type="radio"
            id="wraparoundrendering"
            name="WraparoundRendering"
            value="wraparoundrendering"
            checked={scrollType === 'wraparoundrendering'}
            onChange={() => setScrollType('wraparoundrendering')} />
          <label htmlFor="wraparoundrendering">Wraparound Rendering</label>
          <input
            type="radio"
            id="contentvisibility"
            name="Content Visibility"
            value="contentvisibility"
            checked={scrollType === 'contentvisibility'}
            onChange={() => setScrollType('contentvisibility')} />
          <label htmlFor="contentvisibility">Content Visibility</label>

        </div>
      </div>
      <div className="scrolling">
        {scrollType === "traditional" && (
          <Traditional
            rowCount={rowCount}
            rowDifficulty={rowDifficulty}
            rowType={rowType}
            viewportHeight={viewportHeight}>
          </Traditional>
        )}
        {scrollType === "virtual" && (
          <Virtual
            rowCount={rowCount}
            rowDifficulty={rowDifficulty}
            rowType={rowType}
            viewportHeight={viewportHeight}>
          </Virtual>
        )}
        {scrollType === "variable" && (
          <VariableHeight
            rowCount={rowCount}
            rowDifficulty={rowDifficulty}
            rowType={rowType}
            viewportHeight={viewportHeight}>
          </VariableHeight>
        )}
        {scrollType === "elementsharing" && (
          <ElementSharing
            rowCount={rowCount}
            rowDifficulty={rowDifficulty}
            rowType={rowType}
            viewportHeight={viewportHeight}>
          </ElementSharing>
        )}
        {scrollType === "wraparoundrendering" && (
          <WraparoundRendering
            rowCount={rowCount}
            rowDifficulty={rowDifficulty}
            rowType={rowType}
            viewportHeight={viewportHeight}>
          </WraparoundRendering>
        )}
        {scrollType === "contentvisibility" && (
          <ContentVisibility
            rowCount={rowCount}
            rowDifficulty={rowDifficulty}
            rowType={rowType}
            viewportHeight={viewportHeight}>
          </ContentVisibility>
        )}

      </div>
    </>
  )
}

export default App

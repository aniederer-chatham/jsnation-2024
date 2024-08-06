import { useMemo, useRef, useState, useLayoutEffect, useEffect } from 'react';
import useResizeObserver from "@react-hook/resize-observer";
import './App.css'
import {rows} from "./Row.jsx"

const ELEMENT_HEIGHT = 30;
const START_BUFFER = 2;
const END_BUFFER = 2;
export function Virtual({rowType, rowCount, rowDifficulty, viewportHeight: initialViewportHeight}) {
  const [scrollOffset, setScrollOffset] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(initialViewportHeight)
  const viewportRef = useRef(null);

  // React to the changes in the height of the viewport
  useLayoutEffect(() => setViewportHeight(viewportRef.current.clientHeight), [viewportRef])
  useResizeObserver(viewportRef, (entry) => setViewportHeight(entry.contentBoxSize[0].blockSize))
  useEffect(() => setViewportHeight(initialViewportHeight), [initialViewportHeight]);

  // Avoid recomputing the items on every render
  const items = useMemo(() => {
    const Row = rows[rowType];
    return new Array(rowCount).fill(0).map((_, i) => (
      <Row key={i} i={i} difficulty={rowDifficulty}></Row>
    ))
  }, [rowCount, rowType, rowDifficulty])

  // Compute the first and last elements to show, and their starting y-coordinate
  const start = Math.max(0, scrollOffset / ELEMENT_HEIGHT - START_BUFFER);
  const end = (scrollOffset + viewportHeight) / ELEMENT_HEIGHT + END_BUFFER;
  const transform = Math.max(0, scrollOffset - START_BUFFER * ELEMENT_HEIGHT) - Math.floor(scrollOffset % ELEMENT_HEIGHT)

  return (
    <div
      className="viewport"
      style={{height: `${initialViewportHeight}px`}}
      onScroll={() => setScrollOffset(viewportRef.current.scrollTop)}
      ref={viewportRef}>
      <div className="tray" style={{height: `${rowCount * 30}px`}}>
        <div className="items" style={{transform: `translateY(${transform}px)`}}>
          {items.slice(start, end + 1)}
        </div>
      </div>
    </div>
  )
}

import { useMemo, useRef, useState, useLayoutEffect, useEffect } from 'react';
import useResizeObserver from "@react-hook/resize-observer";
import './App.css'
import {rows} from "./Row.jsx"

function cumulativeSum(arr) {
  const ret = [0];
  for(const num of arr) {
    ret.push(ret.at(-1) + num)
  }
  return ret;
}

export function closestIndex(needle, haystack, offset = 0) {
  if (haystack.length === 1) {
    return {lo: offset, hi: offset, value: offset}
  }

  const half = Math.floor((haystack.length - 1) / 2);
  const lo = haystack[half];
  const hi = haystack[half + 1];
  if (lo <= needle && hi > needle) {
    return {
      lo: offset + half,
      hi: offset + half + 1,
      closest: needle - lo < hi - needle ? offset + half : offset + half + 1,
    };
  } else if (hi <= needle) {
    return closestIndex(needle, haystack.slice(half + 1, haystack.length), offset + half + 1);
  } /* ∴ hi > lo > needle */ else {
    return closestIndex(needle, haystack.slice(0, half + 1), offset);
  }
}

const START_BUFFER = 200;
const END_BUFFER = 200;
export function WraparoundRendering({rowType, rowCount, rowDifficulty, viewportHeight: initialViewportHeight}) {
  const [scrollOffset, setScrollOffset] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(initialViewportHeight)
  const viewportRef = useRef(null);

  // React to the changes in the height of the viewport
  useLayoutEffect(() => setViewportHeight(viewportRef.current.clientHeight), [viewportRef])
  useResizeObserver(viewportRef, (entry) => setViewportHeight(entry.contentBoxSize[0].blockSize))
  useEffect(() => setViewportHeight(initialViewportHeight), [initialViewportHeight]);

  const {rowHeights, rowOffsets} = useMemo(() => {
    const rowHeights = new Array(rowCount).fill(0).map((_, i) => i % 2 ? 40 : 30)
    return {rowHeights, rowOffsets: cumulativeSum(rowHeights)};
  }, [rowCount])

  // Compute the first and last elements to show, and their starting y-coordinate
  const start = Math.max(0, closestIndex(scrollOffset - START_BUFFER, rowOffsets).lo);
  const end = closestIndex(scrollOffset + viewportHeight + END_BUFFER, rowOffsets).hi;
  const transformIdx = Math.max(0, closestIndex(scrollOffset - START_BUFFER, rowOffsets).lo)
  const transform = rowOffsets[transformIdx]

  // Find the maximum possible number of rows that could be visible in the viewport at one time
  const smallest = Math.min.apply(null, rowHeights);
  const count = Math.ceil((viewportHeight + END_BUFFER + START_BUFFER) / smallest);

  // Find the base values for wrap-around rendering
  const next = count * Math.ceil(start / count);
  const prev = count * Math.floor(start / count);

  return (
    <div
      className="viewport"
      style={{height: `${initialViewportHeight}px`}}
      onScroll={() => setScrollOffset(viewportRef.current.scrollTop)}
      ref={viewportRef}>
      <div className="tray" style={{height: `${rowOffsets.at(-1)}px`}}>
        <div className="items" style={{ transform: `translateY(${transform}px)`, display: 'flex', flexDirection: 'column' }}>
          {new Array(count).fill(0).map((_, index) => {
            const Row = rows[rowType];
            const wrappedIndex = index < start % count ? next + index : prev + index
            return wrappedIndex < rowCount && (
              <div style={{ order: index < start % count ? 1 : 0 }}>
                <Row
                  key={index}
                  i={wrappedIndex}
                  difficulty={rowDifficulty}
                  height={wrappedIndex % 2 ? 40 : 30}
                ></Row>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

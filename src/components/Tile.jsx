import styled from "styled-components";
// import { useState, useRef } from "react";
import { TILE_VARIANTS } from "../constants";

// maybe without styled-comps? to ensure CSS and no extra JS layer
const StyledTile = styled.div`
  position: absolute;
  width: 25%;
  aspect-ratio: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => {
    return color;
  }};
  background-color: ${({ bg }) => {
    return bg;
  }};
  transform: ${({ translateX, translateY }) => {
    const x = translateX === 0 ? 0 : translateX + "00%";
    const y = translateY === 0 ? 0 : translateY + "00%";
    return `translate(${x}, ${y})`;
  }};
  transition: transform ease-in-out 200ms;
`;

export const Tile = ({ tile, state }) => {
  // const ref = useRef(null);
  // const [state, setState] = useState(tile);
  console.log("___ tile: ", tile);

  return (
    <StyledTile
      // ref={ref}
      // className={`tile ${tile.x > 0 ? "tile-x" : ""}`}
      bg={TILE_VARIANTS[tile.value].bg}
      color={TILE_VARIANTS[tile.value].text}
      translateX={state ? tile.x : 0}
      translateY={state ? tile.y : 0}
    >
      <h1>{tile.value}</h1>
    </StyledTile>
  );
};

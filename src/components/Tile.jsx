// import styled, { keyframes } from "styled-components";
import styled from "styled-components";
import { TILE_VARIANTS } from "../constants";

// const woah = keyframes`
//   30% {
//     transform: scale(0.2);
//     opacity: 0.7
//   }
//   50% {
//     transform: scale(1.1);
//     opacity: 1
//   }
//   20 {
//     transform: scale(0.7);
//     opacity: 0.8
//   }
// `;

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
  transform: ${({ x, y }) => {
    return `translate(${x === 0 ? 0 : x + "00%"}, ${y === 0 ? 0 : y + "00%"})`;
  }};
  transition: transform ease-in-out 200ms;
`;

// animation: ${woah} 200ms;

export const Tile = ({ tile }) => {
  return (
    <StyledTile
      bg={TILE_VARIANTS[tile.value].bg}
      color={TILE_VARIANTS[tile.value].text}
      x={tile.x}
      y={tile.y}
    >
      <h1>{tile.value}</h1>
    </StyledTile>
  );
};

import styled from "styled-components";
import { TILE_VARIANTS } from "../constants";

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
    return `translateX(${x === 0 ? 0 : x + "00%"}) translateY(${
      y === 0 ? 0 : y + "00%"
    })`;
  }};
  will-change: transform;
  transition: transform ease-in-out 9000ms;
`;

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

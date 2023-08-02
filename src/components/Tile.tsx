import styled from "styled-components";
import { TILE_VARIANTS } from "../constants";
import { DEVICE } from "../constants/screens";
import type { TileType } from "../types";
import type { TileKeys } from "../constants";

type StyledTileType = {
  bg: string;
  x: number;
  y: number;
};
const StyledTile = styled.div<StyledTileType>`
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
  transition: transform ease-in-out 150ms;
`;

const H1 = styled.h1`
  font-size: 1rem;
  @media ${DEVICE.mobileL} {
    font-size: 2rem;
  }
`;

export const Tile = ({ tile }: { tile: TileType }) => {
  return (
    <StyledTile
      bg={TILE_VARIANTS[tile.value as TileKeys].bg}
      color={TILE_VARIANTS[tile.value as TileKeys].text}
      x={tile.x}
      y={tile.y}
    >
      <H1>{tile.value}</H1>
    </StyledTile>
  );
};

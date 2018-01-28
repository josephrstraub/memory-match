import React from 'react'
import { Container } from './styled'
import Tile from './Tile'

type Props = {
  handleTileClick: Function,
  tiles: Array
}

const Tiles = (props: Props) => (
  <Container>
    { props.tiles.map((tile, index) => (
      <Tile
        key={index}
        backFaceIsVisible={tile.backFaceIsVisible}
        handleClick={() => props.handleTileClick(tile, index)}
        iconName={tile.iconName}
      />
    ))}
  </Container>
)

export default Tiles

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Alert from '../src/components/Alert'
import Clock from '../src/components/Clock'
import Tile from '../src/components/Tiles/Tile'

storiesOf('Alert', module)
  .add('default', () => (
    <Alert
      buttonText="Got it!"
      handleDismiss={action('clicked')}
      message="Click a square to reveal it, then find its match. Finish before time runs out!"
    />
  ))

storiesOf('Clock', module)
  .add('default', () => (
    <Clock display={40} />
  ))
  .add('danger', () => (
    <Clock display={3} theme="danger" />
  ))

storiesOf('Tile', module)
  .add('hidden', () => (
    <Tile handleClick={action('clicked')} />
  ))
  .add('visible', () => (
    <Tile backFaceIsVisible iconName="football" handleClick={action('clicked')} />
  ))

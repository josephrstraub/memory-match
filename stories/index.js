import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeProvider } from 'styled-components'
import Alert from '../src/components/Alert'
import Tile from '../src/components/Tile'
import { theme } from '../src/components/App'

storiesOf('Alert', module)
  .add('default', () => (
    <ThemeProvider theme={theme}>
      <Alert
        buttonText="Got it!"
        handleDismiss={action('clicked')}
        message="Click a square to reveal it, then find its match. Finish before time runs out!"
      />
    </ThemeProvider>
  ))

storiesOf('Tile', module)
  .add('hidden', () => (
    <ThemeProvider theme={theme}>
      <Tile handleClick={action('clicked')} />
    </ThemeProvider>
  ))
  .add('visible', () => (
    <ThemeProvider theme={theme}>
      <Tile backFaceIsVisible handleClick={action('clicked')} />
    </ThemeProvider>
  ))

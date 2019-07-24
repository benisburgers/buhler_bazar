/** @jsx jsx */
import { jsx } from '@emotion/core'

const Button = props => (
  <button
    css={{}}
    {...props}
  />
)

const PrimaryButton = props => (
  <Button
    css={{
        fontSize: 16,
        padding: 15,
        borderRadius: 25
    }}
    {...props}
  />
)

const PrimaryButtonPositive = props => (
  <PrimaryButton
    css={{
      backgroundColor: 'green',
      color: 'black'
    }}
    {...props}
  />
)

export { Button, PrimaryButton, PrimaryButtonPositive }

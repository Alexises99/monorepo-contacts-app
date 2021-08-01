import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import Toggable from './Toggable'

describe('<Toggable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Toggable buttonlabel='show'>
        <div className='testDiv'>testDivContent</div>
      </Toggable>
    )
  })

  test('renders its children', () => {
    /* expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined() */
    const el = component.getByText('testDivContent')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('after click parent must to be shown', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const el = component.getByText('testDivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })
})

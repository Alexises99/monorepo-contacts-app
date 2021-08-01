import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import { Contact } from './Contact'

test('renders content', () => {
  const contact = {
    name: 'Hola Test',
    number: 123424
  }

  const component = render(<Contact
    name={contact.name}
    number={contact.number}
    handleDelete={() => {
      return () => console.log('hola')
    }}
                           />)

  // expect(component.container).toHaveTextContent(contact.name)
  const span = component.container.querySelector('span')
  console.log(prettyDOM(span))
})

test('clicking delete button call handleDelete', () => {
  const contact = {
    name: 'Hola Test',
    number: 123424
  }

  const mockHandler = jest.fn()

  const component = render(<Contact
    name={contact.name}
    number={contact.number}
    handleDelete={mockHandler}
                           />)

  const button = component.getByText('Delete')
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})

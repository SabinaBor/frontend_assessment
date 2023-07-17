/// <reference types="cypress" />
import { mount } from '@cypress/vue'
import TheButton from './index.vue'

describe('<TheButton />', () => {
	it('click the button', () => {
		mount(TheButton, {
            props: {
                isOutlined: true,
                isSmall: true
            },
            slots: {
                default: 'Submit'
            }
        })
        cy.get('.the-button').should('contains.text', 'Submit')
		cy.get('.outlined.small').click()
	})
})

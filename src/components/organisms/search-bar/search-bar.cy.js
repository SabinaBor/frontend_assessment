/// <reference types="cypress" />
import { mount } from '@cypress/vue'
import SearchBar from './index.vue'


describe('<SearchBar />', () => {
	it('click the submit button', () => {
        const spy = cy.spy()
		mount(SearchBar, {
            listeners: {
                'submit': spy
            }
        })
        cy.get('.search-bar__btn').should('contains.text', 'Search').should('have.prop', 'type', 'submit')
        cy.get('.search-bar__btn').click()
        cy.get('.search__datepicker')
	})
})
import './commands';
import 'cypress-react-selector';

before(() => {
  cy.visit('localhost:3000');
  cy.waitForReact();
});

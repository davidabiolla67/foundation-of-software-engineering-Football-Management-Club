Feature: contact Page Functionality

  Scenario: Successfully contact form
    Given I open the contact page
    When I fill in valid contact information
    Then I should have my form submitted

 
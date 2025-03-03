Feature: signup functionality

  Scenario: Successful login
    Given I open the signup page
    When I input valid credentials and click login link
    Then I should be navigated to login page

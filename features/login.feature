Feature: Login functionality

  Scenario: Successful login
    Given I open the login page
    When I input valid credentials
    Then I should be navigated to home page

  Scenario: Unsuccessful login with invalid credentials
    Given I open the login page
    When I input invalid credentials
    Then I should see an error message
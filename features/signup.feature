Feature: Sign up functionality

  Scenario: Successful signup
    Given I open the sign up page
    When I input valid sign up credentials
    Then I should see user logged in successfully

  Scenario: Unsuccessful signup with already registered credentials
    Given I open the sign up page
    When I input already registerd credentials
    Then I should see an error message for sign up
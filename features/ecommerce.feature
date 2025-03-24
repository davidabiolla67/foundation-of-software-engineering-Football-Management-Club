Feature: Ecommerce Functionality
  As a customer
  I want to add items to my cart and proceed to checkout
  So that I can purchase products

  Scenario: Successfully checkout merch
    Given the user is on the "Store" page with available products
    When the user clicks on "Add to Cart" for a product
    And the user clicks on "Proceed to Checkout"
    And the user fills "shipping details"
     And the user clicks on confirm order
    And the user navigated to order history page

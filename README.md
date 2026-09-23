# Recruiterflow QA Automation Assignment

A Playwright + TypeScript test suite covering UI automation for SauceDemo and API automation for ReqRes.

## Overview

This project demonstrates a focused automation approach for the assignment:

* UI tests use Page Object Models and reusable fixtures.
* API tests use Playwright's API request capability through a dedicated request-context fixture.
* Tests are independent and can run in any order.
* GitHub Actions runs the suite on Chromium and uploads test artifacts.

## Test Coverage

### UI — SauceDemo

* Standard user can log in and land on the products page.
* Locked-out user sees the expected error and remains logged out.
* User can add two products and the cart badge updates to `2`.
* Products can be sorted by price from low to high.
* User can complete checkout and see the order confirmation.

### API — ReqRes

* Get page-two users and validate the response status, `data` array, and required user fields.
* Create a user and validate the submitted fields, generated ID, and creation timestamp.
* Create-then-verify flow is represented using named Playwright test steps.

## Project Structure

```text
.github/
  workflows/
    playwright.yml        # GitHub Actions CI workflow
docs/
  test-cases.md           # Manual test cases and coverage
fixtures/
  test.fixture.ts         # UI page-object fixtures
  api.fixture.ts          # API request-context fixture
pages/
  LoginPage.ts
  ProductsPage.ts
  CartPage.ts
  CheckoutPage.ts
tests/
  ui/
    login.spec.ts
    cart.spec.ts
    checkout.spec.ts
  api/
    users.spec.ts
playwright.config.ts
package.json
README.md
```

## Prerequisites

* Node.js 20 or later
* npm

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run Tests

Run the complete suite:

```bash
npm test
```

Run only UI tests:

```bash
npm run test:ui
```

Run only API tests:

```bash
npm run test:api
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run the Chromium project used by CI:

```bash
npx playwright test --project=chromium
```

## Design Decisions

* Page Object Models centralize SauceDemo locators and user interactions.
* UI fixtures provide an authenticated standard-user setup without duplicating login steps in cart, sorting, and checkout tests.
* SauceDemo's `data-test` attributes are configured as Playwright test IDs, producing stable and readable locators.
* Assertions remain in spec files so that each test’s expected behavior is visible and focused.
* The API fixture creates and disposes an isolated Playwright `APIRequestContext`, centralizing the ReqRes base URL while keeping endpoint calls and assertions in API specs.
* The suite is intentionally limited to Chromium, matching the assignment scope.

## Continuous Integration

GitHub Actions runs on pushes, pull requests, and manual workflow dispatches.

The workflow:

1. Installs Node.js dependencies.
2. Installs the Chromium browser used by Playwright.
3. Runs the Playwright Chromium suite.
4. Uploads the Playwright report and test results as artifacts.

## Future Improvements

* Add broader negative-path and boundary test coverage.
* Add test-data factories for reusable, generated input data.
* Publish Playwright HTML reports for easier review.
* Introduce API client objects if the API surface grows.
* Add cross-browser coverage when it becomes a product requirement.

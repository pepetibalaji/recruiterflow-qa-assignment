# QA Automation Assignment — Test Cases

## Scope

- UI: SauceDemo
- API: ReqRes
- Browsers: Chromium
- Test data: Public demo credentials and API payloads supplied in the assignment

| ID     | Area            | Scenario                             | Preconditions                      | Steps                                                                                                | Expected result                                                                                             | Automation |
| ------ | --------------- | ------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------- |
| UI-01  | Login           | Standard user logs in successfully   | User is on SauceDemo login page    | 1. Enter `standard_user` 2. Enter valid password 3. Click Login                                      | User is redirected to `/inventory.html`; Products page title is visible                                     | Yes        |
| UI-02  | Login           | Locked-out user cannot log in        | User is on SauceDemo login page    | 1. Enter `locked_out_user` 2. Enter valid password 3. Click Login                                    | Error reads `Epic sadface: Sorry, this user has been locked out.`; user remains on login page               | Yes        |
| UI-03  | Cart            | Add two products to cart             | Logged in as standard user         | 1. Add any two distinct products 2. Inspect cart icon                                                | Cart badge displays `2`                                                                                     | Yes        |
| UI-04  | Checkout        | Complete checkout successfully       | Logged in; cart contains two items | 1. Open cart 2. Checkout 3. Enter valid first name, last name, and postal code 4. Continue 5. Finish | Checkout overview is shown; confirmation says `Thank you for your order!`                                   | Yes        |
| UI-05  | Product sorting | Sort products by price ascending     | Logged in as standard user         | 1. Select `Price (low to high)` 2. Read displayed product prices                                     | First displayed product has the lowest price in the product list                                            | Yes        |
| API-01 | Users           | Get second page of users             | ReqRes API is reachable            | Send `GET /api/users?page=2`                                                                         | Status is 200; response contains `data` array; every user contains `id`, `email`, `first_name`, `last_name` | Yes        |
| API-02 | Users           | Create a user                        | ReqRes API is reachable            | Send `POST /api/users` with `name: morpheus`, `job: leader`                                          | Status is 201; body includes submitted name/job plus non-empty `id` and `createdAt`                         | Yes        |
| API-03 | Users           | Create-then-verify response contract | ReqRes API is reachable            | Create user; assert response fields through a typed helper                                           | Creation response retains submitted values and returns generated metadata                                   | Bonus      |

## Out of Scope

- Cross-browser testing
- Visual regression testing
- Performance/load testing
- Persistent-data verification, because ReqRes does not persist created users
- CI retries or advanced reporting

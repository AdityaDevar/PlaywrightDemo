# Test Plan: SauceDemo Login

**Target:** https://www.saucedemo.com/
**Seed:** tests/seed.spec.js
**Date:** 2026-11-18

## Overview
Verify the SauceDemo login flow for a supported standard account, a locked account, missing credentials, and invalid credentials. Each scenario starts independently from the login page and checks the resulting navigation or visible login error.

## Preconditions
- SauceDemo is reachable at the target URL.
- Start each scenario from a fresh login page at `https://www.saucedemo.com/`.
- Use `secret_sauce` as the password value when a password is entered.

## Scenarios

### Scenario 1.1 — Standard user logs in successfully
- **Priority:** P0
- **Tags:** @smoke, @critical
- **Preconditions:** Login page is open with no credentials entered.
- **Steps:**
  1. Enter `standard_user` in Username and `secret_sauce` in Password, then submit Login — expected: navigation to `/inventory.html`.
- **Assertions:**
  - The URL is `https://www.saucedemo.com/inventory.html` and the inventory page is displayed.
- **Edge cases considered:**
  - A successful login must leave the login form and load the inventory route.

### Scenario 1.2 — Locked-out user is rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Login page is open with no credentials entered.
- **Steps:**
  1. Enter `locked_out_user` in Username and `secret_sauce` in Password, then submit Login — expected: remain on the login page and display a locked-out error.
- **Assertions:**
  - The visible error reads `Epic sadface: Sorry, this user has been locked out.`
  - The URL remains `https://www.saucedemo.com/`.
- **Edge cases considered:**
  - The locked-out message should be distinguishable from the generic credential mismatch.

### Scenario 1.3 — Empty username is rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Login page is open with both fields empty.
- **Steps:**
  1. Submit Login without entering a username or password — expected: remain on the login page and show a required-username error.
- **Assertions:**
  - The visible error reads `Epic sadface: Username is required`.
- **Edge cases considered:**
  - When both fields are empty, username validation is shown first.

### Scenario 1.4 — Empty password is rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Login page is open with both fields empty.
- **Steps:**
  1. Enter a non-empty username and leave Password empty, then submit Login — expected: remain on the login page and show a required-password error.
- **Assertions:**
  - The visible error reads `Epic sadface: Password is required`.
- **Edge cases considered:**
  - Password-required validation is shown only after a username is supplied.

### Scenario 1.5 — Invalid credentials are rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Login page is open with no credentials entered.
- **Steps:**
  1. Enter an unrecognized username with `secret_sauce` in Password, then submit Login — expected: remain on the login page and show a credential mismatch error.
- **Assertions:**
  - The visible error reads `Epic sadface: Username and password do not match any user in this service`.
  - The URL remains `https://www.saucedemo.com/`.
- **Edge cases considered:**
  - A syntactically non-empty but unrecognized username should not be confused with the required-field errors.

## Not covered (and why)
- Other demo accounts and performance or application behavior after authentication are outside this login-focused scope.
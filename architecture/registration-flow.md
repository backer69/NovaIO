# SOP: Registration Flow

## Overview
The registration process consists of 3 sequential steps followed by a success modal. State is managed locally using React state (or Context) and persisted potentially via LocalStorage (optional for reliability) before final submission.

## Steps

### 1. Personal Details (`/register`)
- **Fields**: First Name, Last Name, Email, Phone.
- **Validation**: All fields required. Email format check. Phone format check.
- **Action**: On Next -> Validate -> Save to Draft -> Navigate to `/register/address`.

### 2. Address & Account (`/register/address`)
- **Fields**: Street, City, Country, Zip Code.
- **Validation**: Street, City, Country required.
- **Action**: On Next -> Validate -> Save to Draft -> Navigate to `/register/motivation`.

### 3. Motivation (`/register/motivation`)
- **Fields**: Motivation Message (TextArea).
- **Validation**: Required, min length 10 chars.
- **Action**: On Submit -> Validate -> Save to Draft -> **API Call (Mock)** -> Show Success Modal.

## Success State
- **UI**: Modal Overlay.
- **Message**: "Your account has been created. Please wait for the Google Meet conference."
- **Action**: Close button redirects to Home or resets form.

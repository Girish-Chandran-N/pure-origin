# Separate Buyer & Supplier Google Sheets Setup — Pure Origin Trading Ltd

You can automatically maintain **two separate Google Sheets**:
1. **Buyers Sheet**: Receives all UK Buyer wholesale enquiries.
2. **Suppliers Sheet**: Receives all Overseas Supplier introductions.

---

## ⚠️ Troubleshooting Google Apps Script "Unable to open file" Error
If Google displays *"Sorry, unable to open the file at present"* when clicking Extensions &rarr; Apps Script, this is a known Google bug caused by logged-in multi-account switching in your browser.

### Quick Fix (3 Easy Options):

#### Option 1: Create script directly at script.google.com (Recommended)
1. Go directly to **[https://script.google.com](https://script.google.com)** in a new tab.
2. Click **+ New project** in the top left.
3. Paste the code below and click **Deploy** &rarr; **New deployment**.

#### Option 2: Open Sheets in Incognito / Private Window
1. Open an Incognito Window (`Cmd + Shift + N` on Mac).
2. Log into your Google Account.
3. Open your Google Sheet &rarr; click **Extensions** &rarr; **Apps Script**.

#### Option 3: Formspree 1-Click Sync (No Code Required)
1. Log in to [Formspree Dashboard](https://formspree.io).
2. Go to **Settings / Integrations** &rarr; click **Google Sheets**.
3. Formspree will automatically create and populate your Google Sheet without needing Apps Script!

---

## Step 1: Create Your Two Google Sheets

### Sheet 1: "Pure Origin — Buyer Enquiries"
1. Create a Google Sheet named **"Pure Origin — Buyer Enquiries"**.
2. Add these headers to Row 1:
   `Timestamp` | `Name` | `Company` | `Email` | `Phone` | `Product Category` | `Estimated Volume` | `Timeline` | `Notes`

### Sheet 2: "Pure Origin — Supplier Introductions"
1. Create a second Google Sheet named **"Pure Origin — Supplier Introductions"**.
2. Add these headers to Row 1:
   `Timestamp` | `Name` | `Workshop / Company` | `Email` | `Location` | `Production Category` | `Certifications` | `Workshop & Capacity Overview`

---

## Step 2: Code for Buyer Sheet Web App
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.company || '',
    data.email || '',
    data.phone || '',
    data.product_category || '',
    data.volume || '',
    data.timeline || '',
    data.notes || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 3: Code for Supplier Sheet Web App
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.company || '',
    data.email || '',
    data.location || '',
    data.production_category || '',
    data.certifications || '',
    data.notes || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 4: Paste URLs into `script.js`

In `script.js`, paste your two URLs at the top of the file:

```javascript
const BUYER_SHEET_WEBHOOK_URL = "YOUR_BUYER_WEB_APP_URL_HERE";
const SUPPLIER_SHEET_WEBHOOK_URL = "YOUR_SUPPLIER_WEB_APP_URL_HERE";
```

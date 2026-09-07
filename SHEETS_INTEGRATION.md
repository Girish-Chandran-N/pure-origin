# Separate Buyer & Supplier Google Sheets Setup — Pure Origin Trading Ltd

You can automatically maintain **two separate Google Sheets**:
1. **Buyers Sheet**: Receives all UK Buyer wholesale enquiries.
2. **Suppliers Sheet**: Receives all Overseas Supplier introductions.

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

## Step 2: Add Apps Script to Each Sheet

### For Buyer Sheet:
1. In **Pure Origin — Buyer Enquiries**, click **Extensions** &rarr; **Apps Script**.
2. Paste this code:
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
3. Click **Deploy** &rarr; **New deployment** &rarr; Select type **Web app** &rarr; Set *Who has access* to **Anyone**.
4. Copy the **Buyer Web App URL**.

---

### For Supplier Sheet:
1. In **Pure Origin — Supplier Introductions**, click **Extensions** &rarr; **Apps Script**.
2. Paste this code:
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
3. Click **Deploy** &rarr; **New deployment** &rarr; Select type **Web app** &rarr; Set *Who has access* to **Anyone**.
4. Copy the **Supplier Web App URL**.

---

## Step 3: Paste URLs into `script.js`

In `script.js`, paste your two URLs at the top of the file:

```javascript
const BUYER_SHEET_WEBHOOK_URL = "YOUR_BUYER_WEB_APP_URL_HERE";
const SUPPLIER_SHEET_WEBHOOK_URL = "YOUR_SUPPLIER_WEB_APP_URL_HERE";
```

Now all **Buyer enquiries** go directly into your Buyer Sheet, and all **Supplier introductions** go directly into your Supplier Sheet!

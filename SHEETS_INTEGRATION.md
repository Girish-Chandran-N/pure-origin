# Google Sheets & Email Integration Guide — Pure Origin Trading Ltd

This guide explains how to automatically receive form submissions from your website directly into a **Google Sheet / Excel** and your **Email Inbox**.

---

## Method 1: Google Sheets Direct Integration (Recommended, 100% Free)

You can connect your website forms directly to a Google Sheet using Google Apps Script in under 2 minutes:

### Step 1: Create Your Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet named **"Pure Origin Website Enquiries"**.
2. Add these headers to Row 1 of Sheet1:
   - `Timestamp` | `Enquiry Type` | `Name` | `Company` | `Email` | `Phone / Location` | `Product Category` | `Volume / Certifications` | `Timeline` | `Notes`

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** &rarr; **Apps Script**.
2. Erase any code in the editor and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = e.parameter;
    
    sheet.appendRow([
      new Date(),
      data.enquiry_type || data.form_type || 'General',
      data.name || '',
      data.company || '',
      data.email || '',
      data.phone || data.location || '',
      data.product_category || data.production_category || '',
      data.volume || data.certifications || '',
      data.timeline || '',
      data.notes || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': err }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (disk icon).
4. Click **Deploy** &rarr; **New deployment**.
5. Select type: **Web app**.
6. Set **Execute as**: *Me*.
7. Set **Who has access**: *Anyone*.
8. Click **Deploy**, authorize permissions, and copy your **Web App URL** (starts with `https://script.google.com/macros/s/...`).

### Step 3: Connect to Your Website (`script.js`)
In `script.js`, replace `GOOGLE_SHEET_WEBHOOK_URL` with your copied Web App URL:
```javascript
const GOOGLE_SHEET_WEBHOOK_URL = "YOUR_COPIED_WEB_APP_URL_HERE";
```

---

## Method 2: Formspree (Built-in Email & Excel Export)

Since the website forms use Formspree, you already have built-in Email & Excel capabilities:

1. **Email Notifications**: Formspree sends every submission directly to your email inbox immediately.
2. **Export to Excel / CSV**: Log in to your [Formspree Dashboard](https://formspree.io), select your form, and click **Export CSV** to download an Excel-compatible file anytime.
3. **Formspree 1-Click Google Sheets Integration**:
   - In your Formspree Dashboard, go to **Plugins / Integrations** &rarr; **Google Sheets**.
   - Click **Connect Google Sheets** and select your sheet. All submissions will automatically flow into that sheet!

---

## Method 3: Zapier / Make.com Webhook

If you use Microsoft Excel Online, Notion, or HubSpot:
1. Create a free account on [Make.com](https://make.com) or [Zapier](https://zapier.com).
2. Create a Webhook trigger and select action **Google Sheets / Excel - Add Row**.
3. Paste the Webhook URL into Formspree or `script.js`.

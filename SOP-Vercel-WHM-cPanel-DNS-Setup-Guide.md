# Evergreen SOP: Connecting Vercel Projects to WHM & cPanel DNS

**Document ID:** `SOP-INFRA-VERCEL-CPANEL`  
**Scope:** Universal Staging Subdomain & Production Domain Setup  
**Platforms:** Vercel Edge Network · WHM (WebHost Manager) · cPanel Zone Editor  
**Applicability:** All Agency & Client Frontend Deployments (Astro, Next.js, React, Static/SSR)

---

## Table of Contents

1. [Overview & Understanding Vercel's Dynamic DNS Targets](#1-overview--understanding-vercels-dynamic-dns-targets)
2. [Golden Rule: Zone Editor Only (Never Create a cPanel Subdomain)](#2-golden-rule-zone-editor-only-never-create-a-cpanel-subdomain)
3. [Part 1: Configuring the Domain or Subdomain in Vercel](#3-part-1-configuring-the-domain-or-subdomain-in-vercel)
4. [Part 2: Adding the DNS Record in cPanel (Zone Editor)](#4-part-2-adding-the-dns-record-in-cpanel-zone-editor)
5. [Part 3: Adding the DNS Record in WHM (DNS Zone Manager)](#5-part-3-adding-the-dns-record-in-whm-dns-zone-manager)
6. [Part 4: Universal Reference Matrix (Staging vs. Production Cutover)](#6-part-4-universal-reference-matrix-staging-vs-production-cutover)
7. [Part 5: Verification, SSL Issuance & Troubleshooting](#7-part-5-verification-ssl-issuance--troubleshooting)

---

## 1. Overview & Understanding Vercel's Dynamic DNS Targets

When connecting a custom domain or staging subdomain (such as `staging.<domain.com>` or `staging2.<domain.com>`) to Vercel, Vercel generates **project-specific DNS targets** from its expanded global Anycast pool rather than relying solely on the legacy universal values.

| Record Type | Legacy Vercel Value (Still Works) | Modern Project-Specific Value (Recommended) |
| :--- | :--- | :--- |
| **CNAME (Subdomains)** | `cname.vercel-dns.com.` | `<unique-hash>.vercel-dns-xxx.com.` *(e.g. `18ab73975d5bfe50.vercel-dns-017.com.`)* |
| **A Record (Apex `@`)** | `76.76.21.21` | Expanded Anycast IP assigned in dashboard *(e.g. `76.76.21.x` or `216.198.79.x`)* |

- **Why the change?** Vercel expanded its global IP and DNS infrastructure to improve routing resilience and isolate traffic across edge clusters.
- **What should you use?** Always copy and paste the **exact** `Name` and `Value` displayed inside your Vercel project's **Settings -> Domains** screen. Both the modern project-specific record and the legacy record work, but Vercel's dashboard validates fastest when matching the exact recommended record shown.

---

## 2. Golden Rule: Zone Editor Only (Never Create a cPanel Subdomain)

When your DNS is hosted on a WHM/cPanel server (which may also host your current website, Headless WordPress, or email) and your frontend application is hosted externally on **Vercel**:

- **DO NOT** go to **cPanel -> Domains -> Create A New Domain** to create your staging subdomain.
  - *Why?* Creating a domain/subdomain inside cPanel's "Domains" interface tells the cPanel server to host the files locally and automatically creates local `A` records pointing to the cPanel server's own IP address.
- **DO** go directly to **cPanel -> Zone Editor** (or **WHM -> DNS Zone Manager**).
  - You only need a **DNS record** (`CNAME` or `A`) pointing traffic directly to Vercel's servers.

---

## 3. Part 1: Configuring the Domain or Subdomain in Vercel

Before touching WHM or cPanel, register the target hostname inside your Vercel project so Vercel knows which project should serve incoming requests and gives you your exact DNS target.

1. Log in to [Vercel](https://vercel.com) and open your project.
2. Click **Settings** in the top navigation bar, then select **Domains** from the left sidebar.
3. In the domain input box, enter your target domain:
   - **For a Staging Site:** Enter `<subdomain>.<domain.com>` (e.g., `staging2.goodrep.media`).
   - **For a Production Launch:** Enter `<domain.com>` (and optionally let Vercel add `www.<domain.com>`).
4. Click **Add**.
5. Vercel will immediately display an **"Invalid Configuration"** red badge. **This is normal** because the DNS record has not been added to WHM/cPanel yet.
6. Ensure the **DNS Records** tab is selected (not *Vercel DNS*, since WHM/cPanel manages your nameservers).
7. Copy the exact **Name** and **Value** provided by Vercel:

```text
+-----------------------------------------------------------------------------------+
|  VERCEL DASHBOARD -> SETTINGS -> DOMAINS                                          |
|                                                                                   |
|  Type        Name                Value                                            |
|  ----        ----                -----                                            |
|  CNAME       <subdomain>         <unique-hash>.vercel-dns-017.com.                |
|  (Example)   staging2            18ab73975d5bfe50.vercel-dns-017.com.             |
+-----------------------------------------------------------------------------------+
```

---

## 4. Part 2: Adding the DNS Record in cPanel (Zone Editor)

Use this workflow when logged into the individual **cPanel** account for `<domain.com>`.

### Step 4.1: Open Zone Editor & Check for Conflicts
1. Log in to **cPanel**.
2. Scroll to the **Domains** section and click **Zone Editor**.
3. Locate `<domain.com>` in the table and click **Manage** (on the far right).
4. In the **Filter / Search** bar above the records table, type your subdomain prefix (e.g., `staging2`).
5. **Inspect existing records:**
   - DNS rules strictly forbid a `CNAME` record from coexisting with any `A`, `AAAA`, or `TXT` record of the same name.
   - If you see any existing `A` or `CNAME` record for `<subdomain>.<domain.com>.`, click **Delete** (and also delete any auto-generated `mail.<subdomain>`, `cpanel.<subdomain>`, or `webmail.<subdomain>` records if someone previously added it as a cPanel domain).

### Step 4.2: Create the CNAME Record
1. Click the **+ Add Record** button (or click the dropdown arrow next to *+ Add Record* and select **Add "CNAME" Record**).
2. Complete the fields exactly as follows:

| cPanel Zone Editor Field | What to Enter | Example (`staging2.goodrep.media`) |
| :--- | :--- | :--- |
| **Name** *(Zone Name)* | Enter `<subdomain>` *(cPanel will automatically append `.<domain.com>.` when you click or tab out of the box)* | `staging2` *(becomes `staging2.goodrep.media.`)* |
| **TTL** | `300` *(or leave default `14400`; `300` = 5 mins for fast propagation)* | `300` |
| **Type** | `CNAME` | `CNAME` |
| **Record** *(Target)* | Paste the **Value** copied from Vercel *(with or without trailing dot; cPanel normalizes it)* | `18ab73975d5bfe50.vercel-dns-017.com.` |

3. Click **Save Record**.

---

## 5. Part 3: Adding the DNS Record in WHM (DNS Zone Manager)

Use this workflow if you are logged into **WHM (WebHost Manager)** as a root/reseller administrator rather than an individual cPanel user.

1. Log in to **WHM**.
2. In the left navigation search bar, type `DNS` and click **DNS Functions -> DNS Zone Manager**.
3. Find `<domain.com>` in the domain list and click **Manage**.
4. Use the search input to check if `<subdomain>.<domain.com>.` already exists. If conflicting `A` or `CNAME` records exist for that exact subdomain, click **Delete**.
5. Click **+ Add Record** at the top right and select **CNAME**:
   - **Valid Zone Name:** Enter `<subdomain>` (WHM automatically appends `.<domain.com>.`).
   - **TTL:** `300`
   - **Type:** `CNAME`
   - **Record (Hostname):** Paste the exact Vercel value (e.g., `18ab73975d5bfe50.vercel-dns-017.com.`).
6. Click **Save Record**.

---

## 6. Part 4: Universal Reference Matrix (Staging vs. Production Cutover)

When managing client sites in WHM/cPanel, you will typically perform one of two operations: setting up an isolated **Staging Subdomain** (zero impact on the live site), or executing a **Full Production Cutover** (where Vercel takes over `<domain.com>` and `www.<domain.com>`, while WordPress and Email remain on the WHM/cPanel server).

### Scenario A: Staging / Preview Subdomain Only (Zero Live Impact)
Leaves the current live website (`@` and `www`) and email completely untouched on WHM/cPanel:

| Type | Name (in Zone Editor) | Target / Record Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `staging2.<domain.com>.` | `<hash>.vercel-dns-xxx.com.` | `300` | Routes `https://staging2.<domain.com>` to Vercel |

### Scenario B: Full Production Cutover (Apex + `www` on Vercel, WordPress + Email on cPanel)
When moving the live domain to Vercel while keeping Headless WordPress (`wp.<domain.com>`) and cPanel Email on your WHM server:

| Type | Name (in Zone Editor) | Target / Record Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `wp.<domain.com>.` | `<cpanel-server-ip>` | `300` | Keeps Headless WordPress CMS hosted on cPanel server |
| **A** | `mail.<domain.com>.` | `<cpanel-server-ip>` | `300` | Keeps cPanel mail server reachable (if using cPanel email) |
| **MX** | `<domain.com>.` | `Priority: 0` -> `mail.<domain.com>.` | `300` | Ensures MX points to `mail.` (NOT `@`) before changing `@` IP |
| **A** | `<domain.com>.` | `<vercel-assigned-a-record-ip>` | `300` | Routes root domain (`https://<domain.com>`) to Vercel |
| **CNAME** | `www.<domain.com>.` | `<hash>.vercel-dns-xxx.com.` | `300` | Routes `https://www.<domain.com>` to Vercel |

- **CRITICAL EMAIL CHECK FOR PRODUCTION CUTOVERS:** If a client uses cPanel Webmail/Email (instead of Google Workspace or Microsoft 365), their default `MX` record often points directly to `<domain.com>.`. Before pointing the root `<domain.com>.` `A` record to Vercel's IP, verify that the `MX` record points to `mail.<domain.com>.` and that `mail.<domain.com>.` has an `A` record pointing to the cPanel server IP.

---

## 7. Part 5: Verification, SSL Issuance & Troubleshooting

### Step 7.1: Verify DNS Propagation & SSL in Vercel
1. Wait **1 to 5 minutes** after saving the record in WHM/cPanel.
2. Return to your **Vercel Dashboard -> Settings -> Domains**.
3. Vercel automatically polls the DNS record every few seconds (or you can click **Refresh**).
4. Once detected:
   - The red **Invalid Configuration** badge changes to **Valid Configuration** (blue checkmark).
   - Vercel automatically provisions and installs a free **Let's Encrypt SSL/TLS certificate** in the background (usually within 30–60 seconds).
5. Open `https://<subdomain>.<domain.com>` in your browser to confirm your site is live over HTTPS.

### Step 7.2: Optional Terminal Check
You can test DNS resolution immediately from your terminal:
```bash
# Verify the CNAME record resolves to Vercel's target
dig CNAME staging2.goodrep.media +short

# Expected output:
# 18ab73975d5bfe50.vercel-dns-017.com.
```

### Step 7.3: Common Troubleshooting Fixes

| Issue / Error Message | Root Cause | Quick Fix |
| :--- | :--- | :--- |
| **cPanel Error:** *"A CNAME record with that name already exists or conflicts with another record"* | An `A`, `AAAA`, or `TXT` record already exists for `<subdomain>.<domain.com>.` in the Zone Editor. | Filter the Zone Editor by `<subdomain>`, delete the existing `A` / `TXT` records for that subdomain, then save the `CNAME`. |
| **Browser shows cPanel "Default Web Site Page" (`cgi-sys/defaultwebpage.cgi`)** | The subdomain was created under *cPanel -> Domains* OR local browser/ISP DNS cache is still holding the old IP. | 1. Remove the subdomain from *cPanel -> Domains* if present.<br>2. Re-add the `CNAME` in *Zone Editor*.<br>3. Test in an Incognito window or flush DNS cache. |
| **Vercel stuck on "Generating SSL Certificate" for >15 minutes** | The domain has restrictive `CAA` records in cPanel blocking Let's Encrypt. | In cPanel Zone Editor, filter by `CAA`. Either remove restrictive CAA records or add a CAA record permitting `letsencrypt.org`. |

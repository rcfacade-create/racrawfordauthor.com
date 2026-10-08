# House Trial journey — 8 October 2026

## Delivered

- Six validated House names are retained across Trial, Starter Pack, chapter and shop using session storage and explicit links. Certificate names are not stored or sent to analytics.
- Share links label the sender's House as `ref_house`, never the recipient's result.
- Book Payment Links receive `client_reference_id=avis_<House>_<source>` for Stripe order attribution. Readers still choose their bookmark in Stripe's required menu; there is no automatic custom-field prefill.
- Copy captions and native share payloads include the Trial link. Card downloads, caption copies and native shares have distinct analytics events. Clipboard failure does not negate a prepared card download.
- Trial, blank certificate and Starter Pack use the same engraved SVG renderer and phone wallpaper renderer. Existing artwork, sigils, mottos and colours are preserved, not independently recertified against the book.
- Shop filters work. Preview prints have disabled Coming soon controls instead of a nonfunctional basket.
- URL-only GA4 purchases are removed. Return visits are `checkout_return` with `payment_status=unverified`; they carry no revenue. The session token is excluded from GA4 page_location.
- Gazette form submission is `gazette_signup_submit`, not a confirmed `generate_lead`.

## Automated validation

Run `node --test tests/house-journey.test.cjs`.
Checks include referral/result separation, all six Houses through checkout attribution, invalid House rejection, forged return URLs producing no purchase, embedded artwork/escaped certificate names, and Books/All filters.

## Stripe configuration checked without payment

The four current Book One Payment Links are active, collect UK shipping, require a bookmark selection from the six Houses, and redirect to the free Starter Pack with the matching edition and CHECKOUT_SESSION_ID. No live purchase was made. Only a live Stripe account is connected; no sandbox account is available through the current connector.

## Remaining server work (not implemented on static hosting)

1. Provide a server endpoint with protected Stripe credentials; never place credentials in public JavaScript or this repository.
2. Verify Stripe webhook signatures and process both checkout.session.completed and checkout.session.async_payment_succeeded, gated on payment_status=paid. Reconcile the checkout session and line items with the product allowlist.
3. Use a durable transaction record and outbox for retries; ensure duplicate callbacks cannot double-count or duplicate fulfillment. Emit GA4 purchase with a stable transaction_id and actual merchandise value, shipping and tax as separate fields. Decide consent-aware GA session/client attribution before implementation.
4. Preserve client_reference_id and the actual bookmarkhouse custom field in the fulfillment record. The reader may intentionally select a different bookmark from their Trial House.
5. Confirm the Starter Pack is available after payment even if the user misses the browser redirect, using a receipt/recovery path. Do not expose customer details through a public session lookup.
6. Sandbox acceptance: each of four editions; cancelled/unpaid and delayed payments; forged and refreshed return pages; duplicate webhooks; different selected bookmark; customer closes the success page. Check one purchase per paid order and none for unpaid orders.
7. Verify GA4 receipt/custom dimensions and the funnel in the property. Test iPhone Safari native sharing/cancellation, actual download files, A4 PDF printing, long names, all House export assets, and canon colours/sigils separately.

Sources: https://docs.stripe.com/checkout/fulfillment and https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase

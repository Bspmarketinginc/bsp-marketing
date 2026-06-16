# How to publish a review

Approved reviews live in `reviews.json`. Anything in that file shows publicly
on the Reviews page for every visitor, on every device.

## Steps

1. A visitor submits a review on the site → you get an email with their name,
   company, star rating, and review text.
2. If you want to publish it, add it to `reviews.json`.
3. Save, commit, and push. It goes live in a minute or two.

## Format

`reviews.json` is a list. Each review looks like this:

```json
[
  {
    "name": "Jane Smith",
    "company": "Smith & Co.",
    "stars": 5,
    "text": "BSP completely turned our social media around. Highly recommend.",
    "date": "June 2026"
  },
  {
    "name": "Mike Johnson",
    "company": "Johnson Auto",
    "stars": 5,
    "text": "They actually answer the phone. Best agency we've worked with.",
    "date": "May 2026"
  }
]
```

Rules:
- Wrap the whole thing in square brackets `[ ]`
- Separate each review with a comma
- `stars` is a number from 1 to 5 (no quotes)
- `company` and `date` are optional — you can leave them as `""`
- Keep the quotes and commas exactly as shown, or the page won't load reviews

The easiest option: just forward me the review you want to post and I'll add it.

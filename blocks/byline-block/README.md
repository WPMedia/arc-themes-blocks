# `@wpmedia/byline-block`
Byline block for Fusion News Theme

## Usage
It expects the `credits` section from Composer's ANS schema, which is laid out as
```
credits: {
    by: [{
        name: ...
        url: ...
        ...
    }]
}
```

If there's one author, it will return `By <author>`
If there are two authors, it will return `By <author_0> and <author_1>`
If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`

If there's no authors, it will return null.
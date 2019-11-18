# `@arc-test-org/author-bio-block`
Author Short Biography block for Fusion News Theme

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

If there is no description provided by the schema, then no author bio will be displayed - this means that they are not a staff writer.
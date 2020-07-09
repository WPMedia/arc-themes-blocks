# `@wpmedia/textfile-block`

Text File block for Fusion News Theme
This block offers a convenient way to render text files such as `ads.txt` or `robots.txt`. It must be used with `text` output type only, if other output type is selected, it will render nothing.

## Usage

The content of the custom field `Text` is the data to be rendered on the page.
Be sure to use the page output type `text` or nothing will render. 

## Production

Before go live, open a ticket with ACS (Arc Customer Service) asking to have a redirect added:
```
rewrite ^/robots.txt$ /robots.txt?outputType=text? last;
```

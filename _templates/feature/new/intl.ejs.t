---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/intl.json
---
{
    "<%= h.inflection.dasherize(block_name) %>-block": {}
}

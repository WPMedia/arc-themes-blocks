"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _imagePositionConstants = require("./shared/imagePositionConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true,
  imagePositionSM: _imagePositionConstants.RIGHT
};
describe('top table list', function () {
  beforeAll(function () {
    jest.mock('fusion:properties', function () {
      return jest.fn(function () {
        return {
          fallbackImage: 'placeholder.jpg'
        };
      });
    });
    jest.mock('fusion:themes', function () {
      return jest.fn(function () {
        return {};
      });
    });
    jest.mock('fusion:properties', function () {
      return jest.fn(function () {
        return {};
      });
    });
    jest.mock('fusion:properties', function () {
      return jest.fn(function () {
        return {
          fallbackImage: 'placeholder.jpg'
        };
      });
    });
  });
  afterAll(function () {
    jest.resetModules();
  });
  it('renders null if no content', function () {
    var _require = require('./default'),
        TopTableList = _require["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    jest.mock('fusion:context', function () {
      return {
        useFusionContext: jest.fn(function () {
          return {
            arcSite: 'the-sun'
          };
        })
      };
    });
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn()
      };
    });
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: config,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(wrapper.text()).toBe('');
    expect(wrapper.find('.top-table-list-container').children().length).toBe(0);
  });
  it('renders one content item with incomplete data', function () {
    var _require2 = require('./default'),
        TopTableList = _require2["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              websites: {
                'the-sun': {
                  website_url: 'url'
                }
              }
            }]
          };
        })
      };
    });

    var smConfig = _objectSpread(_objectSpread({}, config), {}, {
      small: 1,
      showImageSM: true,
      imageRatioSM: '4:3'
    });

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: smConfig,
      arcSite: "the-sun",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });
  it('renders one content item with complete data', function () {
    var _require3 = require('./default'),
        TopTableList = _require3["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              promo_items: {
                basic: {
                  type: 'image',
                  url: 'url'
                }
              },
              headlines: {
                basic: 'Basic Headline'
              },
              description: {
                basic: 'Basic description'
              },
              credits: {
                by: ['Bob Woodward']
              },
              websites: {
                'the-sun': {
                  website_url: 'url'
                }
              },
              subtype: 'editorial'
            }]
          };
        })
      };
    });

    var smConfig = _objectSpread(_objectSpread({}, config), {}, {
      small: 1,
      showImageSM: true,
      imageRatioSM: '4:3'
    });

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: smConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });
  it('renders content with offset override custom field set', function () {
    var _require4 = require('./default'),
        TopTableList = _require4["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              promo_items: {
                basic: {
                  type: 'image',
                  url: 'url'
                }
              },
              headlines: {
                basic: 'Basic Headline'
              },
              description: {
                basic: 'Basic description'
              },
              credits: {
                by: ['Bob Woodward']
              },
              websites: {
                'the-sun': {
                  website_url: 'url'
                }
              },
              subtype: 'editorial'
            }, {
              _id: 'abcde',
              promo_items: {
                basic: {
                  type: 'image',
                  url: 'url'
                }
              },
              headlines: {
                basic: 'Alt Headline'
              },
              description: {
                basic: 'Alt description'
              },
              credits: {
                by: ['John Doe']
              },
              websites: {
                'the-sun': {
                  website_url: 'url'
                }
              },
              subtype: 'editorial'
            }]
          };
        })
      };
    });

    var smConfig = _objectSpread(_objectSpread({}, config), {}, {
      small: 1,
      showImageSM: true,
      imageRatioSM: '4:3',
      offsetOverride: 1
    });

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: smConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    var container = wrapper.find('.top-table-list-container');
    expect(container.children().length).toBe(1);
    var storyItem = container.find('StoryItemContainer');
    expect(storyItem).toHaveLength(1);
    expect(storyItem.prop('id')).toEqual('abcde');
    expect(storyItem.prop('itemTitle')).toEqual('Alt Headline');
    expect(storyItem.prop('description')).toEqual('Alt description');
    expect(storyItem.prop('subType')).toEqual('subtype_editorial');
  });
  it('renders content only for the arcSite', function () {
    var _require5 = require('./default'),
        TopTableList = _require5["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    jest.mock('fusion:context', function () {
      return {
        useFusionContext: jest.fn(function () {
          return {
            arcSite: 'the-sun'
          };
        })
      };
    });
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              promo_items: {
                basic: {
                  type: 'image',
                  url: 'url'
                }
              },
              headlines: {
                basic: 'Basic Headline'
              },
              description: {
                basic: 'Basic description'
              },
              credits: {
                by: ['Bob Woodward']
              },
              websites: {
                'the-prophet': {
                  website_url: 'url'
                },
                'the-sun': {
                  website_url: 'url'
                }
              }
            }]
          };
        })
      };
    });

    var xlConfig = _objectSpread(_objectSpread({}, config), {}, {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '3:2'
    });

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(wrapper.find('.top-table-list-container').children().length).toBe(1);
  });
  it('renders no content if arcSite not found', function () {
    var _require6 = require('./default'),
        TopTableList = _require6["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    jest.mock('fusion:context', function () {
      return {
        useFusionContext: jest.fn(function () {
          return {
            arcSite: 'daily-telegraph'
          };
        })
      };
    });
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              promo_items: {
                basic: {
                  type: 'image',
                  url: 'url'
                }
              },
              headlines: {
                basic: 'Basic Headline'
              },
              description: {
                basic: 'Basic description'
              },
              credits: {
                by: ['Bob Woodward']
              },
              websites: {
                'the-prophet': {
                  website_url: 'url'
                },
                'the-sun': {
                  website_url: 'url'
                }
              }
            }]
          };
        })
      };
    });
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: config,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(wrapper.find('.top-table-list-container').children().length).toBe(0);
  });
});
describe('top table list overline rules', function () {
  beforeAll(function () {
    jest.mock('fusion:properties', function () {
      return jest.fn(function () {
        return {
          fallbackImage: 'placeholder.jpg'
        };
      });
    });
    jest.mock('fusion:context', function () {
      return {
        useFusionContext: jest.fn(function () {
          return {
            arcSite: 'the-sun'
          };
        })
      };
    });
    jest.mock('fusion:themes', function () {
      return jest.fn(function () {
        return {};
      });
    });
    jest.mock('fusion:properties', function () {
      return jest.fn(function () {
        return {
          resizerUrl: 'https://resizer.com'
        };
      });
    });
  });
  afterAll(function () {
    jest.resetModules();
  });
  it('must render overline from label', function () {
    var _require7 = require('./default'),
        TopTableList = _require7["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var localConfig = Object.assign(config, {
      extraLarge: 1,
      large: 0,
      medium: 0,
      small: 0
    });
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              headlines: {
                basic: 'Basic Headline'
              },
              description: {
                basic: 'Basic description'
              },
              credits: {
                by: ['Bob Woodward']
              },
              websites: {
                'the-sun': {
                  website_url: 'url'
                }
              },
              label: {
                basic: {
                  display: true,
                  text: 'The Label',
                  url: 'https://example.com'
                }
              }
            }]
          };
        }),
        useEditableContent: jest.fn(function () {
          return {
            editableContent: jest.fn(function () {
              return {};
            })
          };
        })
      };
    });
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: localConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    var ele = wrapper.find('.top-table-list-container').find('a.overline');
    expect(ele.length).toBe(1);
    expect(ele.text()).toEqual('The Label');
  });
  it('must render overline from section', function () {
    var _require8 = require('./default'),
        TopTableList = _require8["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var localConfig = Object.assign(config, {
      extraLarge: 1,
      large: 0,
      medium: 0,
      small: 0
    });
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              headlines: {
                basic: 'Basic Headline'
              },
              description: {
                basic: 'Basic description'
              },
              credits: {
                by: ['Bob Woodward']
              },
              websites: {
                'the-sun': {
                  website_url: 'url',
                  website_section: {
                    _id: '/the_url',
                    name: 'The Section'
                  }
                }
              }
            }]
          };
        }),
        useEditableContent: jest.fn(function () {
          return {
            editableContent: jest.fn(function () {
              return {};
            })
          };
        })
      };
    });
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: localConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    var ele = wrapper.find('.top-table-list-container').find('a.overline');
    expect(ele.text()).toEqual('The Section');
    expect(ele.length).toBe(1);
  });
  it('must prioritize overline from label if has section too', function () {
    var _require9 = require('./default'),
        TopTableList = _require9["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var localConfig = Object.assign(config, {
      extraLarge: 1,
      large: 0,
      medium: 0,
      small: 0
    });
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              headlines: {
                basic: 'Basic Headline'
              },
              description: {
                basic: 'Basic description'
              },
              credits: {
                by: ['Bob Woodward']
              },
              label: {
                basic: {
                  display: true,
                  text: 'The Label',
                  url: 'https://example.com'
                }
              },
              websites: {
                'the-sun': {
                  website_url: 'url',
                  website_section: {
                    _id: '/the_url',
                    name: 'The Section'
                  }
                }
              }
            }]
          };
        }),
        useEditableContent: jest.fn(function () {
          return {
            editableContent: jest.fn(function () {
              return {};
            })
          };
        })
      };
    });
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: localConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    var ele = wrapper.find('.top-table-list-container').find('a.overline');
    expect(ele.text()).toEqual('The Label');
    expect(ele.length).toBe(1);
  });
});
describe('default ratios', function () {
  beforeAll(function () {
    jest.mock('fusion:content', function () {
      return {
        useContent: jest.fn(function () {
          return {
            content_elements: [{
              _id: 'kjdfh',
              promo_items: {
                basic: {
                  type: 'image',
                  url: 'url',
                  resized_params: {
                    '377x283': '',
                    '377x251': '',
                    '377x212': '',
                    '400x225': '',
                    '400x267': '',
                    '400x300': '',
                    '800x600': '',
                    '800x533': '',
                    '800x450': ''
                  }
                }
              },
              headlines: {
                basic: 'Basic Headline'
              },
              description: {
                basic: 'Basic description'
              },
              credits: {
                by: ['Bob Woodward']
              },
              websites: {
                'the-sun': {
                  website_url: 'url'
                }
              }
            }]
          };
        })
      };
    });
    jest.mock('fusion:properties', function () {
      return jest.fn(function () {
        return {
          fallbackImage: 'placeholder.jpg',
          resizerURL: 'resizer'
        };
      });
    });
  });
  afterAll(function () {
    jest.resetAllMocks();
  });
  it('must have a default 4:3 ratio for XL', function () {
    var xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true
    };

    var _require10 = require('./default'),
        TopTableList = _require10["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(600);
  });
  it('must have a default 4:3 ratio for LG', function () {
    var xlConfig = {
      large: 1,
      showImageLG: true
    };

    var _require11 = require('./default'),
        TopTableList = _require11["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(283);
  });
  it('must have a default 16:9 ratio for MD', function () {
    var xlConfig = {
      medium: 1,
      showImageMD: true
    };

    var _require12 = require('./default'),
        TopTableList = _require12["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(225);
  });
  it('must have a default 3:2 ratio for SM', function () {
    var xlConfig = {
      small: 1,
      showImageSM: true
    };

    var _require13 = require('./default'),
        TopTableList = _require13["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(267);
  });
  it('XL can be changed to 16:9', function () {
    var xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '16:9'
    };

    var _require14 = require('./default'),
        TopTableList = _require14["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(450);
  });
  it('XL can be changed to 4:3', function () {
    var xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '4:3'
    };

    var _require15 = require('./default'),
        TopTableList = _require15["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(600);
  });
  it('XL can be changed to 3:2', function () {
    var xlConfig = {
      extraLarge: 1,
      showImageXL: true,
      showHeadlineXL: true,
      imageRatioXL: '3:2'
    };

    var _require16 = require('./default'),
        TopTableList = _require16["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(533);
  });
  it('LG can be changed to 16:9', function () {
    var xlConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '16:9'
    };

    var _require17 = require('./default'),
        TopTableList = _require17["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(212);
  });
  it('LG can be changed to 4:3', function () {
    var xlConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '4:3'
    };

    var _require18 = require('./default'),
        TopTableList = _require18["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(283);
  });
  it('LG can be changed to 3:2', function () {
    var xlConfig = {
      large: 1,
      showImageLG: true,
      imageRatioLG: '3:2'
    };

    var _require19 = require('./default'),
        TopTableList = _require19["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(251);
  });
  it('MD can be changed to 16:9', function () {
    var xlConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '16:9'
    };

    var _require20 = require('./default'),
        TopTableList = _require20["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(225);
  });
  it('MD can be changed to 4:3', function () {
    var xlConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '4:3'
    };

    var _require21 = require('./default'),
        TopTableList = _require21["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(300);
  });
  it('MD can be changed to 3:2', function () {
    var xlConfig = {
      medium: 1,
      showImageMD: true,
      imageRatioMD: '3:2'
    };

    var _require22 = require('./default'),
        TopTableList = _require22["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(267);
  });
  it('SM can be changed to 16:9', function () {
    var xlConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '16:9'
    };

    var _require23 = require('./default'),
        TopTableList = _require23["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(225);
  });
  it('SM can be changed to 4:3', function () {
    var xlConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '4:3'
    };

    var _require24 = require('./default'),
        TopTableList = _require24["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(300);
  });
  it('SM can be changed to 3:2', function () {
    var xlConfig = {
      small: 1,
      showImageSM: true,
      imageRatioSM: '3:2'
    };

    var _require25 = require('./default'),
        TopTableList = _require25["default"];

    TopTableList.prototype.fetchContent = jest.fn().mockReturnValue({});
    var ttl = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(TopTableList, {
      customFields: xlConfig,
      arcSite: "",
      deployment: jest.fn(function (path) {
        return path;
      })
    }));
    expect(ttl.find('Image').prop('largeHeight')).toBe(267);
  });
});
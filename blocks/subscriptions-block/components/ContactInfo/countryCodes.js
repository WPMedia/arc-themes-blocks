const countryCodes = [
  {
    key: 'checkout-block.Select-Country',
    code: '',
  },
  {
    key: 'checkout-block.Afghanistan',
    code: 'AF',
  },
  {
    key: 'checkout-block.Åland-Islands',
    code: 'AX',
  },
  {
    key: 'checkout-block.Albania',
    code: 'AL',
  },
  {
    key: 'checkout-block.Algeria',
    code: 'DZ',
  },
  {
    key: 'checkout-block.American-Samoa',
    code: 'AS',
  },
  {
    key: 'checkout-block.AndorrA',
    code: 'AD',
  },
  {
    key: 'checkout-block.Angola',
    code: 'AO',
  },
  {
    key: 'checkout-block.Anguilla',
    code: 'AI',
  },
  {
    key: 'checkout-block.Antarctica',
    code: 'AQ',
  },
  {
    key: 'checkout-block.Antigua-and-Barbuda',
    code: 'AG',
  },
  {
    key: 'checkout-block.Argentina',
    code: 'AR',
  },
  {
    key: 'checkout-block.Armenia',
    code: 'AM',
  },
  {
    key: 'checkout-block.Aruba',
    code: 'AW',
  },
  {
    key: 'checkout-block.Australia',
    code: 'AU',
  },
  {
    key: 'checkout-block.Austria',
    code: 'AT',
  },
  {
    key: 'checkout-block.Azerbaijan',
    code: 'AZ',
  },
  {
    key: 'checkout-block.Bahamas',
    code: 'BS',
  },
  {
    key: 'checkout-block.Bahrain',
    code: 'BH',
  },
  {
    key: 'checkout-block.Bangladesh',
    code: 'BD',
  },
  {
    key: 'checkout-block.Barbados',
    code: 'BB',
  },
  {
    key: 'checkout-block.Belarus',
    code: 'BY',
  },
  {
    key: 'checkout-block.Belgium',
    code: 'BE',
  },
  {
    key: 'checkout-block.Belize',
    code: 'BZ',
  },
  {
    key: 'checkout-block.Benin',
    code: 'BJ',
  },
  {
    key: 'checkout-block.Bermuda',
    code: 'BM',
  },
  {
    key: 'checkout-block.Bhutan',
    code: 'BT',
  },
  {
    key: 'checkout-block.Bolivia',
    code: 'BO',
  },
  {
    key: 'checkout-block.Bosnia-and-Herzegovina',
    code: 'BA',
  },
  {
    key: 'checkout-block.Botswana',
    code: 'BW',
  },
  {
    key: 'checkout-block.Bouvet-Island',
    code: 'BV',
  },
  {
    key: 'checkout-block.Brazil',
    code: 'BR',
  },
  {
    key: 'checkout-block.British-Indian-Ocean-Territory',
    code: 'IO',
  },
  {
    key: 'checkout-block.Brunei-Darussalam',
    code: 'BN',
  },
  {
    key: 'checkout-block.Bulgaria',
    code: 'BG',
  },
  {
    key: 'checkout-block.Burkina-Faso',
    code: 'BF',
  },
  {
    key: 'checkout-block.Burundi',
    code: 'BI',
  },
  {
    key: 'checkout-block.Cambodia',
    code: 'KH',
  },
  {
    key: 'checkout-block.Cameroon',
    code: 'CM',
  },
  {
    key: 'checkout-block.Canada',
    code: 'CA',
  },
  {
    key: 'checkout-block.Cape-Verde',
    code: 'CV',
  },
  {
    key: 'checkout-block.Cayman-Islands',
    code: 'KY',
  },
  {
    key: 'checkout-block.Central-African-Republic',
    code: 'CF',
  },
  {
    key: 'checkout-block.Chad',
    code: 'TD',
  },
  {
    key: 'checkout-block.Chile',
    code: 'CL',
  },
  {
    key: 'checkout-block.China',
    code: 'CN',
  },
  {
    key: 'checkout-block.Christmas-Island',
    code: 'CX',
  },
  {
    key: 'checkout-block.Cocos-(Keeling)-Islands',
    code: 'CC',
  },
  {
    key: 'checkout-block.Colombia',
    code: 'CO',
  },
  {
    key: 'checkout-block.Comoros',
    code: 'KM',
  },
  {
    key: 'checkout-block.Congo',
    code: 'CG',
  },
  {
    key: 'checkout-block.Congo,-The-Democratic-Republic-of-the',
    code: 'CD',
  },
  {
    key: 'checkout-block.Cook-Islands',
    code: 'CK',
  },
  {
    key: 'checkout-block.Costa-Rica',
    code: 'CR',
  },
  {
    key: "checkout-block.Cote-D'Ivoire",
    code: 'CI',
  },
  {
    key: 'checkout-block.Croatia',
    code: 'HR',
  },
  {
    key: 'checkout-block.Cuba',
    code: 'CU',
  },
  {
    key: 'checkout-block.Cyprus',
    code: 'CY',
  },
  {
    key: 'checkout-block.Czech-Republic',
    code: 'CZ',
  },
  {
    key: 'checkout-block.Denmark',
    code: 'DK',
  },
  {
    key: 'checkout-block.Djibouti',
    code: 'DJ',
  },
  {
    key: 'checkout-block.Dominica',
    code: 'DM',
  },
  {
    key: 'checkout-block.Dominican-Republic',
    code: 'DO',
  },
  {
    key: 'checkout-block.Ecuador',
    code: 'EC',
  },
  {
    key: 'checkout-block.Egypt',
    code: 'EG',
  },
  {
    key: 'checkout-block.El-Salvador',
    code: 'SV',
  },
  {
    key: 'checkout-block.Equatorial-Guinea',
    code: 'GQ',
  },
  {
    key: 'checkout-block.Eritrea',
    code: 'ER',
  },
  {
    key: 'checkout-block.Estonia',
    code: 'EE',
  },
  {
    key: 'checkout-block.Ethiopia',
    code: 'ET',
  },
  {
    key: 'checkout-block.Falkland-Islands-(Malvinas)',
    code: 'FK',
  },
  {
    key: 'checkout-block.Faroe-Islands',
    code: 'FO',
  },
  {
    key: 'checkout-block.Fiji',
    code: 'FJ',
  },
  {
    key: 'checkout-block.Finland',
    code: 'FI',
  },
  {
    key: 'checkout-block.France',
    code: 'FR',
  },
  {
    key: 'checkout-block.French-Guiana',
    code: 'GF',
  },
  {
    key: 'checkout-block.French-Polynesia',
    code: 'PF',
  },
  {
    key: 'checkout-block.French-Southern-Territories',
    code: 'TF',
  },
  {
    key: 'checkout-block.Gabon',
    code: 'GA',
  },
  {
    key: 'checkout-block.Gambia',
    code: 'GM',
  },
  {
    key: 'checkout-block.Georgia',
    code: 'GE',
  },
  {
    key: 'checkout-block.Germany',
    code: 'DE',
  },
  {
    key: 'checkout-block.Ghana',
    code: 'GH',
  },
  {
    key: 'checkout-block.Gibraltar',
    code: 'GI',
  },
  {
    key: 'checkout-block.Greece',
    code: 'GR',
  },
  {
    key: 'checkout-block.Greenland',
    code: 'GL',
  },
  {
    key: 'checkout-block.Grenada',
    code: 'GD',
  },
  {
    key: 'checkout-block.Guadeloupe',
    code: 'GP',
  },
  {
    key: 'checkout-block.Guam',
    code: 'GU',
  },
  {
    key: 'checkout-block.Guatemala',
    code: 'GT',
  },
  {
    key: 'checkout-block.Guernsey',
    code: 'GG',
  },
  {
    key: 'checkout-block.Guinea',
    code: 'GN',
  },
  {
    key: 'checkout-block.Guinea-Bissau',
    code: 'GW',
  },
  {
    key: 'checkout-block.Guyana',
    code: 'GY',
  },
  {
    key: 'checkout-block.Haiti',
    code: 'HT',
  },
  {
    key: 'checkout-block.Heard-Island-and-Mcdonald-Islands',
    code: 'HM',
  },
  {
    key: 'checkout-block.Holy-See-(Vatican-City-State)',
    code: 'VA',
  },
  {
    key: 'checkout-block.Honduras',
    code: 'HN',
  },
  {
    key: 'checkout-block.Hong-Kong',
    code: 'HK',
  },
  {
    key: 'checkout-block.Hungary',
    code: 'HU',
  },
  {
    key: 'checkout-block.Iceland',
    code: 'IS',
  },
  {
    key: 'checkout-block.India',
    code: 'IN',
  },
  {
    key: 'checkout-block.Indonesia',
    code: 'ID',
  },
  {
    key: 'checkout-block.Iran,-Islamic-Republic-Of',
    code: 'IR',
  },
  {
    key: 'checkout-block.Iraq',
    code: 'IQ',
  },
  {
    key: 'checkout-block.Ireland',
    code: 'IE',
  },
  {
    key: 'checkout-block.Isle-of-Man',
    code: 'IM',
  },
  {
    key: 'checkout-block.Israel',
    code: 'IL',
  },
  {
    key: 'checkout-block.Italy',
    code: 'IT',
  },
  {
    key: 'checkout-block.Jamaica',
    code: 'JM',
  },
  {
    key: 'checkout-block.Japan',
    code: 'JP',
  },
  {
    key: 'checkout-block.Jersey',
    code: 'JE',
  },
  {
    key: 'checkout-block.Jordan',
    code: 'JO',
  },
  {
    key: 'checkout-block.Kazakhstan',
    code: 'KZ',
  },
  {
    key: 'checkout-block.Kenya',
    code: 'KE',
  },
  {
    key: 'checkout-block.Kiribati',
    code: 'KI',
  },
  {
    key: "checkout-block.Korea,-Democratic-People'S-Republic-of",
    code: 'KP',
  },
  {
    key: 'checkout-block.Korea,-Republic-of',
    code: 'KR',
  },
  {
    key: 'checkout-block.Kuwait',
    code: 'KW',
  },
  {
    key: 'checkout-block.Kyrgyzstan',
    code: 'KG',
  },
  {
    key: "checkout-block.Lao-People'S-Democratic-Republic",
    code: 'LA',
  },
  {
    key: 'checkout-block.Latvia',
    code: 'LV',
  },
  {
    key: 'checkout-block.Lebanon',
    code: 'LB',
  },
  {
    key: 'checkout-block.Lesotho',
    code: 'LS',
  },
  {
    key: 'checkout-block.Liberia',
    code: 'LR',
  },
  {
    key: 'checkout-block.Libyan-Arab-Jamahiriya',
    code: 'LY',
  },
  {
    key: 'checkout-block.Liechtenstein',
    code: 'LI',
  },
  {
    key: 'checkout-block.Lithuania',
    code: 'LT',
  },
  {
    key: 'checkout-block.Luxembourg',
    code: 'LU',
  },
  {
    key: 'checkout-block.Macao',
    code: 'MO',
  },
  {
    key: 'checkout-block.Macedonia,-The-Former-Yugoslav-Republic-of',
    code: 'MK',
  },
  {
    key: 'checkout-block.Madagascar',
    code: 'MG',
  },
  {
    key: 'checkout-block.Malawi',
    code: 'MW',
  },
  {
    key: 'checkout-block.Malaysia',
    code: 'MY',
  },
  {
    key: 'checkout-block.Maldives',
    code: 'MV',
  },
  {
    key: 'checkout-block.Mali',
    code: 'ML',
  },
  {
    key: 'checkout-block.Malta',
    code: 'MT',
  },
  {
    key: 'checkout-block.Marshall-Islands',
    code: 'MH',
  },
  {
    key: 'checkout-block.Martinique',
    code: 'MQ',
  },
  {
    key: 'checkout-block.Mauritania',
    code: 'MR',
  },
  {
    key: 'checkout-block.Mauritius',
    code: 'MU',
  },
  {
    key: 'checkout-block.Mayotte',
    code: 'YT',
  },
  {
    key: 'checkout-block.Mexico',
    code: 'MX',
  },
  {
    key: 'checkout-block.Micronesia,-Federated-States-of',
    code: 'FM',
  },
  {
    key: 'checkout-block.Moldova,-Republic-of',
    code: 'MD',
  },
  {
    key: 'checkout-block.Monaco',
    code: 'MC',
  },
  {
    key: 'checkout-block.Mongolia',
    code: 'MN',
  },
  {
    key: 'checkout-block.Montserrat',
    code: 'MS',
  },
  {
    key: 'checkout-block.Morocco',
    code: 'MA',
  },
  {
    key: 'checkout-block.Mozambique',
    code: 'MZ',
  },
  {
    key: 'checkout-block.Myanmar',
    code: 'MM',
  },
  {
    key: 'checkout-block.Namibia',
    code: 'NA',
  },
  {
    key: 'checkout-block.Nauru',
    code: 'NR',
  },
  {
    key: 'checkout-block.Nepal',
    code: 'NP',
  },
  {
    key: 'checkout-block.Netherlands',
    code: 'NL',
  },
  {
    key: 'checkout-block.Netherlands-Antilles',
    code: 'AN',
  },
  {
    key: 'checkout-block.New-Caledonia',
    code: 'NC',
  },
  {
    key: 'checkout-block.New-Zealand',
    code: 'NZ',
  },
  {
    key: 'checkout-block.Nicaragua',
    code: 'NI',
  },
  {
    key: 'checkout-block.Niger',
    code: 'NE',
  },
  {
    key: 'checkout-block.Nigeria',
    code: 'NG',
  },
  {
    key: 'checkout-block.Niue',
    code: 'NU',
  },
  {
    key: 'checkout-block.Norfolk-Island',
    code: 'NF',
  },
  {
    key: 'checkout-block.Northern-Mariana-Islands',
    code: 'MP',
  },
  {
    key: 'checkout-block.Norway',
    code: 'NO',
  },
  {
    key: 'checkout-block.Oman',
    code: 'OM',
  },
  {
    key: 'checkout-block.Pakistan',
    code: 'PK',
  },
  {
    key: 'checkout-block.Palau',
    code: 'PW',
  },
  {
    key: 'checkout-block.Palestinian-Territory,-Occupied',
    code: 'PS',
  },
  {
    key: 'checkout-block.Panama',
    code: 'PA',
  },
  {
    key: 'checkout-block.Papua-New-Guinea',
    code: 'PG',
  },
  {
    key: 'checkout-block.Paraguay',
    code: 'PY',
  },
  {
    key: 'checkout-block.Peru',
    code: 'PE',
  },
  {
    key: 'checkout-block.Philippines',
    code: 'PH',
  },
  {
    key: 'checkout-block.Pitcairn',
    code: 'PN',
  },
  {
    key: 'checkout-block.Poland',
    code: 'PL',
  },
  {
    key: 'checkout-block.Portugal',
    code: 'PT',
  },
  {
    key: 'checkout-block.Puerto-Rico',
    code: 'PR',
  },
  {
    key: 'checkout-block.Qatar',
    code: 'QA',
  },
  {
    key: 'checkout-block.Reunion',
    code: 'RE',
  },
  {
    key: 'checkout-block.Romania',
    code: 'RO',
  },
  {
    key: 'checkout-block.Russian-Federation',
    code: 'RU',
  },
  {
    key: 'checkout-block.RWANDA',
    code: 'RW',
  },
  {
    key: 'checkout-block.Saint-Helena',
    code: 'SH',
  },
  {
    key: 'checkout-block.Saint-Kitts-and-Nevis',
    code: 'KN',
  },
  {
    key: 'checkout-block.Saint-Lucia',
    code: 'LC',
  },
  {
    key: 'checkout-block.Saint-Pierre-and-Miquelon',
    code: 'PM',
  },
  {
    key: 'checkout-block.Saint-Vincent-and-the-Grenadines',
    code: 'VC',
  },
  {
    key: 'checkout-block.Samoa',
    code: 'WS',
  },
  {
    key: 'checkout-block.San-Marino',
    code: 'SM',
  },
  {
    key: 'checkout-block.Sao-Tome-and-Principe',
    code: 'ST',
  },
  {
    key: 'checkout-block.Saudi-Arabia',
    code: 'SA',
  },
  {
    key: 'checkout-block.Senegal',
    code: 'SN',
  },
  {
    key: 'checkout-block.Serbia-and-Montenegro',
    code: 'CS',
  },
  {
    key: 'checkout-block.Seychelles',
    code: 'SC',
  },
  {
    key: 'checkout-block.Sierra-Leone',
    code: 'SL',
  },
  {
    key: 'checkout-block.Singapore',
    code: 'SG',
  },
  {
    key: 'checkout-block.Slovakia',
    code: 'SK',
  },
  {
    key: 'checkout-block.Slovenia',
    code: 'SI',
  },
  {
    key: 'checkout-block.Solomon-Islands',
    code: 'SB',
  },
  {
    key: 'checkout-block.Somalia',
    code: 'SO',
  },
  {
    key: 'checkout-block.South-Africa',
    code: 'ZA',
  },
  {
    key: 'checkout-block.South-Georgia-and-the-South-Sandwich-Islands',
    code: 'GS',
  },
  {
    key: 'checkout-block.Spain',
    code: 'ES',
  },
  {
    key: 'checkout-block.Sri-Lanka',
    code: 'LK',
  },
  {
    key: 'checkout-block.Sudan',
    code: 'SD',
  },
  {
    key: 'checkout-block.Suriname',
    code: 'SR',
  },
  {
    key: 'checkout-block.Svalbard-and-Jan-Mayen',
    code: 'SJ',
  },
  {
    key: 'checkout-block.Swaziland',
    code: 'SZ',
  },
  {
    key: 'checkout-block.Sweden',
    code: 'SE',
  },
  {
    key: 'checkout-block.Switzerland',
    code: 'CH',
  },
  {
    key: 'checkout-block.Syrian-Arab-Republic',
    code: 'SY',
  },
  {
    key: 'checkout-block.Taiwan,-Province-of-China',
    code: 'TW',
  },
  {
    key: 'checkout-block.Tajikistan',
    code: 'TJ',
  },
  {
    key: 'checkout-block.Tanzania,-United-Republic-of',
    code: 'TZ',
  },
  {
    key: 'checkout-block.Thailand',
    code: 'TH',
  },
  {
    key: 'checkout-block.Timor-Leste',
    code: 'TL',
  },
  {
    key: 'checkout-block.Togo',
    code: 'TG',
  },
  {
    key: 'checkout-block.Tokelau',
    code: 'TK',
  },
  {
    key: 'checkout-block.Tonga',
    code: 'TO',
  },
  {
    key: 'checkout-block.Trinidad-and-Tobago',
    code: 'TT',
  },
  {
    key: 'checkout-block.Tunisia',
    code: 'TN',
  },
  {
    key: 'checkout-block.Turkey',
    code: 'TR',
  },
  {
    key: 'checkout-block.Turkmenistan',
    code: 'TM',
  },
  {
    key: 'checkout-block.Turks-and-Caicos-Islands',
    code: 'TC',
  },
  {
    key: 'checkout-block.Tuvalu',
    code: 'TV',
  },
  {
    key: 'checkout-block.Uganda',
    code: 'UG',
  },
  {
    key: 'checkout-block.Ukraine',
    code: 'UA',
  },
  {
    key: 'checkout-block.United-Arab-Emirates',
    code: 'AE',
  },
  {
    key: 'checkout-block.United-Kingdom',
    code: 'GB',
  },
  {
    key: 'checkout-block.United-States',
    code: 'US',
  },
  {
    key: 'checkout-block.United-States-Minor-Outlying-Islands',
    code: 'UM',
  },
  {
    key: 'checkout-block.Uruguay',
    code: 'UY',
  },
  {
    key: 'checkout-block.Uzbekistan',
    code: 'UZ',
  },
  {
    key: 'checkout-block.Vanuatu',
    code: 'VU',
  },
  {
    key: 'checkout-block.Venezuela',
    code: 'VE',
  },
  {
    key: 'checkout-block.Viet-Nam',
    code: 'VN',
  },
  {
    key: 'checkout-block.Virgin-Islands,-British',
    code: 'VG',
  },
  {
    key: 'checkout-block.Virgin-Islands,-U.S.',
    code: 'VI',
  },
  {
    key: 'checkout-block.Wallis-and-Futuna',
    code: 'WF',
  },
  {
    key: 'checkout-block.Western-Sahara',
    code: 'EH',
  },
  {
    key: 'checkout-block.Yemen',
    code: 'YE',
  },
  {
    key: 'checkout-block.Zambia',
    code: 'ZM',
  },
  {
    key: 'checkout-block.Zimbabwe',
    code: 'ZW',
  },
];

export default countryCodes;

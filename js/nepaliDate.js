const NepaliDate = (() => {
  const now = new Date();
  let nums = {
    0: '०',
    1: '१',
    2: '२',
    3: '३',
    4: '४',
    5: '५',
    6: '६',
    7: '७',
    8: '८',
    9: '९'
  };
  const init = () => {
    const baseTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const nepaliTime = new Date(baseTime + 3600000 * 5.75); //convert to nepali time
    const todayForNepali =
      nepaliTime.getFullYear().toString() +
      '/' +
      (nepaliTime.getMonth() + 1).toString() +
      '/' +
      nepaliTime.getDate();
    const todayNepali = dateConverter(todayForNepali); // accepts yyyy/mm/dd
    const todayNepaliStr = `${todayNepali.ne.strDayOfWeek}, ${
      todayNepali.ne.strMonth
    } ${todayNepali.ne.day}, ${todayNepali.ne.year}`;
    $('.nepali-date').html(todayNepaliStr);
    nepaliCurrentTime();
    setInterval(() => {
      nepaliCurrentTime();
    }, 1000);
  };
  const nepaliCurrentTime = () => {
    const current = new Date();
    const baseTimeC = current.getTime() + current.getTimezoneOffset() * 60000;
    const nepaliTimeC = new Date(baseTimeC + 3600000 * 5.75);
    const amPM = () => {
      if (nepaliTimeC.getHours() >= 0 && nepaliTimeC.getHours() < 4) {
        return 'रात';
      }
      if (nepaliTimeC.getHours() >= 4 && nepaliTimeC.getHours() < 12) {
        return 'विहान';
      }
      if (nepaliTimeC.getHours() >= 12 && nepaliTimeC.getHours() < 17) {
        return 'दिन';
      }
      if (nepaliTimeC.getHours() >= 17 && nepaliTimeC.getHours() < 20) {
        return 'साँझ';
      }
      if (nepaliTimeC.getHours() >= 20 && nepaliTimeC.getHours() < 24) {
        return 'रात';
      }
    };
    const currentNepaliTimeStr = () => {
      const nepTime = nepaliTimeC.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      let arrNumNe = nepTime
        .toString()
        .split('')
        .map(function(ch) {
          if (ch === '.' || ch === ',') {
            return ch;
          }
          return nums[Number(ch)];
        });
      return arrNumNe.join('');
    };
    const timeStr = currentNepaliTimeStr();
    const npt = `${timeStr[0]}${timeStr[1]} : ${timeStr[2]}${
      timeStr[3]
    } ${amPM()}`;
    $('.nepali-time').html(npt);
  };
  const dateConverter = today => {
    function getNepDayOfWeek(inp, opts) {
      if (Object.prototype.toString.call(inp) === '[object Object]') {
        opts = inp;
        inp = undefined;
      }
      if (
        inp !== undefined &&
        Object.prototype.toString.call(inp) !== '[object Date]' &&
        typeof inp !== 'number'
      ) {
        return new TypeError('Expected a date object or a number');
      }

      if (typeof inp === 'number' && (inp < 0 || inp > 6)) {
        return new RangeError('Expected the value of inp between 0-6');
      }

      opts = opts || {};

      var data = {};
      data.ne = {
        full: [
          'आइतबार',
          'सोमबार',
          'मंगलबार',
          'बुधबार',
          'बिहिबार',
          'शुक्रबार',
          'शनिबार'
        ],
        short: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
        min: ['आ', 'सो', 'मं', 'बु', 'बि', 'शु', 'श']
      };
      data.en = {
        full: [
          'Aaitabaar',
          'Sombaar',
          'Mangalbaar',
          'Budhabaar',
          'Bihibaar',
          'Shukrabaar',
          'Shanibaar'
        ],
        short: ['Aaita', 'Som', 'Mangal', 'Budha', 'Bihi', 'Shukra', 'Shani'],
        min: ['Aai', 'So', 'Man', 'Bu', 'Bi', 'Shu', 'Sha']
      };

      var lang = 'ne';

      if (opts.lang === 'en') {
        lang = 'en';
      }

      if (inp === undefined) {
        inp = new Date().getDay();
      }

      if (Object.prototype.toString.call(inp) === '[object Date]') {
        inp = inp.getDay();
      }

      if (!opts.type) {
        var nepday = {
          full: data[lang].full[inp],
          short: data[lang].short[inp],
          min: data[lang].min[inp]
        };
        return nepday;
      }

      switch (opts.type) {
        case 'short':
          return data[lang].short[inp];
        case 'min':
          return data[lang].min[inp];
        default:
          return data[lang].full[inp];
      }

      // should never be here :D
      return null;
    }
    function getNepaliNumber(strNum) {
      var arrNumNe = strNum
        .toString()
        .split('')
        .map(function(ch) {
          if (ch === '.' || ch === ',') {
            return ch;
          }
          return nums[Number(ch)];
        });
      return arrNumNe.join('');
    }
    var defaults = {
        lang: 'ne', //possible values: ne for nepali text, en for english text
        //dateFormat: 'yyyy/mm/dd',     // not implemented yet
        monthFormat: 'full', //possible values: full for full name, short for short name
        daysFormat: 'min' //possible values: full for full name, short for short name and min for minified name
      },
      ne = {
        monthsName: [
          'बैशाख',
          'जेष्ठ',
          'आषाढ',
          'श्रावण',
          'भाद्र',
          'आश्विन',
          'कार्तिक',
          'मंसिर',
          'पौष',
          'माघ',
          'फाल्गुन',
          'चैत्र'
        ],
        monthsShortName: [
          'बै',
          'जे',
          'आषा',
          'श्रा',
          'भा',
          'आश',
          'का',
          'मं',
          'पौ',
          'मा',
          'फा',
          'चै'
        ]
      },
      en = {
        monthsName: [
          'Baisakh',
          'Jestha',
          'Ashadh',
          'Shrawan',
          'Bhadra',
          'Ashwin',
          'Kartik',
          'Mangsir',
          'Paush',
          'Mangh',
          'Falgun',
          'Chaitra'
        ],
        monthsShortName: [
          'Bai',
          'Je',
          'As',
          'Shra',
          'Bha',
          'Ash',
          'Kar',
          'Mang',
          'Pau',
          'Ma',
          'Fal',
          'Chai'
        ]
      },
      engDaysName = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      engDaysShortName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      engMonthsName = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      engMonthsShortName = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      daysInYear = 365,
      minMonth = 1,
      minDays = 1,
      maxMonth = 12,
      maxDays = 32,
      nums = {
        0: '०',
        1: '१',
        2: '२',
        3: '३',
        4: '४',
        5: '५',
        6: '६',
        7: '७',
        8: '८',
        9: '९'
      },
      base_ad = { year: 2017, month: 2, day: 11, dayOfWeek: 6 }, // dayOfWeek: 0 for sunday, 1 for monday and so on
      base_bs = { year: 2073, month: 10, day: 29, dayOfWeek: 6 },
      calendar_data = {
        '1978': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1979': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '1980': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '1981': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
        '1982': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1983': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '1984': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '1985': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
        '1986': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1987': [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '1988': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '1989': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1990': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1991': [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '1992': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
        '1993': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1994': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1995': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
        '1996': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
        '1997': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1998': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '1999': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2000': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
        '2001': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2002': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2003': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2004': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
        '2005': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2006': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2007': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2008': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
        '2009': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2010': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2011': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2012': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
        '2013': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2014': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2015': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2016': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
        '2017': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2018': [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2019': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
        '2020': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2021': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2022': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
        '2023': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
        '2024': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2025': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2026': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2027': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
        '2028': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2029': [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
        '2030': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2031': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
        '2032': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2033': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2034': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2035': [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
        '2036': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2037': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2038': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2039': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
        '2040': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2041': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2042': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2043': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
        '2044': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2045': [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2046': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2047': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2048': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2049': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
        '2050': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
        '2051': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2052': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2053': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
        '2054': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
        '2055': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2056': [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365],
        '2057': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2058': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365],
        '2059': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2060': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2061': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2062': [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365],
        '2063': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2064': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2065': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2066': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365],
        '2067': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2068': [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2069': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2070': [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365],
        '2071': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2072': [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365],
        '2073': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366],
        '2074': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2075': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2076': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
        '2077': [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366],
        '2078': [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2079': [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365],
        '2080': [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365],
        '2081': [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366],
        '2082': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
        '2083': [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
        '2084': [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365],
        '2085': [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366],
        '2086': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
        '2087': [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
        '2088': [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365],
        '2089': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
        '2090': [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365],
        '2091': [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366],
        '2092': [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366]
      };

    /*
     * gathered data below; if anybody can validate below, thanks!
     * A hacky way is to iterate for the unknown dates is to use daysPerYear and loop through
     *
     '2093': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
     '2094': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
     '2095': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30, 366 ],
     '2096': [ 30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 364 ],
     '2097': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
     '2098': [ 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31, 366 ],
     '2099': [ 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30, 365 ],
     '2100': [ 31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30, 365 ]
     */

    function countDaysInYear(year) {
      if (typeof calendar_data[year] === 'undefined') {
        return daysInYear;
      }

      return calendar_data[year][12];
    }

    function isLeapYear(year) {
      return daysInYear !== countDaysInYear(year);
    }

    function countADDays(date) {
      var dayCount = 0,
        i = 0;
      var dateArr = date.split('/').map(function(str) {
        return Number(str);
      });

      var dateObj = {
        year: dateArr[0],
        month: dateArr[1] - 1,
        day: dateArr[2]
      };

      var date1 = new Date(base_ad.year, base_ad.month - 1, base_ad.day);
      var date2 = new Date(dateObj.year, dateObj.month, dateObj.day);
      var timeDiff = date2.getTime() - date1.getTime();
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return { diffDays: diffDays, dateInAd: date2 };
    }

    function offsetBSDays(dayData) {
      var dayCount = dayData.diffDays;
      var dateInAd = dayData.dateInAd;
      var bs_date = JSON.parse(JSON.stringify(base_bs));
      if (dayCount >= 0) {
        bs_date.day += dayCount;
        while (bs_date.day > calendar_data[bs_date.year][bs_date.month - 1]) {
          bs_date.day -= calendar_data[bs_date.year][bs_date.month - 1];
          bs_date.month++;
          if (bs_date.month > 12) {
            bs_date.year++;
            bs_date.month = 1;
          }
        }
      } else {
        dayCount = Math.abs(dayCount);
        while (dayCount >= 0) {
          if (dayCount < calendar_data[bs_date.year][bs_date.month - 1]) {
            dayCount =
              calendar_data[bs_date.year][bs_date.month - 1] - dayCount;
            break;
          }
          dayCount -= calendar_data[bs_date.year][bs_date.month - 1];
          bs_date.month--;
          if (bs_date.month === 0) {
            bs_date.year--;
            bs_date.month = 12;
          }
        }
        bs_date.day = dayCount;
      }
      var month = dateInAd.getMonth();
      var dayOfWeek = dateInAd.getDay();
      var npDayOfWeek = getNepDayOfWeek(dayOfWeek);
      var enDayOfWeek = getNepDayOfWeek(dayOfWeek, { lang: 'en' });

      var totalDays = calendar_data[bs_date.year][bs_date.month - 1];
      var dateObj = {
        ne: {
          year: getNepaliNumber(bs_date.year),
          month: getNepaliNumber(bs_date.month),
          day: getNepaliNumber(bs_date.day),
          strMonth: ne.monthsName[bs_date.month - 1],
          strShortMonth: ne.monthsShortName[bs_date.month - 1],
          dayOfWeek: getNepaliNumber(dayOfWeek),
          strDayOfWeek: npDayOfWeek['full'],
          strShortDayOfWeek: npDayOfWeek['short'],
          strMinDayOfWeek: npDayOfWeek['min'],
          totalDaysInMonth: getNepaliNumber(totalDays)
        },
        en: {
          year: bs_date.year,
          month: bs_date.month,
          day: bs_date.day,
          strMonth: en.monthsName[bs_date.month - 1],
          strShortMonth: en.monthsShortName[bs_date.month - 1],
          dayOfWeek: dayOfWeek,
          strDayOfWeek: enDayOfWeek['full'],
          strShortDayOfWeek: enDayOfWeek['short'],
          strMinDayOfWeek: enDayOfWeek['min'],
          totalDaysInMonth: totalDays
        }
      };
      return dateObj;
    }

    return offsetBSDays(countADDays(today));
    // end of dateConverter
  };
  return {
    init: init
  };
})();
$(document).ready(function() {
  NepaliDate.init();
});

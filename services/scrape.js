const cheerio = require('cheerio');
const axios = require('axios');

const Scrapper = async (target, page) => {
    const options = {
        url: page,
        transformResponse: body => cheerio.load(body),
        responseType: 'text',
        method: 'get',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        },
    };

    let result = [];

    try {
        const { data: $} = await axios(options);
 
        $('.prc').each((i, e) => {
            var allListElements = $( ".old" );
            const t = $(e).next().find(allListElements).text() || $(e).attr('data-oprc');

            if (t != undefined) {
                const current = Number($(e).text().replace(/[\s\,\₦]/g, ''));
                const old = Number(t.replace(/[\s\,\₦]/g, ''));

                const discount = Math.floor((old - current) / old * 100);
                const name = $(e).parent().text().substring(0, $(e).parent().text().indexOf('₦'));
                const href = $(e).parent().attr('href');
                const next = $( "a[aria-label='Next Page']" ).attr('href');
                
                if (discount >= target) {
                    result.push({ discount, href, name, old, current, next })
                } 
            }
        })
    } catch (error) {
        throw Error(error)
    }

    return result.sort((a, b) => b.discount - a.discount);
}

module.exports = Scrapper;
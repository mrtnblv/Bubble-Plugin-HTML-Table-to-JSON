async function(properties, context) {
    const cheerio = require('cheerio');

    let {htmltable} = properties;

    try {
        const $ = cheerio.load(htmltable);
        let jsonData = [];
        let headers = [];

        $('table thead th').each((index, element) => {
            headers.push($(element).text().trim());
        });

        $('table tbody tr').each((index, element) => {
            let rowData = {};
            $(element).find('td').each((tdIndex, tdElement) => {
                rowData[headers[tdIndex]] = $(tdElement).text().trim();
            });
            jsonData.push(rowData);
        });

        return {
            json: JSON.stringify(jsonData)
        };

    } catch (e) {
        return {
            error: e.message
        };
    }
}
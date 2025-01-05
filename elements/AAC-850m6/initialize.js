function(instance, context) {

    instance.data.run = (properties) => {
        let { htmltable } = properties;
        let jsonData = [];

        try {
            if (!htmltable || typeof htmltable.trim !== 'function') {
                throw new Error('Invalid HTML table input');
            }

            htmltable = htmltable.trim();

            // Function to parse HTML table and convert to JSON
            const parseTableToJSON = (html) => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(html, 'text/html');
                let table = doc.querySelector('table');
                if (!table) {
                    throw new Error('No table found in HTML input');
                }
                let headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
                let rows = Array.from(table.querySelectorAll('tbody tr'));
                let data = rows.map(row => {
                    let cells = row.querySelectorAll('td');
                    let rowData = {};
                    cells.forEach((cell, index) => {
                        rowData[headers[index]] = cell.textContent.trim();
                    });
                    return rowData;
                });
                return data;
            };

            jsonData = parseTableToJSON(htmltable);

            // Compressed JSON string
            let compressedJSON = JSON.stringify(jsonData);
            // Beautified JSON string
            let beautifiedJSON = JSON.stringify(jsonData, null, 2);

            // Publish both versions
            instance.publishState('json', compressedJSON);
            instance.publishState('beautified_json', beautifiedJSON);

        } catch (e) {
            console.error('Error during conversion:', e);
            instance.publishState('error', e.message);
        }
    }
}

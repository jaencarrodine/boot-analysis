const {GoogleSpreadsheet} = require('google-spreadsheet');

//const creds = require('./boot-test-site-a5ca4d5a9937.json'); 



module.exports = {

    getSheet: async function(sheetName) {
        const doc = new GoogleSpreadsheet('1yFVV8un4HNbWMf1ImSbLJKor2P0j1wmoyUt1SaZWd0k');
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        
        return sheet;
    },

    extractData: async function(sheetName) {
        const doc = new GoogleSpreadsheet('1yFVV8un4HNbWMf1ImSbLJKor2P0j1wmoyUt1SaZWd0k');
        const sheet = await this.getSheet(sheetName);
        const rows = await sheet.getRows();
        const data = [];
        rows.forEach(row => {
            let rowData = {
                load: row.load,
                toe_left: row['toe left'],
                toe_right: row['toe right'],
                heel_left: row['heel left'],
                heel_right: row['heel right'],
            };

            data.push(rowData);
        });
        console.log(data);
        return data;
    }
}

module.exports.extractData('testboot')
// export data as csv
import fs from 'fs';

const FILE_OUTPUT = 'writeTo.csv'

const data = 'this is data';

const objectArray = [
    {
        "address": "0x420c9967c6324cb4d391c0b48393230db2ddb1d6",
        "balance": "1"
    }
]

async function writeToFile(data) {
    const fileName = FILE_OUTPUT.split('.')[0];
    const fileExtension = FILE_OUTPUT.split('.')[1]
    const output = `${fileName}_testDoang_at_lmao.${fileExtension}`;
    fs.writeFileSync(output, data);
    // fs.writeFileSync(output, (JSON.stringify(pushedOwnerData, null, 4)));
    // const exportedJSON = JSON.parse(fs.readFileSync(output));
    // console.log(`${(newOwnerSet.length === ownersJSON.owners.length) ? (`✅ ownerSet length verified (${newOwnerSet.length})`) : (`🛑 ownerSet length mismatch!!!`)}`);
    // console.log(`${(exportedJSON.length === ownersJSON.owners.length) ? (`✅ exported owners length verified (${newOwnerSet.length})`) : (`🛑 exported owners length mismatch!!!`)}`);
    console.log(`🌈 data saved successfully to ${output} 🌈`);
};

writeToFile(objectArray);
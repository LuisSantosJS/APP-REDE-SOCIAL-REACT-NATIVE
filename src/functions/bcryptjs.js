import bcrypt from 'react-native-bcrypt';
async function Compare(code, hash) {
    const res = bcrypt.compareSync(`${code}`, `${hash}`);
    return res;
}
export default Compare;
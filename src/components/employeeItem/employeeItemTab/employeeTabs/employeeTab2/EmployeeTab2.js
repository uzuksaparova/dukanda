import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setStockPermissionsSend } from '../../../../../redux/actions/employeeActions';
import EmptyComponent from '../../../../emptyComponent/EmptyComponent';
import ErrorComponent from '../../../../errorComponent/ErrorComponent';
import Loading from '../../../../Loading';
import SearchComponent from '../../../../searchComponent/SearchComponent';
import TableComponent from '../../../../tableComponent/TableComponent';
import './employeeTab2.scss';

function EmployeeTab2(props) {
    const { stockPermissionsSend, setStockPermissionsSend } = props;
    const [afterSearch, setAfterSearch] = useState(stockPermissionsSend);
    const depos = [
        {
            id: 1257,
            nr: 155,
            name: 'HYTAY TM LOKASYON',
            type: 'available',
        },
        {
            id: 1258,
            nr: 156,
            name: 'HYTAY UZ LOKASYON',
            type: 'available',
        },
        {
            id: 1215,
            nr: 201,
            name: 'KONTEYNER DEPO',
            type: 'available',
        },
        {
            id: 1216,
            nr: 202,
            name: 'ASGABAT 2.EL DEPO',
            type: 'available',
        },
        {
            id: 1219,
            nr: 205,
            name: 'ASGABAT TAKIMSIZLAR DEPO',
            type: 'available',
        },
        {
            id: 1221,
            nr: 290,
            name: 'ASGABAT TOPTANCI DEPO',
            type: 'available',
        },
        {
            id: 1222,
            nr: 300,
            name: 'MARY MARKET',
            type: 'available',
        },
        {
            id: 1233,
            nr: 100,
            name: 'MERKEZ',
            type: 'available',
        },
        {
            id: 1259,
            nr: 157,
            name: 'HYTAY KG LOKASYON',
            type: 'available',
        },
        {
            id: 1260,
            nr: 159,
            name: 'HYTAY SABIT KIYMET DEPO',
            type: 'available',
        },
        {
            id: 1261,
            nr: 165,
            name: 'EYRAN TM LOKASYON',
            type: 'available',
        },
        {
            id: 1262,
            nr: 188,
            name: 'UZ SANOW DEPO',
            type: 'available',
        },
        {
            id: 1365,
            nr: 800,
            name: 'CLOP MARKET (UZ)',
            type: 'available',
        },
        {
            id: 1366,
            nr: 801,
            name: 'CLOP SATYS DEPO (UZ)',
            type: 'available',
        },
        {
            id: 1368,
            nr: 127,
            name: 'GUMRUK TEKJE DEPO (12)',
            type: 'available',
        },
        {
            id: 1371,
            nr: 210,
            name: 'ASGABAT STEND DEPO',
            type: 'available',
        },
        {
            id: 1244,
            nr: 128,
            name: 'GD SANOW DEPO',
            type: 'available',
        },
        {
            id: 1245,
            nr: 119,
            name: 'AD SABIT KIYMET DEPO',
            type: 'available',
        },
        {
            id: 1246,
            nr: 129,
            name: 'GD SABIT KIYMET DEPO',
            type: 'available',
        },
        {
            id: 1247,
            nr: 500,
            name: 'ANEW MARKET',
            type: 'available',
        },
        {
            id: 1248,
            nr: 503,
            name: 'ANEW ZAYIAT DEPO',
            type: 'available',
        },
        {
            id: 1249,
            nr: 505,
            name: 'ANEW TAKIMSIZLAR DEPO',
            type: 'available',
        },
        {
            id: 1250,
            nr: 509,
            name: 'ANEW SABIT KIYMET DEPO',
            type: 'available',
        },
        {
            id: 1251,
            nr: 140,
            name: 'TURKIYE DEPO',
            type: 'available',
        },
        {
            id: 1252,
            nr: 145,
            name: 'TURKIYE TM LOKASYON',
            type: 'available',
        },
        {
            id: 1253,
            nr: 146,
            name: 'TURKIYE UZ LOKASYON',
            type: 'available',
        },
        {
            id: 1263,
            nr: 181,
            name: 'UZ SATIS DEPO',
            type: 'available',
        },
        {
            id: 1271,
            nr: 170,
            name: 'GRESYA DEPO',
            type: 'available',
        },
        {
            id: 1272,
            nr: 175,
            name: 'GRESYA TM LOKASYON',
            type: 'available',
        },
        {
            id: 1273,
            nr: 299,
            name: 'TOPTANCI SABIT KIYMET DEPO',
            type: 'available',
        },
        {
            id: 1275,
            nr: 108,
            name: 'URETIM DEPO',
            type: 'amount',
        },
        {
            id: 1279,
            nr: 900,
            name: 'MEBEL SEH',
            type: 'amount',
        },
        {
            id: 1280,
            nr: 909,
            name: 'MEBEL SEH SABIT KIYMET',
            type: 'amount',
        },
        {
            id: 1285,
            nr: 600,
            name: 'PROMZONA MARKET',
            type: 'amount',
        },
        {
            id: 1286,
            nr: 609,
            name: 'PROMZONA SABIT KIYMET',
            type: 'amount',
        },
        {
            id: 1347,
            nr: 169,
            name: 'EYRAN SABIT KIYMET DEPO',
            type: 'amount',
        },
        {
            id: 1349,
            nr: 130,
            name: 'AKTAM KULLANIM DIŞI-720',
            type: 'amount',
        },
        {
            id: 1351,
            nr: 700,
            name: 'AYAZHAN TEKJE MARKET',
            type: 'amount',
        },
        {
            id: 1352,
            nr: 709,
            name: 'AYAZHAN SABIT KIYMET DEPO',
            type: 'amount',
        },
        {
            id: 1254,
            nr: 147,
            name: 'TURKIYE GR LOKASYON',
            type: 'amount',
        },
        {
            id: 1255,
            nr: 150,
            name: 'HYTAY DEPO',
            type: 'amount',
        },
        {
            id: 1256,
            nr: 149,
            name: 'TURKIYE SABIT KIYMET DEPO',
            type: 'amount',
        },
        {
            id: 1214,
            nr: 200,
            name: 'ASGABAT MARKET',
            type: 'amount',
        },
        {
            id: 1217,
            nr: 203,
            name: 'ASGABAT ZAYIAT DEPO',
            type: 'amount',
        },
        {
            id: 1218,
            nr: 204,
            name: 'ASGABAT URETIM DEPO',
            type: 'amount',
        },
        {
            id: 1220,
            nr: 209,
            name: 'ASGABAT SABIT KIYMET DEPO',
            type: 'amount',
        },
        {
            id: 1223,
            nr: 302,
            name: 'MARY 2.EL DEPO',
            type: 'amount',
        },
        {
            id: 1224,
            nr: 303,
            name: 'MARY ZAYIAT DEPO',
            type: 'noAccess',
        },
        {
            id: 1225,
            nr: 304,
            name: 'MARY URETIM DEPO',
            type: 'noAccess',
        },
        {
            id: 1226,
            nr: 305,
            name: 'MARY TAKIMSIZLAR DEPO',
            type: 'noAccess',
        },
        {
            id: 1227,
            nr: 309,
            name: 'MARY SABIT KIYMET DEPO',
            type: 'noAccess',
        },
        {
            id: 1228,
            nr: 400,
            name: 'BUZMEYIN MARKET',
            type: 'noAccess',
        },
        {
            id: 1229,
            nr: 402,
            name: 'BUZMEYIN 2.EL DEPO',
            type: 'noAccess',
        },
        {
            id: 1230,
            nr: 403,
            name: 'BUZMEYIN ZAYIAT DEPO',
            type: 'noAccess',
        },
        {
            id: 1231,
            nr: 405,
            name: 'BUZMEYIN TAKIMSIZLAR DEPO',
            type: 'noAccess',
        },
        {
            id: 1232,
            nr: 409,
            name: 'BUZMEYIN SABIT KIYMET DEPO',
            type: 'noAccess',
        },
        {
            id: 1234,
            nr: 109,
            name: 'MERKEZ SABIT KIYMET DEPO',
            type: 'noAccess',
        },
        {
            id: 1235,
            nr: 111,
            name: 'ANA DEPO',
            type: 'noAccess',
        },
        {
            id: 1236,
            nr: 121,
            name: 'GUMRUK DEPO',
            type: 'noAccess',
        },
        {
            id: 1237,
            nr: 112,
            name: 'AD 2.EL DEPO',
            type: 'noAccess',
        },
        {
            id: 1238,
            nr: 122,
            name: 'GD 2.EL DEPO',
            type: 'noAccess',
        },
        {
            id: 1239,
            nr: 113,
            name: 'AD ZAYIAT DEPO',
            type: 'noAccess',
        },
        {
            id: 1240,
            nr: 123,
            name: 'GD ZAYIAT DEPO',
            type: 'noAccess',
        },
        {
            id: 1241,
            nr: 115,
            name: 'AD TAKIMSIZLAR DEPO',
            type: 'noAccess',
        },
        {
            id: 1242,
            nr: 125,
            name: 'GD TAKIMSIZLAR DEPO',
            type: 'noAccess',
        },
        {
            id: 1243,
            nr: 118,
            name: 'AD SANOW DEPO',
            type: 'noAccess',
        },
        {
            id: 1372,
            nr: 720,
            name: 'AKTAM TEKJE MARKET',
            type: 'noAccess',
        },
        {
            id: 1373,
            nr: 729,
            name: 'AKTAM TEKJE SABIT KIYMET DEPO',
            type: 'noAccess',
        },
        {
            id: 1374,
            nr: 741,
            name: 'GAMI HAMMADDE DEPO',
            type: 'noAccess',
        },
        {
            id: 1375,
            nr: 742,
            name: 'GAMI URETIM DEPO',
            type: 'noAccess',
        },
        {
            id: 1376,
            nr: 743,
            name: 'GAMI MAMUL DEPO',
            type: 'noAccess',
        },
        {
            id: 1377,
            nr: 749,
            name: 'GAMI SABIT KIYMET DEPO',
            type: 'noAccess',
        },
        {
            id: 1378,
            nr: 740,
            name: 'GAMI TEKJE SEHI',
            type: 'available',
        },
        {
            id: 1379,
            nr: 126,
            name: 'GUMRUK TJ SABIT KIYMET DEPO ',
            type: 'available',
        },
        {
            id: 1383,
            nr: 711,
            name: 'TEKJE JYGYLDYK DEPO',
            type: 'available',
        },
        {
            id: 1386,
            nr: 760,
            name: 'MARY TEKJE MARKET',
            type: 'available',
        },
        {
            id: 1387,
            nr: 769,
            name: 'MARY TEKJE SABIT KIYMET DEPO',
            type: 'available',
        },
        {
            id: 1391,
            nr: 763,
            name: 'MARY TEKJE ZAYIAT DEPO',
            type: 'available',
        },
        {
            id: 1392,
            nr: 744,
            name: 'GAMI YARI MAMUL DEPO',
            type: 'available',
        },
    ];
    const [searchValue, setSearchValue] = useState('');
    const [deposData, setDeposData] = useState({
        data: depos,
        isError: false,
    });
    // const [noData, setNoData] = useState(false);
    const { isError, noData } = stockPermissionsSend;

    const columns = [
        { id: 'name', label: 'Depo ady', minWidth: 100 },

        {
            id: 'nr',
            label: 'Depo NR',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'access',
            label: 'Yetki',
            minWidth: 50,
            align: 'left',
        },
        {
            id: 'amount',
            label: 'Miktar yetki',
            minWidth: 50,
            align: 'left',
        },
    ];

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        let tempDepoData = stockPermissionsSend.data;
        tempDepoData = stockPermissionsSend.data.filter((depo) => {
            return (
                depo.nr.toString().includes(e.target.value) ||
                depo.name.toLowerCase().includes(e.target.value)
            );
        });
        setAfterSearch({ ...afterSearch, data: tempDepoData });
        setStockPermissionsSend({
            ...stockPermissionsSend,
            noData: tempDepoData.length ? false : true,
        });
    };
    const onSearchIconClick = () => {
        console.log('searched');
    };

    const handleAccessChange = (e, row) => {
        e.stopPropagation();
        let tempAfterSearchDeposData = afterSearch.data;
        let tempDeposData = stockPermissionsSend.data;

        if (e.target.name === 'access') {
            if (e.target.checked) {
                tempDeposData = tempDeposData.map((depo) => {
                    if (depo.id === row.id) {
                        return { ...row, type: 'available' };
                    }
                    return depo;
                });
                tempAfterSearchDeposData = tempAfterSearchDeposData.map(
                    (depo) => {
                        if (depo.id === row.id) {
                            return { ...row, type: 'available' };
                        }
                        return depo;
                    }
                );
            } else {
                tempDeposData = tempDeposData.map((depo) => {
                    if (depo.id === row.id) {
                        return { ...row, type: '' };
                    }
                    return depo;
                });
                tempAfterSearchDeposData = tempAfterSearchDeposData.map(
                    (depo) => {
                        if (depo.id === row.id) {
                            return { ...row, type: '' };
                        }
                        return depo;
                    }
                );
            }
        } else {
            if (e.target.checked) {
                tempAfterSearchDeposData = tempAfterSearchDeposData.map(
                    (depo) => {
                        if (depo.id === row.id) {
                            return { ...row, type: 'amount' };
                        }
                        return depo;
                    }
                );
                tempDeposData = tempDeposData.map((depo) => {
                    if (depo.id === row.id) {
                        return { ...row, type: 'amount' };
                    }
                    return depo;
                });
            } else {
                tempDeposData = tempDeposData.map((depo) => {
                    if (depo.id === row.id) {
                        return { ...row, type: 'available' };
                    }
                    return depo;
                });
                tempAfterSearchDeposData = tempAfterSearchDeposData.map(
                    (depo) => {
                        if (depo.id === row.id) {
                            return { ...row, type: 'available' };
                        }
                        return depo;
                    }
                );
            }
        }

        setStockPermissionsSend({
            ...stockPermissionsSend,
            data: tempDeposData,
        });
        setAfterSearch({
            ...stockPermissionsSend,
            data: tempAfterSearchDeposData,
        });
    };

    const handleRowValue = (column, row) => {
        console.log(row.type, row.type === 'available');
        return column.id === 'access' ? (
            <FormControlLabel
                sx={{ height: '15px !important' }}
                control={
                    <Checkbox
                        checked={
                            row.type === 'amount' || row.type === 'available'
                        }
                        onChange={(e) => handleAccessChange(e, row)}
                        name="access"
                    />
                }
                label={`${
                    row.type === 'amount' || row.type === 'available'
                        ? 'Bar'
                        : 'Ýok'
                }`}
            />
        ) : column.id === 'amount' ? (
            <FormControlLabel
                sx={{ height: '15px !important' }}
                control={
                    <Checkbox
                        checked={row.type === 'amount'}
                        onChange={(e) => handleAccessChange(e, row)}
                        name="amount"
                    />
                }
                label={`${row.type === 'amount' ? 'Bar' : 'Ýok'}`}
            />
        ) : (
            row[column.id]
        );
    };

    return (
        <div className="employee-tab2">
            <SearchComponent
                searchValue={searchValue}
                handleInputChange={handleInputChange}
                onSearchIconClick={onSearchIconClick}
            />
            {!stockPermissionsSend.data.length ? (
                isError ? (
                    <ErrorComponent />
                ) : noData ? (
                    <EmptyComponent />
                ) : (
                    <Loading />
                )
            ) : (
                <TableComponent
                    columns={columns}
                    data={afterSearch}
                    handleRowValue={handleRowValue}
                    lazy={false}
                    inTab={false}
                />
            )}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        stockPermissionsSend: state.stockPermissionsSend,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setStockPermissionsSend: (data) =>
            dispatch(setStockPermissionsSend(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTab2);

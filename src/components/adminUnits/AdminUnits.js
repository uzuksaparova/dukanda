import React, { useEffect } from 'react';
import './adminUnits.scss';
import Loading from '../Loading';
import { fetchUnitsInfo } from '../../functions';
import { connect } from 'react-redux';
import { setSidebarSearchValue } from '../../redux/actions/sidebarActions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableComponent from '../tableComponent/TableComponent';

const columns = [
    {
        id: 'code',
        label: 'Kod',
        minWidth: 100,
        align: 'center',
    },
    { id: 'name', label: 'Ady', minWidth: 100, align: 'left' },

    {
        id: 'codeTm',
        label: 'Tm kody',
        minWidth: 100,
        align: 'center',
    },
    // {
    //     id: 'codeTr',
    //     label: 'Tr kody',
    //     minWidth: 100,
    //     align: 'center',
    // },
    {
        id: 'codeRu',
        label: 'Ru kody',
        minWidth: 100,
        align: 'center',
    },
    // {
    //     id: 'codeEng',
    //     label: 'Eng kody',
    //     minWidth: 100,
    //     align: 'center',
    // },
    {
        id: 'nameTm',
        label: 'Tm Ady',
        minWidth: 100,
        align: 'center',
    },
    // {
    //     id: 'nameTr',
    //     label: 'Tr Ady',
    //     minWidth: 100,
    //     align: 'center',
    // },
    {
        id: 'nameRu',
        label: 'Ru Ady',
        minWidth: 100,
        align: 'center',
    },
    // {
    //     id: 'nameEng',
    //     label: 'Eng Ady',
    //     minWidth: 100,
    //     align: 'center',
    // },
];

function AdminUnits(props) {
    const { unitsData, setSidebarSearchValue, isError } = props;
    const { noData, data, isEnd } = unitsData;

    useEffect(() => {
        setSidebarSearchValue('');
        if (!data.length) {
            fetchUnitsInfo(true);
        }
        // eslint-disable-next-line
    }, []);

    const handleRowValue = (column, row) => {
        return row[column.id];
    };
    const handleFetchMore = () => {
        fetchUnitsInfo();
    };

    return (
        <div className={`units`}>
            {!data.length ? (
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
                    data={unitsData}
                    handleRowValue={handleRowValue}
                    handleFetchMore={handleFetchMore}
                    rowPath="units"
                    isRowClickable={true}
                />
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        unitsData: state.unitsData,
        isError: state.isError.isError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUnits);

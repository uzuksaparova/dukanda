import React, { useEffect } from 'react';
import './adminDivisions.scss';
import Loading from '../Loading';
import { fetchDivisionsInfo } from '../../functions';
import {
    setDivisionData,
    setDivisionItemSendInfo,
} from '../../redux/actions/divisionActions';
import { connect } from 'react-redux';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import AddItemComponent from '../addItemComponent/AddItemComponent';
import TableComponent from '../tableComponent/TableComponent';

const columns = [
    { id: 'code', label: 'Kody', minWidth: 50 },
    { id: 'nr', label: 'NR', minWidth: 50 },

    {
        id: 'name',
        label: 'Ady',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'address',
        label: 'Adresi',
        minWidth: 170,
        align: 'left',
    },
];

function AdminDivisions(props) {
    const { setDivisionData, divisionsData, isError, setDivisionItemSendInfo } =
        props;

    const { data, noData } = divisionsData;

    useEffect(() => {
        if (!data.length) {
            fetchDivisionsInfo(true);
        }
        // eslint-disable-next-line
    }, []);

    const handleDivisionAdd = () => {
        setDivisionItemSendInfo({
            active: false,
            address: '',
            clientId: '',
            code: '',
            id: '',
            image: '',
            name: '',
            nr: '',
        });
        setDivisionData({});
    };

    const handleRowValue = (column, row) => {
        return row[column.id];
    };
    const handleFetchMore = () => {
        fetchDivisionsInfo();
    };

    return (
        <div className={`divisions`}>
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
                    data={divisionsData}
                    handleRowValue={handleRowValue}
                    handleFetchMore={handleFetchMore}
                    rowPath="divisions"
                    isRowClickable={true}
                />
            )}
            <AddItemComponent
                disabledValue="updateDivision"
                onClickHandler={handleDivisionAdd}
                pathname="divisions/0"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        divisionsData: state.divisionsData,
        isError: state.isError.isError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDivisionData: (data) => dispatch(setDivisionData(data)),
        setDivisionItemSendInfo: (info) =>
            dispatch(setDivisionItemSendInfo(info)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDivisions);

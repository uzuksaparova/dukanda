import React, { useEffect, useState } from 'react';
import './groups.scss';
import Loading from '../Loading';
import { useLocation } from 'react-router-dom';
import brokenImage from '../../images/brokenImage.png';
import { BACKEND_URL, fetchGroupsInfo } from '../../functions';
import { setSidebarSearchValue } from '../../redux/actions/sidebarActions';
import { connect } from 'react-redux';
import { setGroupSendInfo } from '../../redux/actions/groupActions';
import ErrorComponent from '../errorComponent/ErrorComponent';
import EmptyComponent from '../emptyComponent/EmptyComponent';
import TableComponent from '../tableComponent/TableComponent';

function Groups(props) {
    const { groupsData, setSidebarSearchValue, isError, setGroupSendInfo } =
        props;
    const { isEnd, noData, data } = groupsData;
    const useeLocation = useLocation();
    const pathname = useeLocation.pathname.includes('subgroups')
        ? 'subgroups'
        : 'mainGroups';
    const [columns, setColumns] = useState([
        {
            id: 'image',
            label: 'Suraty',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'name',
            label: 'Ady',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'namePluralTm',
            label: 'Tm ady',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'namePluralRu',
            label: 'Ru ady',
            minWidth: 100,
            align: 'left',
        },
    ]);

    useEffect(() => {
        setGroupSendInfo({
            image: 'all',
            nameSingularTm: 'all',
            nameSingularTr: 'all',
            nameSingularRu: 'all',
            nameSingularEng: 'all',
            namePluralTm: 'all',
            namePluralTr: 'all',
            namePluralRu: 'all',
            namePluralEng: 'all',
            limit: 15,
            offset: 0,
            search: '',
            active: true,
        });
        setSidebarSearchValue('');
        !data.length &&
            fetchGroupsInfo(
                true,
                `/admin/${pathname === 'subgroups' ? 'lastGroups' : pathname}`
            );
        if (pathname === 'subgroups') {
            setColumns([
                ...columns,
                {
                    id: 'mainGroup',
                    label: 'Esasy grupbasy',
                    minWidth: 100,
                    align: 'left',
                },
            ]);
        }
        // eslint-disable-next-line
    }, [useeLocation]);
    const fetchGroupsInfoWithUrl = () => {
        fetchGroupsInfo(
            false,
            `/admin/${pathname === 'subgroups' ? 'lastGroups' : pathname}`
        );
    };
    const handleImageCell = (row) => {
        return (
            <img
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = brokenImage;
                }}
                alt={row.name}
                src={`${BACKEND_URL}/images/groups/${row?.image}`}
            />
        );
    };

    const handleRowValue = (column, row) => {
        return column.id === 'image'
            ? handleImageCell(row)
            : column.id === 'mainGroup'
            ? row?.mainGroup?.name
            : row[column.id];
    };

    return (
        <div className={`groups`} id="groups">
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
                    data={groupsData}
                    handleRowValue={handleRowValue}
                    handleFetchMore={fetchGroupsInfoWithUrl}
                    rowPath={`groups/${pathname}`}
                    isRowClickable={true}
                    withImage={true}
                    handleImageCell={handleImageCell}
                />
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        groupsData: state.groupsData,
        isError: state.isError.isError,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSidebarSearchValue: (value) =>
            dispatch(setSidebarSearchValue(value)),
        setGroupSendInfo: (info) => dispatch(setGroupSendInfo(info)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Groups);

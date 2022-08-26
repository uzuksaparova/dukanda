import React from 'react';
import { useMediaQuery } from 'react-responsive';
import DesktopWithoutLazy from './desktopWithoutLazy/DesktopWithoutLazy';
import MobileWithImage from './mobileWithImage/MobileWithImage';
import MobileWithoutLazy from './mobileWithoutLazy/MobileWithoutLazy';
import TableComponentDesktop from './tableComponentDesktop/TableComponentDesktop';
import TableComponentMobile from './tableComponentMobile/TableComponentMobile';
import TableWithImageWithLazy from './tableWithImageWithLazy/TableWithImageWithLazy';

function TableComponent(props) {
    const {
        columns,
        data,
        handleRowValue,
        buttonExist = false,
        tableButton,
        handleFetchMore,
        lazy = true,
        items = [],
        withImage = false,
        rowPath = false,
        rowPathType = '',
        handleRowClick = () => {
            console.log('');
        },
        handleImagePreview = () => {
            console.log('');
        },
        isRowClickable = false,
        inTab = false,
        handleImageCell,
    } = props;
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    return (
        <>
            {isMobileScreen ? (
                withImage ? (
                    lazy ? (
                        <TableWithImageWithLazy
                            buttonExist={buttonExist}
                            tableButton={tableButton}
                            handleImageCell={handleImageCell}
                            columns={columns}
                            data={data}
                            handleRowValue={handleRowValue}
                            items={items}
                            rowPath={rowPath}
                            handleRowClick={handleRowClick}
                            handleImagePreview={handleImagePreview}
                            isRowClickable={isRowClickable}
                            handleFetchMore={handleFetchMore}
                        />
                    ) : (
                        <MobileWithImage
                            handleImageCell={handleImageCell}
                            columns={columns}
                            data={data}
                            handleRowValue={handleRowValue}
                            items={items}
                            rowPath={rowPath}
                            handleRowClick={handleRowClick}
                            handleImagePreview={handleImagePreview}
                            isRowClickable={isRowClickable}
                        />
                    )
                ) : lazy ? (
                    <TableComponentMobile
                        columns={columns}
                        data={data}
                        handleRowValue={handleRowValue}
                        buttonExist={buttonExist}
                        tableButton={tableButton}
                        handleFetchMore={handleFetchMore}
                        rowPath={rowPath}
                        handleRowClick={handleRowClick}
                        handleImagePreview={handleImagePreview}
                        isRowClickable={isRowClickable}
                        items={items}
                        rowPathType={rowPathType}
                    />
                ) : (
                    <MobileWithoutLazy
                        columns={columns}
                        data={data}
                        handleRowValue={handleRowValue}
                        buttonExist={buttonExist}
                        tableButton={tableButton}
                        rowPath={rowPath}
                        handleRowClick={handleRowClick}
                        handleImagePreview={handleImagePreview}
                        isRowClickable={isRowClickable}
                        items={items}
                    />
                )
            ) : lazy ? (
                <TableComponentDesktop
                    columns={columns}
                    data={data}
                    handleRowValue={handleRowValue}
                    buttonExist={buttonExist}
                    tableButton={tableButton}
                    handleFetchMore={handleFetchMore}
                    rowPath={rowPath}
                    handleRowClick={handleRowClick}
                    handleImagePreview={handleImagePreview}
                    isRowClickable={isRowClickable}
                    items={items}
                    inTab={inTab}
                    rowPathType={rowPathType}
                />
            ) : (
                <DesktopWithoutLazy
                    columns={columns}
                    data={data}
                    handleRowValue={handleRowValue}
                    buttonExist={buttonExist}
                    tableButton={tableButton}
                    items={items}
                    rowPath={rowPath}
                    handleRowClick={handleRowClick}
                    handleImagePreview={handleImagePreview}
                    isRowClickable={isRowClickable}
                    inTab={inTab}
                />
            )}
        </>
    );
}

export default TableComponent;

import React from 'react';
import './stockModal.scss';
import { Backdrop, Box, Modal, Fade } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';
import ProductStock from '../../productStock/ProductStock';
import { useParams } from 'react-router-dom';
import { setIsProductStockModalOpen } from '../../../redux/actions/productActions';

import { connect } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function StockModal(props) {
    const { id } = useParams();
    const { isProductStockModalOpen, setIsProductStockModalOpen, stockId } =
        props;

    return (
        <div>
            <Modal
                className="stock-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isProductStockModalOpen}
                onClose={() => setIsProductStockModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isProductStockModalOpen}>
                    <Box sx={style}>
                        <span className="close">
                            <FaTimes
                                onClick={() =>
                                    setIsProductStockModalOpen(false)
                                }
                            />
                        </span>

                        <ProductStock
                            id={stockId ? stockId : id}
                            renderedIn="products"
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isProductStockModalOpen:
            state.isProductStockModalOpen.isProductStockModalOpen,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsProductStockModalOpen: (open) =>
            dispatch(setIsProductStockModalOpen(open)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StockModal);

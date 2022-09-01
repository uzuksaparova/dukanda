import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import './offlineQrDownload.scss';
import Url from 'url-parse';
import { useMediaQuery } from 'react-responsive';

function DivisionQR(props) {
    const { divisionItemSendInfo } = props;

    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });
    const [qrObject, setQrObject] = useState({});

    useEffect(() => {
        var url = new Url(divisionItemSendInfo.QRLocalServerUrl);
        const { protocol, hostname, port } = url;

        let qrString = `${protocol}//${hostname}:${port}/app`;
        setQrObject(qrString);
    }, [divisionItemSendInfo]);

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById('offline-qr-download');
        const pngUrl = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `dukandaDownload - ${divisionItemSendInfo.name}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    return (
        <div className="division-qr">
            {isMobileScreen ? (
                <QRCode
                    id="offline-qr-download"
                    value={qrObject}
                    size={150}
                    level={'L'}
                    includeMargin={true}
                    title="Offline Qr programmasyny ýüklemek"
                />
            ) : (
                <QRCode
                    id="offline-qr-download"
                    value={qrObject}
                    size={250}
                    level={'L'}
                    includeMargin={true}
                    title="Offline Qr programmasyny ýüklemek"
                />
            )}
            <Button onClick={downloadQRCode} variant="contained">
                Indir
            </Button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        divisionData: state.divisionData.divisionData,
        divisionItemSendInfo: state.divisionItemSendInfo,
    };
};
export default connect(mapStateToProps)(DivisionQR);

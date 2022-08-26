import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import './divisionQr.scss';
import Url from 'url-parse';
import { useMediaQuery } from 'react-responsive';

function DivisionQR(props) {
    const { divisionItemSendInfo } = props;
    const [qrObject, setQrObject] = useState({});
    const isMobileScreen = useMediaQuery({ query: '(max-width: 950px)' });

    useEffect(() => {
        var url = new Url(divisionItemSendInfo.QRLocalServerUrl);
        let qrString = JSON.stringify({
            nr: divisionItemSendInfo.nr,
            firmUUID: divisionItemSendInfo.firmUUID,
            hostname: url.hostname,
            protocol: url.protocol,
            port: url.port,
        });
        setQrObject(qrString);
    }, [divisionItemSendInfo]);

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById('qr-gen');
        const pngUrl = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${divisionItemSendInfo.name}QrKod.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    return (
        <div className="division-qr">
            {isMobileScreen ? (
                <QRCode
                    id="qr-gen"
                    value={qrObject}
                    size={150}
                    level={'L'}
                    includeMargin={true}
                    title="Bölüm QR"
                />
            ) : (
                <QRCode
                    id="qr-gen"
                    value={qrObject}
                    size={250}
                    level={'L'}
                    includeMargin={true}
                    title="Bölüm QR"
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
        divisionItemSendInfo: state.divisionItemSendInfo,
        divisionData: state.divisionData.divisionData,
    };
};
export default connect(mapStateToProps)(DivisionQR);

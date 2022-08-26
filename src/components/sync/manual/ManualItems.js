import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Button } from '@mui/material';
import './manualItems.scss';
import {
    BACKEND_URL,
    fetchForAdminWithUpdateToast,
} from '../../../../functions';

function ManualItems({ info }) {
    const [isQuickSync, setIsQuickSync] = useState(true);
    const syncFetch = () => {
        let params = isQuickSync ? { isQuickSync } : null;
        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/sync/${info.url}`,
                params,
                notifyMessage: 'Güncelleniyor lütfen bekleyiniz',
                updateMessage: 'Başarıyla güncellendi',
            },
            (data) => {
                console.log(data);
            }
        );
    };
    const handleRefresh = () => {
        if (!isQuickSync) {
            const result = window.confirm(
                'Hakykatdan hem sinhronlamak isleyarsinizmi?'
            );
            if (result) {
                syncFetch();
            }
        } else {
            syncFetch();
        }
    };

    return (
        <div className="manual-sync-item">
            <div className="name">{info.name}</div>
            <div className="quick-sync">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isQuickSync}
                            name="active"
                            onChange={(e) => setIsQuickSync(e.target.checked)}
                        />
                    }
                    label="Çalt sinhronlamak"
                />
            </div>
            <Button
                variant="contained"
                style={{ backgroundColor: '#e9601f' }}
                onClick={handleRefresh}
            >
                Güncelle
            </Button>
        </div>
    );
}

export default ManualItems;

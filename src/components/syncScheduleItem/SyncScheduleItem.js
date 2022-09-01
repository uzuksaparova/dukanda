import React, { useEffect, useState } from 'react';
import {
    Checkbox,
    Chip,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
} from '@material-ui/core';
import './syncScheduleItem.scss';
import { useParams } from 'react-router-dom';
import { MdDateRange } from 'react-icons/md';
import { BiRename, BiRepeat } from 'react-icons/bi';
import { AiOutlineSlack } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import { RiExchangeFundsFill } from 'react-icons/ri';
import dateFormat from 'dateformat';
import {
    BACKEND_URL,
    fetchForAdmin,
    fetchForAdminWithUpdateToast,
    fetchSyncSchedulesInfo,
    functionTranslator,
} from '../../functions';
import {
    setSyncScheduleData,
    setSyncSchedulesData,
} from '../../redux/actions/syncActions';
import { connect } from 'react-redux';
import TopButtons from '../topButtons/TopButtons';
import RepetitionType from './repetitionType/RepetitionType';

function SyncScheduleItem(props) {
    const { id } = useParams();
    const {
        syncScheduleData,
        setSyncScheduleData,
        setSyncSchedulesData,
        syncSchedulesData,
        isSidebarOpen,
    } = props;

    const [syncScheduleInfoSend, setSyncScheduleInfoSend] = useState({
        id: '',
        description: '',
        name: 'Undefined',
        active: true,
        startDate: '',
        endDate: '',
        isRepeatable: false,
        onceDateTime: '',
        dates: [],
        weekDays: [],
        hours: [],
        minute: '',
        functions: [],
        repetitionType: '',
    });

    const weekDays = [
        { name: 'Duşenbe', value: 0 },
        { name: 'Sişenbe', value: 1 },
        { name: 'Çarşenbe', value: 2 },
        { name: 'Penşenbe', value: 3 },
        { name: 'Anna', value: 4 },
        { name: 'Şenbe', value: 5 },
        { name: 'Ýekşenbe', value: 6 },
    ];
    const weekDaysBooleanTemp = [];
    weekDays.forEach((wd) => {
        var obj = {};
        obj[wd.value] = false;
        weekDaysBooleanTemp.push(obj);
    });

    const monthDaysBooleanTemp = [];
    for (var i = 1; i < 32; i++) {
        var obj = {};
        obj[i] = false;
        monthDaysBooleanTemp.push(obj);
    }
    const dayHoursBooleanTemp = [];
    for (i = 0; i < 24; i++) {
        obj = {};
        obj[i] = false;
        dayHoursBooleanTemp.push(obj);
    }

    const [syncFunctions, setSyncFunctions] = useState([]);
    const [syncFunctionTranslations, setSyncFunctionTranslations] = useState(
        []
    );
    const [functionChip, setFunctionChip] = useState([]);
    const [weekDaysBoolean, setWeekDaysBoolean] = useState([
        ...weekDaysBooleanTemp,
    ]);
    const [monthDaysBoolean, setMonthDaysBoolean] = useState([
        ...monthDaysBooleanTemp,
    ]);
    const [dayHoursBoolean, setDayHoursBoolean] = useState([
        ...dayHoursBooleanTemp,
    ]);

    const fetchSyncScheduleById = (iddd = id, add) => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/sync/schedules/${iddd}`,
                method: 'GET',
            },
            (data) => {
                setSyncScheduleData({ ...data });
                const {
                    id,
                    description,
                    name,
                    active,
                    startDate,
                    endDate,
                    isRepeatable,
                    onceDateTime,
                    dates,
                    weekDays,
                    hours,
                    minute,
                    functions,
                    repetitionType,
                } = data;
                var tempSendInfo = {
                    id,
                    description,
                    name,
                    active,
                    startDate: startDate
                        ? dateFormat(startDate, 'yyyy-mm-dd')
                        : '',
                    endDate: endDate ? dateFormat(endDate, 'yyyy-mm-dd') : '',
                    isRepeatable,
                    onceDateTime: dateFormat(
                        onceDateTime,
                        "yyyy-mm-dd'T'HH:MM"
                    ),
                    dates,
                    weekDays,
                    hours:
                        hours.length === 1
                            ? hours[0] < 10
                                ? [`0${Number(hours[0])}`]
                                : hours
                            : hours,
                    minute: minute < 10 ? `0${Number(minute)}` : minute,
                    functions,
                    repetitionType,
                };
                setSyncScheduleInfoSend(tempSendInfo);

                if (repetitionType === 'daysOfMonth') {
                    dataBooleanDetector(
                        monthDaysBoolean,
                        data.dates,
                        setMonthDaysBoolean
                    );
                } else if (repetitionType === 'daysOfWeek') {
                    dataBooleanDetector(
                        weekDaysBoolean,
                        data.weekDays,
                        setWeekDaysBoolean
                    );
                } else {
                    dataBooleanDetector(
                        dayHoursBoolean,
                        data.hours,
                        setDayHoursBoolean
                    );
                }
                if (data.startDate) {
                    data.startDate = dateFormat(data.startDate, 'yyyy-mm-dd');
                }
                if (data.endDate) {
                    data.endDate = dateFormat(data.endDate, 'yyyy-mm-dd');
                }
                data.nextRunTime = dateFormat(data.nextRunTime, 'yyyy-mm-dd');
                data.lastRunTime = dateFormat(data.lastRunTime, 'yyyy-mm-dd');
                data.onceDateTime = dateFormat(data.onceDateTime, 'yyyy-mm-dd');
                if (add === 'add') {
                    setSyncSchedulesData({
                        ...syncSchedulesData,
                        data: [...syncSchedulesData.data, data],
                    });
                }
                if (add === 'update') {
                    var tempAdminSyncSchedulesInfo = syncSchedulesData.data;
                    tempAdminSyncSchedulesInfo = tempAdminSyncSchedulesInfo.map(
                        (sync) => {
                            if (sync.id === id) {
                                return data;
                            } else {
                                return sync;
                            }
                        }
                    );

                    setSyncSchedulesData({
                        ...syncSchedulesData,
                        data: tempAdminSyncSchedulesInfo,
                    });
                }
            }
        );
    };

    const dataBooleanDetector = (booleanValues, data, setterFunction) => {
        let temp = booleanValues;
        if (data.length) {
            data.forEach((dwd, i) => {
                temp.forEach((wd, i) => {
                    if (Number(dwd) === Number(Object.keys(wd)[0])) {
                        wd[Object.keys(wd)[0]] = true;
                    }
                });
            });
        }
        setterFunction([...temp]);
    };

    useEffect(() => {
        setSyncScheduleData({});
        id && id !== '0' && fetchSyncScheduleById();
        !syncSchedulesData.data.length && fetchSyncSchedulesInfo();

        // eslint-disable-next-line
    }, []);

    const fetchSyncFunctions = () => {
        fetchForAdmin(
            {
                url: `${BACKEND_URL}/admin/sync/schedules/functions`,
                method: 'GET',
            },
            (data) => {
                let tempFunctions = [];
                let functionChip = [];
                let functionTranslations = [];
                data.forEach((func, i) => {
                    var obj = {};
                    obj[func] = false;
                    tempFunctions.push(obj);
                    functionTranslations.push({
                        name: func,
                        translation: functionTranslator(func),
                        isQuickSync: false,
                    });
                });

                if (syncScheduleData.functions?.length) {
                    tempFunctions.forEach((syncFun, i) => {
                        syncScheduleData.functions?.forEach((func) => {
                            if (Object.keys(syncFun)[0] === func.name) {
                                let chipObj = {
                                    name: func.name,
                                    translation:
                                        functionTranslations[i].translation,
                                    isQuickSync: func.isQuickSync
                                        ? true
                                        : false,
                                };
                                functionChip.push(chipObj);
                                syncFun[Object.keys(syncFun)[0]] = true;
                            }
                        });
                    });
                }

                setSyncFunctionTranslations(functionTranslations);
                setSyncFunctions(tempFunctions);
                setFunctionChip(functionChip);
            }
        );
    };

    useEffect(() => {
        if (Object.keys(syncScheduleData).length || Number(id) === 0) {
            fetchSyncFunctions();
        }
        // eslint-disable-next-line
    }, [syncScheduleData]);

    const handleResetClick = () => {
        if (syncScheduleInfoSend.id) {
            fetchSyncScheduleById(syncScheduleInfoSend.id);
        } else {
            setSyncScheduleInfoSend({
                id: '',
                description: '',
                name: 'Undefined',
                active: true,
                startDate: '',
                endDate: '',
                isRepeatable: true,
                onceDateTime: '',
                dates: [],
                weekDays: [],
                hours: [],
                minute: '',
                functions: [],
                repetitionType: '',
            });
        }
        // fetchWarehouse();
    };
    const handleSyncFunctionChange = (e) => {
        var indexx = e.target.name.split(',');
        var tempSyncFunctions = syncFunctions;
        tempSyncFunctions[indexx[0]][indexx[1]] = e.target.checked;
        setSyncFunctions([...tempSyncFunctions]);
        let tempFunctionChip = functionChip;
        let matchIndex = '';
        tempFunctionChip.forEach((f, i) => {
            if (f.name === indexx[1]) {
                matchIndex = i;
            }
        });
        if (e.target.checked && matchIndex === '') {
            tempFunctionChip.push({
                name: indexx[1],
                translation: syncFunctionTranslations[indexx[0]].translation,
                isQuickSync: false,
            });
        } else {
            tempFunctionChip.splice(matchIndex, 1);
        }
        setFunctionChip(tempFunctionChip);
    };

    const handleFunctionChipDelete = (func) => {
        var tempFunctionSync = syncFunctions;
        tempFunctionSync = tempFunctionSync.map((fs, i) => {
            if (Object.keys(fs)[0] === func.name) {
                let obj = {};
                obj[func.name] = false;
                obj['isQuickSync'] = false;
                return obj;
            } else {
                return fs;
            }
        });
        setSyncFunctions(tempFunctionSync);
        var tempChipFunctions = functionChip;

        tempChipFunctions = tempChipFunctions.filter((cf) => cf !== func);
        setFunctionChip(tempChipFunctions);
    };

    const handleQuickSyncCheckbox = (e) => {
        let tempFunctionChip = functionChip;
        tempFunctionChip[e.target.name].isQuickSync = e.target.checked;
        setFunctionChip([...tempFunctionChip]);
    };

    const handleSaveClick = () => {
        const {
            description,
            name,
            active,
            startDate,
            endDate,
            isRepeatable,
            onceDateTime,
            minute,
            repetitionType,
            hours,
        } = syncScheduleInfoSend;
        let syncInfoSend = {
            name,
            description,
            active,
            isRepeatable,
            repetitionType,
        };
        let tempFunction = functionChip;
        tempFunction.forEach((f, i) => {
            delete f.translation;
        });
        syncInfoSend.functions = tempFunction;

        if (isRepeatable) {
            syncInfoSend.startDate = startDate;
            syncInfoSend.endDate = endDate;
            syncInfoSend.minute = +minute;

            if (repetitionType === 'daysOfWeek') {
                let trues = [];
                weekDaysBoolean.forEach((wd, i) => {
                    if (Object.values(wd)[0]) {
                        trues.push(+Object.keys(wd)[0]);
                    }
                });
                syncInfoSend.weekDays = trues;
                syncInfoSend.hours = [hours[0]];
            }
            if (repetitionType === 'daysOfMonth') {
                let trues = [];
                monthDaysBoolean.forEach((md, i) => {
                    if (Object.values(md)[0]) {
                        trues.push(+Object.keys(md)[0]);
                    }
                });
                syncInfoSend.dates = trues;
                syncInfoSend.hours = [hours[0]];
            }
            if (repetitionType === 'hoursOfDays') {
                let trues = [];
                dayHoursBoolean.forEach((dh, i) => {
                    if (Object.values(dh)[0]) {
                        trues.push(+Object.keys(dh)[0]);
                    }
                });
                syncInfoSend.hours = trues;
            }
        } else {
            syncInfoSend.repetitionType = 'onceExecution';
            syncInfoSend.onceDateTime = onceDateTime;
        }

        fetchForAdminWithUpdateToast(
            {
                url: `${BACKEND_URL}/admin/sync/schedules/${
                    id === '0' ? '' : id
                }`,
                method: id === '0' ? 'POST' : 'PUT',
                notifyMessage: 'Saving...',
                updateMessage: 'Saved',
                body: JSON.stringify(syncInfoSend),
            },
            (data) => {
                if (data !== 'err') {
                    if (!syncScheduleInfoSend.id) {
                        fetchSyncScheduleById(data.data.id, 'add');
                    } else {
                        fetchSyncScheduleById(
                            syncScheduleInfoSend.id,
                            'update'
                        );
                    }
                }
            }
        );
    };

    return (
        <div
            className={`sync-schedule-info ${
                isSidebarOpen ? 'sidebar-open' : ''
            }`}
        >
            <div className="sync-schedule-header">
                <div className="right-header">
                    <input
                        className="name-input"
                        type="text"
                        value={syncScheduleInfoSend.name}
                        onChange={(e) =>
                            setSyncScheduleInfoSend({
                                ...syncScheduleInfoSend,
                                name: e.target.value,
                            })
                        }
                        autoFocus
                    />
                </div>
                <TopButtons
                    disabledValue="updateSyncSchedule"
                    handleSaveButton={handleSaveClick}
                    handleResetButton={handleResetClick}
                    cancelPath="/syncs/sschedules"
                    resetEnable={true}
                />
            </div>
            <div className="sync-schedule-body">
                <div className="sync-schedule-one-row">
                    <div className="left">
                        <AiOutlineSlack className="sync-schedule-icon" />
                        <span>Aktiw</span>
                    </div>
                    <div className="right">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={syncScheduleInfoSend.active}
                                    onChange={(e) =>
                                        setSyncScheduleInfoSend({
                                            ...syncScheduleInfoSend,
                                            active: e.target.checked,
                                        })
                                    }
                                    name="active"
                                />
                            }
                            label="Aktiw"
                        />
                    </div>
                </div>
                <div className="sync-schedule-one-row">
                    <div className="left">
                        <RiExchangeFundsFill className="sync-schedule-icon" />
                        <span>Funksiyalar</span>
                    </div>
                    <div className="right">
                        <FormControl className="form-control">
                            <Select
                                multiple
                                code="demo-simple-select-outlined"
                                value={['Funksiyalar']}
                                displayEmpty
                                label="Funksiyalar"
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <em>Placeholder</em>;
                                    }
                                    return selected.join(', ');
                                }}
                            >
                                {syncFunctions.length &&
                                syncFunctionTranslations.length ? (
                                    syncFunctions.map((func, i) => {
                                        return (
                                            <div className="one-group" key={i}>
                                                <MenuItem>
                                                    <FormControlLabel
                                                        id="group"
                                                        control={
                                                            <Checkbox
                                                                className="main-group "
                                                                onChange={(e) =>
                                                                    handleSyncFunctionChange(
                                                                        e
                                                                    )
                                                                }
                                                                checked={
                                                                    Object.values(
                                                                        func
                                                                    )[0]
                                                                }
                                                                defaultValue={
                                                                    Object.values(
                                                                        func
                                                                    )[0]
                                                                }
                                                                name={
                                                                    i +
                                                                    ',' +
                                                                    Object.keys(
                                                                        func
                                                                    )[0]
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            syncFunctionTranslations[
                                                                i
                                                            ]['translation']
                                                        }
                                                    />
                                                </MenuItem>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>loading</div>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="function-chips">
                    {functionChip?.map((fc, i) => {
                        return (
                            <Chip
                                key={i}
                                className="chip"
                                variant="outlined"
                                color="secondary"
                                onDelete={() => handleFunctionChipDelete(fc)}
                                label={
                                    <div className="function-chip">
                                        {fc.translation}
                                        <FormControlLabel
                                            id="group"
                                            control={
                                                <Checkbox
                                                    className="main-group"
                                                    onChange={(e) =>
                                                        handleQuickSyncCheckbox(
                                                            e
                                                        )
                                                    }
                                                    checked={fc.isQuickSync}
                                                    defaultValue={
                                                        fc.isQuickSync
                                                    }
                                                    name={i}
                                                />
                                            }
                                            label={'Calt sinhronlamak'}
                                        />
                                    </div>
                                }
                            />
                        );
                    })}
                </div>
                <div className="sync-schedule-one-row">
                    <div className="left">
                        <BiRename className="sync-schedule-icon" />
                        <span>Beýany</span>
                    </div>
                    <div className="right">
                        <TextareaAutosize
                            value={syncScheduleInfoSend.description}
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="beyany yazyn..."
                            style={{ width: 200 }}
                            maxRows={6}
                            onChange={(e) => {
                                setSyncScheduleInfoSend({
                                    ...syncScheduleInfoSend,
                                    description: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="sync-schedule-one-row">
                    <div className="left">
                        <BiRepeat className="sync-schedule-icon" />
                        <span>Gaytalanmagy</span>
                    </div>
                    <div className="right">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={syncScheduleInfoSend.isRepeatable}
                                    onChange={(e) =>
                                        setSyncScheduleInfoSend({
                                            ...syncScheduleInfoSend,
                                            isRepeatable: e.target.checked,
                                        })
                                    }
                                    name="active"
                                />
                            }
                            label="Gaytalanmagy"
                        />
                    </div>
                </div>
                {syncScheduleInfoSend.isRepeatable ? (
                    <div>
                        <div className="sync-schedule-one-row">
                            <div className="left">
                                <MdDateRange className="sync-schedule-icon" />
                                <span>Başlaýan senesi :</span>
                            </div>
                            <div className="right">
                                <TextField
                                    inputProps={{
                                        min: dateFormat(
                                            new Date(),
                                            'yyyy-mm-dd'
                                        ),
                                    }}
                                    placeholder="2021-10-13"
                                    value={syncScheduleInfoSend.startDate}
                                    id="date"
                                    type="date"
                                    variant="outlined"
                                    onChange={(e) =>
                                        setSyncScheduleInfoSend({
                                            ...syncScheduleInfoSend,
                                            startDate: e.target.value,
                                        })
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sync-schedule-one-row">
                            <div className="left">
                                <MdDateRange className="sync-schedule-icon" />
                                <span>Gutarýan senesi :</span>
                            </div>
                            <div className="right">
                                <TextField
                                    inputProps={{
                                        min: dateFormat(
                                            new Date(),
                                            'yyyy-mm-dd'
                                        ),
                                    }}
                                    placeholder="2021-10-13"
                                    value={syncScheduleInfoSend.endDate}
                                    id="date"
                                    type="date"
                                    variant="outlined"
                                    onChange={(e) =>
                                        setSyncScheduleInfoSend({
                                            ...syncScheduleInfoSend,
                                            endDate: e.target.value,
                                        })
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="sync-schedule-one-row">
                            <div className="left">
                                <MdDateRange className="sync-schedule-icon" />
                                <span>Gaýtalanma görnüşi :</span>
                            </div>
                            <div className="right">
                                <FormControl className="form-control">
                                    <Select
                                        placeholder="görnüş saýlaň"
                                        code="demo-simple-select-outlined"
                                        value={
                                            syncScheduleInfoSend.repetitionType
                                        }
                                        onChange={(e) => {
                                            setSyncScheduleInfoSend({
                                                ...syncScheduleInfoSend,
                                                repetitionType: e.target.value,
                                            });
                                        }}
                                        label={
                                            syncScheduleInfoSend.repetitionType
                                        }
                                    >
                                        <MenuItem value={'daysOfMonth'}>
                                            Aýyň günleri
                                        </MenuItem>
                                        <MenuItem value={'daysOfWeek'}>
                                            Hepdäniň günleri
                                        </MenuItem>
                                        <MenuItem value={'hoursOfDays'}>
                                            Günüň sagatlary
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <RepetitionType
                            syncScheduleInfoSend={syncScheduleInfoSend}
                            setSyncScheduleInfoSend={setSyncScheduleInfoSend}
                            setWeekDaysBoolean={setWeekDaysBoolean}
                            weekDaysBoolean={weekDaysBoolean}
                            monthDaysBoolean={monthDaysBoolean}
                            setMonthDaysBoolean={setMonthDaysBoolean}
                            dayHoursBoolean={dayHoursBoolean}
                            setDayHoursBoolean={setDayHoursBoolean}
                            weekDays={weekDays}
                        />
                    </div>
                ) : (
                    <div className="sync-schedule-one-row">
                        <div className="left">
                            <MdDateRange className="sync-schedule-icon" />
                            <span>Senesi we sagady:</span>
                        </div>
                        <div className="right">
                            <TextField
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 16),
                                }}
                                value={syncScheduleInfoSend.onceDateTime}
                                id="date"
                                type="datetime-local"
                                variant="outlined"
                                onChange={(e) => {
                                    setSyncScheduleInfoSend({
                                        ...syncScheduleInfoSend,
                                        onceDateTime: e.target.value,
                                    });
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer
                position="bottom-right"
                progressClassName="toastProgressCard"
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        syncScheduleData: state.syncScheduleData.syncScheduleData,
        syncSchedulesData: state.syncSchedulesData,
        isSidebarOpen: state.isSidebarOpen.isSidebarOpen,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSyncScheduleData: (data) => dispatch(setSyncScheduleData(data)),
        setSyncSchedulesData: (data) => dispatch(setSyncSchedulesData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyncScheduleItem);

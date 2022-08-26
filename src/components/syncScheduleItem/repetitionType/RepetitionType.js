import React from 'react';
import { MdDateRange } from 'react-icons/md';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
} from '@material-ui/core';
import dateFormat from 'dateformat';

function RepetitionType(props) {
    const {
        syncScheduleInfoSend,
        setSyncScheduleInfoSend,
        setWeekDaysBoolean,
        weekDaysBoolean,
        monthDaysBoolean,
        setMonthDaysBoolean,
        dayHoursBoolean,
        setDayHoursBoolean,
        weekDays,
    } = props;

    const handleDayCheckbox = (e, type) => {
        if (type === 'w') {
            let tempWeekDays = weekDaysBoolean;
            tempWeekDays[e.target.name][e.target.name] = e.target.checked;
            setWeekDaysBoolean([...tempWeekDays]);
        } else if (type === 'm') {
            let tempMonthDays = monthDaysBoolean;
            tempMonthDays[e.target.name - 1][e.target.name] = e.target.checked;
            setMonthDaysBoolean([...tempMonthDays]);
        } else {
            let tempDayHours = dayHoursBoolean;
            tempDayHours[e.target.name][e.target.name] = e.target.checked;
            setDayHoursBoolean([...tempDayHours]);
        }
    };

    const handleHourAndMinuteInput = (e) => {
        var splitted = e.target.value.split(':');
        let tempSyncScheduleInfoSend = syncScheduleInfoSend;
        tempSyncScheduleInfoSend.hours[0] = splitted[0];
        tempSyncScheduleInfoSend.minute = splitted[1];

        setSyncScheduleInfoSend({ ...tempSyncScheduleInfoSend });
    };
    return (
        <div>
            {syncScheduleInfoSend.repetitionType !== 'hoursOfDays' &&
            syncScheduleInfoSend.repetitionType !== 'onceExecution' ? (
                <div className="sync-schedule-one-row">
                    <div className="left">
                        <MdDateRange className="sync-schedule-icon" />
                        <span>Wagty :</span>
                    </div>
                    <div className="right">
                        <TextField
                            inputProps={{
                                min: dateFormat(new Date(), 'yyyy-mm-dd'),
                            }}
                            placeholder="2021-10-13"
                            value={`${syncScheduleInfoSend?.hours[0]}:${syncScheduleInfoSend.minute}`}
                            id="date"
                            type="time"
                            variant="outlined"
                            onChange={(e) => {
                                handleHourAndMinuteInput(e);
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            ) : null}
            {syncScheduleInfoSend.repetitionType === 'daysOfWeek' ? (
                <FormGroup>
                    <div className="day-checkbox">
                        {weekDays.map((dway, i) => {
                            return (
                                <FormControlLabel
                                    key={i}
                                    control={
                                        <Checkbox
                                            checked={weekDaysBoolean[i][i]}
                                            onChange={(e) =>
                                                handleDayCheckbox(e, 'w')
                                            }
                                            name={i}
                                        />
                                    }
                                    label={dway.name}
                                />
                            );
                        })}
                    </div>
                </FormGroup>
            ) : syncScheduleInfoSend.repetitionType === 'daysOfMonth' ? (
                <FormGroup>
                    <div className="day-checkbox-m">
                        {monthDaysBoolean.map((dway, i) => {
                            return (
                                <FormControlLabel
                                    key={i}
                                    control={
                                        <Checkbox
                                            checked={monthDaysBoolean[i][i + 1]}
                                            onChange={(e) =>
                                                handleDayCheckbox(e, 'm')
                                            }
                                            name={i + 1}
                                        />
                                    }
                                    label={i + 1}
                                />
                            );
                        })}
                    </div>
                </FormGroup>
            ) : syncScheduleInfoSend.repetitionType === 'hoursOfDays' ? (
                <>
                    <div className="minute-input">
                        <input
                            type="text"
                            value={syncScheduleInfoSend?.minute}
                            onChange={(e) =>
                                setSyncScheduleInfoSend({
                                    ...syncScheduleInfoSend,
                                    minute: e.target.value,
                                })
                            }
                        />
                        <span className="minute-text">minut</span>
                    </div>
                    <FormGroup>
                        <div className="day-checkbox-m">
                            {dayHoursBoolean.map((dway, i) => {
                                return (
                                    <FormControlLabel
                                        key={i}
                                        control={
                                            <Checkbox
                                                checked={dayHoursBoolean[i][i]}
                                                onChange={(e) =>
                                                    handleDayCheckbox(e, 'h')
                                                }
                                                name={i}
                                            />
                                        }
                                        label={i}
                                    />
                                );
                            })}
                        </div>
                    </FormGroup>
                </>
            ) : null}
        </div>
    );
}

export default RepetitionType;

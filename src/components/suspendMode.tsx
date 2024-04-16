import {
    NotchLabel,
    PanelSectionRow,
} from "decky-frontend-lib";

import { VFC, useEffect, useState } from "react";

import { localizationManager, localizeStrEnum } from "../i18n";
import { Setting } from "../hooks";
import { SlowSliderField } from ".";
import { SuspendMode } from "../util";

export const SuspendModeComponent: VFC = () => {

    const [suspendMode, setSuspendMode] = useState<string>(Setting.getSuspendMode());

    const options = [
        { mode: SuspendMode.OEM, label: localizationManager.getString(localizeStrEnum.SUSPEND_MODE_OEM) },
        { mode: SuspendMode.KEEP, label: localizationManager.getString(localizeStrEnum.SUSPEND_MODE_KEEP) },
        { mode: SuspendMode.OFF, label: localizationManager.getString(localizeStrEnum.SUSPEND_MODE_OFF) },
    ];

    const modeToNumber = (mode: string) => {
        return options.findIndex((option) => option.mode === mode);
    }

    const numberToMode = (number: number) => {
        return options[number].mode || SuspendMode.OEM;
    }

    const ledModeLabels: NotchLabel[] = options.map((option, idx) => {
        return {
            notchIndex: idx,
            label: option.label,
            value: modeToNumber(option.mode),
        };
    });

    const updateMode = (mode: number) => {
        setSuspendMode(numberToMode(mode));
    }

    useEffect(() => {
        Setting.setSuspendMode(suspendMode);
    }, [suspendMode]);

    return (
        <>
            {suspendMode && <PanelSectionRow>
                <SlowSliderField
                    label={localizationManager.getString(localizeStrEnum.SUSPEND_MODE)}
                    description={localizationManager.getString(localizeStrEnum.SUSPEND_MODE_DESC)}
                    value={modeToNumber(suspendMode)}
                    min={0}
                    max={ledModeLabels.length - 1}
                    step={1}
                    notchCount={ledModeLabels.length}
                    notchLabels={ledModeLabels}
                    notchTicksVisible={true}
                    showValue={false}
                    onChange={updateMode}
                />
            </PanelSectionRow>}
        </>

    );
}
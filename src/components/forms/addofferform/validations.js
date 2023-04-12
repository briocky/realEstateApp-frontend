
function validateAdditionalDataStep(additionalInfo, setAdditionalInfo) {
    const skipValidationFields = ["pictures", "description"];
    let regexResult;
    let errors;

    for (const [key, data] of Object.entries(additionalInfo)) {
        if (skipValidationFields.includes(key)) continue;
        regexResult = data.value.match(data.validationRule);
        if (!regexResult) {
            errors = { ...errors, [key]: { ...data, error: true } }
        }
    }

    if (errors) {
        setAdditionalInfo({ ...additionalInfo, ...errors });
        return false;
    }

    return true;
}

function validateBasicInfoStep(basicInfo, setBasicInfo) {
    let regexResult;
    let errors;

    for (const [key, data] of Object.entries(basicInfo)) {
        if (key === "roomCount" && basicInfo.realEstateType.value === "dzialka") {
            continue;
        }
        regexResult = data.value.match(data.validationRule);
        if (!regexResult) {
            errors = { ...errors, [key]: { ...data, error: true } }
        }

    }

    if (errors) {
        setBasicInfo({ ...basicInfo, ...errors });
        return false;
    }

    return true;
}

export { validateBasicInfoStep, validateAdditionalDataStep };
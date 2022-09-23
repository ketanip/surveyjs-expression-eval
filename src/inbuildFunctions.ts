const iif = (result: boolean, valueIfTrue: any, valueIfFalse: any): any => {
    if (result) {
        return valueIfTrue;
    } else {
        return valueIfFalse;
    };
};

function currentDate() {
    return new Date();
};

function age(params: string): any {
    let birthDate = new Date(params);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age -= age > 0 ? 1 : 0;
    };
    return age;
};

function today(params: any[]) {
    let res = new Date();
    if (Array.isArray(params) && params.length == 1) {
        res.setDate(res.getDate() + params[0]);
    }
    return res;
};


function getDate(date: string): any {
    return new Date(date);
};


function sum(params: any[]): any {
    let arr: any[] = [];
    getParamsAsArray(params, arr);
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
};


function min_max(params: any[], isMin: boolean): any {
    let arr: any[] = [];
    getParamsAsArray(params, arr);
    let res: any = undefined;
    for (let i = 0; i < arr.length; i++) {
        if (res === undefined) {
            res = arr[i];
        }
        if (isMin) {
            if (res > arr[i]) res = arr[i];
        } else {
            if (res < arr[i]) res = arr[i];
        }
    }
    return res;
};

function min(params: any[]): any {
    return min_max(params, true);
};


function max(params: any[]): any {
    return min_max(params, false);
};


const isNumber = (value: any): boolean => {
    if (
        typeof value == "string" &&
        !!value &&
        value.indexOf("0x") == 0 &&
        value.length > 32
    )
        return false;
    return !isNaN(parseFloat(value)) && isFinite(value);
};

function getParamsAsArray(value: any, arr: any[]) {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            getParamsAsArray(value[i], arr);
        }
    } else {
        if (isNumber(value)) {
            value = parseFloat(value);
        }
        arr.push(value);
    }
};

function count(params: any[]): any {
    let arr: any[] = [];
    getParamsAsArray(params, arr);
    return arr.length;
};


function avg(params: any[]): any {
    let arr: any[] = [];
    getParamsAsArray(params, arr);
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return arr.length > 0 ? res / arr.length : 0;
};


function getInArrayParams(params: any[]): any {
    if (params.length != 2) return null;
    let arr = params[0];
    if (!arr) return null;
    if (!Array.isArray(arr) && !Array.isArray(Object.keys(arr))) return null;
    let name = params[1];
    if (typeof name !== "string" && !(name instanceof String)) return null;
    return { data: arr, name: name };
};

function calcInArray(
    params: any[],
    func: (res: number, val: number) => number
): any {
    let v = getInArrayParams(params);
    if (!v) return undefined;
    let res: any = undefined;
    if (Array.isArray(v.data)) {
        for (let i = 0; i < v.data.length; i++) {
            let item = v.data[i];
            if (!!item && item[<string>v.name]) {
                res = func(res, item[<string>v.name]);
            }
        }
    } else {
        for (let key in v.data) {
            let item = v.data[key];
            if (!!item && item[<string>v.name]) {
                res = func(res, item[<string>v.name]);
            }
        }
    }
    return res;
};

function sumInArray(params: any[]): any {
    let res = calcInArray(params, function (res: number, val: number): number {
        if (res == undefined) res = 0;
        return +res + +val;
    });
    return res !== undefined ? res : 0;
};


function minInArray(params: any[]): any {
    return calcInArray(params, function (res: number, val: number): number {
        if (res == undefined) return val;
        return res < val ? res : val;
    });
}


function maxInArray(params: any[]): any {
    return calcInArray(params, function (res: number, val: number): number {
        if (res == undefined) return val;
        return res > val ? res : val;
    });
}


function countInArray(params: any[]): any {
    let res = calcInArray(params, function (res: number, val: number): number {
        if (res == undefined) res = 0;
        return res + 1;
    });
    return res !== undefined ? res : 0;
}

function avgInArray(params: any[]): any {
    let count = countInArray(params);
    if (count == 0) return 0;
    return sumInArray(params) / count;
}


function diffDays(params: any[]) {
    if (!Array.isArray(params) || params.length !== 2) return 0;
    if (!params[0] || !params[1]) return 0;
    const date1: any = new Date(params[0]);
    const date2: any = new Date(params[1]);
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export default {
    iif,
    age,
    currentDate,
    today,
    getDate,
    diffDays,
    sum,
    max,
    min,
    avg,
    sumInArray,
    maxInArray,
    minInArray,
    avgInArray,
    countInArray,
};
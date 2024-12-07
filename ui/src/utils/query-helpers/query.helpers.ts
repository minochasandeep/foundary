import { getGridBooleanOperators, getGridNumericOperators, getGridStringOperators } from "@mui/x-data-grid";
import { ReadonlyURLSearchParams } from "next/navigation";

export const buildPath = (baseUrl: string, params?: any) => {
    let path = baseUrl;
    if (params && Object.keys(params).length > 0) {
        path += '?';
        Object.keys(params).forEach(key => {
            path += `${key}=${typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]}&`;
        });
        path = path.substring(0, path.length - 1);
    }
    return path;
};

export const createQueryString = (
    searchParams: ReadonlyURLSearchParams,
    params: Record<string, string | number> = {},
    deleteParams?: boolean,
) => {
    const nParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([name, value]) => {
        if (deleteParams) {
            nParams.delete(name);
        } else {
            nParams.set(name, value.toString());
        }
    });
    return nParams.toString();
};

// generate prisma query based on the search params
export const generatePrismaQuery = ({ searchParams, orderBy, order, searchQuery, searchField, numbericFields= [], ignoreParams = [] }: { searchParams?: ReadonlyURLSearchParams, orderBy?: string | null, order?: string | null, searchField?: string, searchQuery?: string | null, numbericFields?: Array<string>, ignoreParams?: Array<string> }) => {
    // these fields will not be used in the where query
    const commonFields = ["page", "pageSize", "orderBy", "search"];
    let orderByQuery: { [key: string]: string } = {};
    let whereQuery: { [key: string]: any } = {};

    if (searchParams) {
        searchParams.forEach((value, key) => {
            if (!ignoreParams.includes(key)) {
                if (key.includes("_") && !commonFields.includes(key)) {
                    const [field, operator] = key.split("_");
                    whereQuery[field] = {
                        [operator]: numbericFields.includes(field) ? Number(value) : value,
                    };
                }
            }
        });
    }

    if (orderBy) {
        orderByQuery[orderBy] = order || "asc";
    }

    if (searchQuery) {
        whereQuery[`${searchField}`] = { contains: searchQuery, mode: "insensitive" };
    }
    return { whereQuery, orderByQuery };
}

// const map datagrid operators to prisma operators
const PrismaIntOperators: Record<string, any> = {
    "=": {
        "label": "Equals",
        "operator": "equals"
    },
    "!=": {
        "label": "Not equals",
        "operator": "not"
    },
    ">": {
        "label": "Greater than",
        "operator": "gt"
    },
    ">=": {
        "label": "Greater than equals",
        "operator": "gte"
    },
    "<": {
        "label": "Less than",
        "operator": "lt"
    },
    "<=": {
        "label": "Less than equals",
        "operator": "lte"
    }
};

const PrismaBoolOperators: Record<string, any> = {
    "is": {
        "label": "Equals",
        "operator": "equals"
    }
};

const PrismaStringOperators = ["contains", "equals", "startsWith", "endsWith"];


// create a list of operators for the datagrid based on prisma operators
export const DataGridStringOperators = getGridStringOperators()
    .filter((item) => PrismaStringOperators.includes(item.value))

export const DataGridNumericOperators = getGridNumericOperators()
    .filter((item) => Object.keys(PrismaIntOperators).includes(item.value))
    .map((item: any) => ({
        ...item,
        label: PrismaIntOperators[item.value].label as string,
        value: PrismaIntOperators[item.value].operator,
    }));

export const DataGridBooleanOperators = getGridBooleanOperators()
    .filter((item) => Object.keys(PrismaBoolOperators).includes(item.value))
    .map((item: any) => ({
        ...item,
        label: PrismaBoolOperators[item.value].label as string,
        value: PrismaBoolOperators[item.value].operator,
    }));


export function getDataGridOperators(columnType: string): any[] {
    if (columnType === "number") {
        return DataGridNumericOperators;
    } else if (columnType === "boolean") {
        return DataGridBooleanOperators;
    } else {
        return DataGridStringOperators;
    }
}

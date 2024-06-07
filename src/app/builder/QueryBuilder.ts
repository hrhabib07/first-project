import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        if (this?.query?.searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" }
                }) as FilterQuery<T>)
            });
        }
        return this;
    }
    filter() {
        const objQuery = { ...this.query };
        // filtering
        const excludingFields = ["searchTerm", "sort", "limit", "page", "fields"];
        excludingFields.forEach(element => {
            delete objQuery[element]
        });
        this.modelQuery = this.modelQuery.find(objQuery as FilterQuery<T>).populate("admissionSemester").populate({
            path: "academicDepartment", populate: {
                path: "academicFaculty"
            }
        });
        return this;
    }


}
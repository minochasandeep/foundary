export class ViewUserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    startDate: Date;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    organization?: {id: number, name: string};
}

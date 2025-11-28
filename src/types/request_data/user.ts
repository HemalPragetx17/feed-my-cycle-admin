export interface User {
    _id: string;
    name: string;
    email: string;
    age: number;
    height: number; // in cm
    weight: number; // in kg
    targetWeight: number; // in kg
    averageCycleLength: number; // in days
    durationOfPeriod: number; // in days
    actualWeightLoss: number; // in kg
    progressTillDate: number; // percentage
    isActive: boolean;
    subscription: string;
    _createdAt: string;
};
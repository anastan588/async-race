export type TCars = {
    name: string;
    color: string;
    id: number;
};

export type TWinner = {
    id?: number;
    wins: number;
    time: number;
};

export type TDrive = {
    velocity: string;
    distance: string;
};

export type TCreateOneCar = {
    name: string;
    color: string;
};

export interface ICarModels {
    [propertyName: string]: string[];
}

export interface ICarForAnimation {
    id: string;
}

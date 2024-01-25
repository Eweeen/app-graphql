export interface Vehicle {
    id: string;
    immatriculation: string;
    model: string;
    __typename: string;
}

export interface VehicleSubscription {
    vehicleChange: Vehicle;
}
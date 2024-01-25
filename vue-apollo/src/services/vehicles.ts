import gql from "graphql-tag";

export const VEHICLE_QUERY = gql`
    query Vehicles {
        vehicles {
            id
            immatriculation
            model
        }
    }
`;

export const VEHICLE_SUBSCRIPTION = gql`
    subscription {
        vehicleChange {
            id
            immatriculation
            model
        }
    }
`;
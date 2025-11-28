export type CarResponse = {

    brand: string;
    model: string;
    colour: string;
    registrationNumber: string;
    modelYear: number;
    price: number;
    _links: {
        self: {
            href: string;
        },
        car: {
            href: string;
        },
        owner: {
            href: string;
        }
    }
}

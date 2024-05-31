import { Manufacturer } from "./manufacturer";

export class Bike {
    public id!: number;
    public manufacturer = new Manufacturer();
    public model = '';
    public bikeType = '';
    public year = 0;
    public horsepower = 0;
    public weight = 0;
    public mileage = 0;
    public username = '';
}
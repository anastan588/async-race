import './cars_block.scss';
import { TCars } from '../../types';
import carImageSvg from '../car_image/car_image';

class CarsBlock {
    static numberOfCars: number;

    public carGarage: TCars[];

    public pageLimit: number;

    static pageNumber: number;

    public lastIdOfShownCars: number;

    constructor(numberOfcars: number = 0, lastIdOfShownCars: number = 0, pageLimit: number = 7, pagenumber = 1) {
        CarsBlock.numberOfCars = numberOfcars;
        this.carGarage = [];
        this.pageLimit = pageLimit;
        this.lastIdOfShownCars = lastIdOfShownCars;
        CarsBlock.pageNumber = pagenumber;
    }

    public async receiveCarsFromServer() {
        const urlGarage: URL = new URL('http://127.0.0.1:3000/garage');
        urlGarage.searchParams.set('_page', `${CarsBlock.pageNumber}`);
        urlGarage.searchParams.set('_limit', `${this.pageLimit}`);
        const responseGarageCars: TCars[] = await fetch(urlGarage, {
            method: 'GET',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of receiving data');
            }
            CarsBlock.numberOfCars = Number(response.headers.get('X-Total-Count'));
            return response.json();
        });
        this.carGarage = responseGarageCars;
        const carsBlock = <HTMLDivElement>document.querySelector('.cars_block');
        carsBlock.innerHTML = '';
        this.fillCarsContainerTitles();
        this.fillCarsBlock(this.carGarage.length);
    }

    public fillCarsContainerTitles(): void {
        const carsAmountTitle = <HTMLDivElement>document.querySelector('.cars_amount_in_garage');
        carsAmountTitle.innerHTML = `Garage (${CarsBlock.numberOfCars})`;
    }

    public fillCarsBlock(lengthOfNewCars: number): void {
        for (let i = 0; i < lengthOfNewCars; i += 1) {
            this.createCarItem(i);
        }
    }

    public createCarItem(i: number): void {
        const carsBlock = <HTMLDivElement>document.querySelector('.cars_block');
        if (carsBlock.children.length < 7) {
            const carItem = <HTMLDivElement>document.createElement('div');
            carItem.setAttribute('id', `${this.carGarage[i].id}`);
            carItem.classList.add('car_item');
            this.fillCarTools(carItem, i);
            this.fillCar(carItem, i);
            carsBlock.append(carItem);
        }
    }

    public fillCarTools(carItem: HTMLDivElement, i: number): void {
        const carTools = <HTMLDivElement>document.createElement('div');
        carTools.classList.add('car_tools');
        const selectButton = <HTMLButtonElement>document.createElement('button');
        selectButton.classList.add('select_button');
        selectButton.setAttribute('id', `${this.carGarage[i].id}`);
        selectButton.innerHTML = 'Select';
        const removeButton = <HTMLButtonElement>document.createElement('button');
        removeButton.innerHTML = 'Remove';
        removeButton.classList.add('remove_button');
        removeButton.setAttribute('id', `${this.carGarage[i].id}`);
        const carTitle = <HTMLParagraphElement>document.createElement('p');
        carTitle.classList.add('car_title');
        carTitle.innerHTML = `${this.carGarage[i].name}`;
        carTitle.setAttribute('id', `${this.carGarage[i].id}`);
        carTools.append(selectButton);
        carTools.append(removeButton);
        carTools.append(carTitle);
        carItem.append(carTools);
    }

    public fillCar(carItem: HTMLDivElement, i: number): void {
        const car = <HTMLDivElement>document.createElement('div');
        car.classList.add('car');
        const carControl = <HTMLDivElement>document.createElement('div');
        carControl.classList.add('car_control');
        const startButton = <HTMLButtonElement>document.createElement('button');
        startButton.classList.add('start_button');
        startButton.innerHTML = 'A';
        startButton.setAttribute('id', `${this.carGarage[i].id}`);
        const stopButton = <HTMLButtonElement>document.createElement('button');
        stopButton.classList.add('stop_button');
        stopButton.setAttribute('id', `${this.carGarage[i].id}`);
        stopButton.innerHTML = 'B';
        stopButton.disabled = true;
        carControl.append(startButton);
        carControl.append(stopButton);
        car.append(carControl);
        const carImageContainer = <HTMLDivElement>document.createElement('div');
        carImageContainer.classList.add('car_image_container');
        const carImage = <HTMLDivElement>document.createElement('div');
        carImage.classList.add('car_image');
        carImage.setAttribute('id', `${this.carGarage[i].id}`);
        const ImageHTML = carImageSvg(this.carGarage[i].color);
        carImage.innerHTML = ImageHTML;
        carImageContainer.append(carImage);
        const flagImage = <HTMLImageElement>document.createElement('img');
        flagImage.classList.add('flag_image');
        flagImage.src = './assets/icons/flag.png';
        carImageContainer.append(flagImage);
        car.append(carImageContainer);
        carItem.append(car);
    }
}

export default CarsBlock;

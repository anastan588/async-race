import './common_container_cars.scss';
import CarsBlock from '../cars_block/cars_block';

class CommonContainerCars {
    public carsContainer: HTMLDivElement;

    public carsAmountTitle: HTMLHeadingElement;

    public carsPageTitle: HTMLHeadingElement;

    public carsBlock: HTMLDivElement;

    public panginationButtonsBlockCars: HTMLDivElement;

    public prevButtonCars: HTMLButtonElement;

    public nextButtonCars: HTMLButtonElement;

    constructor() {
        this.carsContainer = document.createElement('div');
        this.carsAmountTitle = document.createElement('h1');
        this.carsPageTitle = document.createElement('h2');
        this.carsBlock = document.createElement('div');
        this.panginationButtonsBlockCars = document.createElement('div');
        this.prevButtonCars = document.createElement('button');
        this.nextButtonCars = document.createElement('button');
    }

    public makeCommonContainerForCars(): void {
        this.carsContainer.classList.add('cars_container');
        this.carsAmountTitle.classList.add('cars_amount_in_garage');
        this.carsAmountTitle.innerHTML = `Garage()`;
        this.carsContainer.append(this.carsAmountTitle);
        this.carsPageTitle.classList.add('page_number');
        this.carsPageTitle.innerHTML = `Page #${CarsBlock.pageNumber}`;
        this.carsContainer.append(this.carsPageTitle);
        this.carsBlock.classList.add('cars_block');
        this.carsContainer.append(this.carsBlock);
        this.panginationButtonsBlockCars.classList.add('pangination_buttons_cars');
        this.carsContainer.append(this.panginationButtonsBlockCars);
        this.prevButtonCars.classList.add('prev_button_cars');
        this.prevButtonCars.innerHTML = 'Previous';
        if (CarsBlock.pageNumber === 1) {
            this.prevButtonCars.disabled = true;
        }
        this.nextButtonCars.classList.add('next_button_cars');
        this.nextButtonCars.innerHTML = 'Next';
        this.panginationButtonsBlockCars.append(this.prevButtonCars);
        this.panginationButtonsBlockCars.append(this.nextButtonCars);
    }
}

export default CommonContainerCars;

import CreateAndChangeCarField from '../../user-interface/create-and-change-car/create_and_change_car';
import CarsBlock from '../../user-interface/cars_block/cars_block';
import { TCreateOneCar } from '../../types';
import CarsBlockGame from '../cars-block-game/cars_block_game';
import carImageSvg from '../../user-interface/car_image/car_image';

class CreateAndChangeCarGame extends CreateAndChangeCarField {
    carsBlock: CarsBlock;

    carsBlockGame: CarsBlockGame;

    constructor() {
        super();
        this.carsBlock = new CarsBlock();
        this.carsBlockGame = new CarsBlockGame();
    }

    public addListenerToCreateButton(): void {
        const createButton = <HTMLDivElement>document.querySelector('.create_button');
        createButton.addEventListener('click', () => {
            this.addNewCar();
            setTimeout(() => {
                this.carsBlockGame.addListenerToRemoveButton();
                this.carsBlockGame.addListenerToSelectButton();
                this.carsBlockGame.addListenerToStartButton();
                this.carsBlockGame.addListenerToStopButton();
            }, 1000);
        });
    }

    public addNewCar(): void {
        const createInputName = <HTMLInputElement>document.querySelector('.create_input_name');
        const createInputColor = <HTMLInputElement>document.querySelector('.create_input_color');
        if (createInputName.value.length === 0) {
            return;
        }
        const nameOfNewCar = createInputName.value.trim();
        const colorOfNewCar = createInputColor.value;
        const newCarObject: TCreateOneCar = {
            name: nameOfNewCar,
            color: colorOfNewCar,
        };
        this.sendNewCarToServer(newCarObject);

        createInputName.value = '';
        createInputColor.value = '#000000';
    }

    public async sendNewCarToServer(newCarObject: TCreateOneCar) {
        const urlGarage: URL = new URL('http://127.0.0.1:3000/garage');
        const newCarToSend: string = JSON.stringify(newCarObject);
        await fetch(urlGarage, {
            method: 'POST',
            body: newCarToSend,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of sending data');
            }
        });
        this.carsBlock.receiveCarsFromServer();
    }

    public addListenerToUpdateButton(): void {
        const updateButton = <HTMLDivElement>document.querySelector('.update_button');
        updateButton.addEventListener('click', () => {
            this.updateCar();
        });
    }

    public updateCar(): void {
        const updateInputName = <HTMLInputElement>document.querySelector('.update_input_name');
        const updateInputColor = <HTMLInputElement>document.querySelector('.update_input_color');
        if (updateInputName.value.length === 0) {
            return;
        }
        const nameOfNewCar = updateInputName.value.trim();
        const colorOfNewCar = updateInputColor.value;
        const updateCarObject: TCreateOneCar = {
            name: nameOfNewCar,
            color: colorOfNewCar,
        };
        this.updateCarDataInCarsBlock(nameOfNewCar, colorOfNewCar);
        this.sendUpdateCarToServer(updateCarObject);
        updateInputName.value = '';
        updateInputName.disabled = true;
        updateInputColor.value = '#000000';
    }

    public updateCarDataInCarsBlock(nameOfNewCar: string, colorOfNewCar: string): void {
        const carsBlock = <HTMLDivElement>document.querySelector('.cars_block');
        for (let i = 0; i < carsBlock.children.length; i += 1) {
            if (Number(carsBlock.children[i].getAttribute('id')) === CarsBlockGame.ID) {
                carsBlock.children[i].children[0].children[2].innerHTML = nameOfNewCar;
                const ImageHTML = carImageSvg(colorOfNewCar);
                carsBlock.children[i].children[1].children[1].children[0].innerHTML = ImageHTML;
            }
        }
    }

    public async sendUpdateCarToServer(updateCarObject: TCreateOneCar) {
        const urlGarage: URL = new URL(`http://127.0.0.1:3000/garage/${CarsBlockGame.ID}`);
        const updateCarToSend: string = JSON.stringify(updateCarObject);
        await fetch(urlGarage, {
            method: 'PUT',
            body: updateCarToSend,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of sending data');
            }
        });
    }

    public addListenerToCreateInputName(): void {
        const createCreateInputName = <HTMLButtonElement>document.querySelector('.create_input_name');
        createCreateInputName.addEventListener('input', () => {
            const createButton = <HTMLButtonElement>document.querySelector('.create_button');
            if (createCreateInputName.value !== '' && createCreateInputName.value !== undefined) {
                createButton.disabled = false;
            } else {
                createButton.disabled = true;
            }
        });
    }
}

export default CreateAndChangeCarGame;

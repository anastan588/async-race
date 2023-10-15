import { TCars, TDrive } from '../../types';
import CreateAndChangeCarField from '../../user-interface/create-and-change-car/create_and_change_car';
import CarsBlock from '../../user-interface/cars_block/cars_block';
import WinnersTableGame from '../winners-table-game/winners_table_game';

class CarsBlockGame {
    public updateCarObject: TCars[];

    public createAndChangeCarsField: CreateAndChangeCarField;

    public carsBlock: CarsBlock;

    static ID: number;

    static Status: string;

    public controller: AbortController;

    public signal: AbortSignal;

    public winnersTableGame: WinnersTableGame;

    static singleRace: string;

    constructor(ID: number = 0) {
        this.updateCarObject = [];
        CarsBlockGame.ID = ID;
        CarsBlockGame.Status = 'started';
        this.createAndChangeCarsField = new CreateAndChangeCarField();
        this.carsBlock = new CarsBlock();
        this.controller = new AbortController();
        this.signal = this.controller.signal;
        this.winnersTableGame = new WinnersTableGame();
        CarsBlockGame.singleRace = 'single';
    }

    public addListenerToSelectButton(): void {
        const selectButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.select_button');
        selectButton.forEach((element) => {
            element.addEventListener('click', (event: Event) => {
                const elementButton = <HTMLButtonElement>event.target;
                const updateButton = <HTMLButtonElement>document.querySelector('.update_button');
                updateButton.disabled = false;
                const selectCarID = Number(elementButton.getAttribute('id'));
                CarsBlockGame.ID = selectCarID;
                this.receiveSelectCarDatafromServer(selectCarID);
            });
        });
    }

    public async receiveSelectCarDatafromServer(selectCarID: number) {
        const urlGarage: URL = new URL('http://127.0.0.1:3000/garage');
        urlGarage.searchParams.set('id', `${selectCarID}`);
        const responseGarageUpdateCar: TCars[] = await fetch(urlGarage, {
            method: 'GET',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of receiving data');
            }
            return response.json();
        });
        this.updateCarObject = responseGarageUpdateCar;
        this.addSelectCarToUpdateForm();
    }

    public addSelectCarToUpdateForm(): void {
        const updateInputName = <HTMLInputElement>document.querySelector('.update_input_name');
        const updateInputColor = <HTMLInputElement>document.querySelector('.update_input_color');
        updateInputName.disabled = false;
        updateInputName.value = this.updateCarObject[0].name;
        updateInputColor.value = this.updateCarObject[0].color;
    }

    public addListenerToRemoveButton(): void {
        const removeButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.remove_button');
        removeButton.forEach((element) => {
            element.addEventListener('click', (event: Event) => {
                const elementButton = <HTMLButtonElement>event.target;
                CarsBlockGame.ID = Number(elementButton.getAttribute('id'));
                this.removeSelectCarDatafromServer();
            });
        });
    }

    public async removeSelectCarDatafromServer() {
        const urlGarage: URL = new URL(`http://127.0.0.1:3000/garage/${CarsBlockGame.ID}`);
        await fetch(urlGarage, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of receiving data');
            }
        });
        this.removeCarFromCarsBLock();
        this.carsBlock.receiveCarsFromServer();
        setTimeout(() => {
            this.addListenerToRemoveButton();
            this.addListenerToSelectButton();
            this.addListenerToStartButton();
            this.addListenerToStopButton();
        }, 500);
        const raceButton = <HTMLButtonElement>document.querySelector('.race_button');
        const resetButton = <HTMLButtonElement>document.querySelector('.reset_button');
        raceButton.disabled = false;
        resetButton.disabled = true;
        for (let i = 0; i < WinnersTableGame.globalWinners.length; i += 1) {
            if (WinnersTableGame.globalWinners[i].id === CarsBlockGame.ID) {
                this.winnersTableGame.removeWinner(CarsBlockGame.ID);
            }
        }
    }

    public removeCarFromCarsBLock(): void {
        const carsAmountTitle = <HTMLDivElement>document.querySelector('.cars_amount_in_garage');
        carsAmountTitle.innerHTML = `Garage (${CarsBlock.numberOfCars - 1})`;
    }

    public addListenerToStartButton(): void {
        const startButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.start_button');
        startButton.forEach((element) => {
            element.addEventListener('click', (event: Event) => {
                const elementButton = <HTMLButtonElement>event.target;
                elementButton.disabled = true;
                const elementSubliтgStop = <HTMLButtonElement>elementButton.nextElementSibling;
                elementSubliтgStop.disabled = false;
                CarsBlockGame.ID = Number(elementButton.getAttribute('id'));
                CarsBlockGame.Status = 'started';
                const carToDriveId = CarsBlockGame.ID;
                const carToDriveStatus = CarsBlockGame.Status;
                CarsBlockGame.singleRace = 'single';
                this.receivePermissionToStartCar(carToDriveId, carToDriveStatus);
            });
        });
    }

    public addListenerToStopButton(): void {
        const stopButton = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.stop_button');
        stopButton.forEach((element) => {
            element.addEventListener('click', (event: Event) => {
                const elementButton = <HTMLButtonElement>event.target;
                elementButton.disabled = true;
                const elementSubliтgStart = <HTMLButtonElement>elementButton.previousElementSibling;
                elementSubliтgStart.disabled = false;
                CarsBlockGame.ID = Number(elementButton.getAttribute('id'));
                CarsBlockGame.Status = 'stopped';
                const carToDriveId = CarsBlockGame.ID;
                const carToDriveStatus = CarsBlockGame.Status;
                this.receivePermissionToStopCar(carToDriveId, carToDriveStatus);
            });
        });
    }

    public async receivePermissionToStartCar(carToDriveId: number, carToDriveStatus: string) {
        const urlEngine: URL = new URL(`http://127.0.0.1:3000/engine`);
        urlEngine.searchParams.set('id', `${carToDriveId}`);
        urlEngine.searchParams.set('status', `${carToDriveStatus}`);
        const responseGarageCars: TDrive = await fetch(urlEngine, {
            method: 'PATCH',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of sending data');
            }
            return response.json();
        });
        const driveAnswer = responseGarageCars;
        const timeOfMovingCar = Number(driveAnswer.distance) / Number(driveAnswer.velocity);
        if (CarsBlockGame.singleRace === 'single') {
            this.moveCar(timeOfMovingCar, carToDriveId);
        }

        return driveAnswer;
    }

    public async receivePermissionToDriveCar(elementWithAnimation: Animation, carToDriveId: number) {
        const urlEngine: URL = new URL(`http://127.0.0.1:3000/engine`);
        urlEngine.searchParams.set('id', `${carToDriveId}`);
        urlEngine.searchParams.set('status', `drive`);
        await fetch(urlEngine, {
            method: 'PATCH',
        })
            .then((response) => {
                if (!response.ok) {
                    elementWithAnimation.pause();
                    if (response.status === 500) {
                        throw new Error('Car is broken');
                    }
                }
                return response.json();
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log('AbortError: Fetch request aborted');
                }
                if (error.name === 'Error') {
                    console.log('Car is broken');
                }
            });
    }

    public moveCar(timeOfMovingCar: number, carToDriveId: number): void {
        const carContainerImage = <NodeListOf<HTMLImageElement>>document.querySelectorAll('.car_image_container');
        const carImage = <NodeListOf<HTMLImageElement>>document.querySelectorAll('.car_image');
        for (let i = 0; i < carImage.length; i += 1) {
            if (Number(carImage[i].getAttribute('id')) === CarsBlockGame.ID) {
                const wholeLengthOfTrack = carContainerImage[i].clientWidth;
                const lengthEndOfTrack = wholeLengthOfTrack * 0.14;
                const lengthOfTrackForCar = wholeLengthOfTrack - lengthEndOfTrack;
                const elementWithAnimation = carImage[i].animate(
                    [{ transform: 'translateX(0)' }, { transform: `translateX(${lengthOfTrackForCar}px)` }],
                    {
                        duration: timeOfMovingCar,
                    }
                );
                elementWithAnimation.id = carImage[i].getAttribute('id') as string;
                carImage[i].style.transform = `translateX(${lengthOfTrackForCar}px)`;
                this.receivePermissionToDriveCar(elementWithAnimation, carToDriveId);
            }
        }
    }

    public async receivePermissionToStopCar(carToDriveId: number, carToDriveStatus: string) {
        const urlEngine: URL = new URL(`http://127.0.0.1:3000/engine`);
        urlEngine.searchParams.set('id', `${carToDriveId}`);
        urlEngine.searchParams.set('status', `${carToDriveStatus}`);
        await fetch(urlEngine, {
            method: 'PATCH',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error of sending data');
            }
            return response.json();
        });
        const carImage = <NodeListOf<HTMLImageElement>>document.querySelectorAll('.car_image');
        for (let i = 0; i < carImage.length; i += 1) {
            if (Number(carImage[i].getAttribute('id')) === carToDriveId) {
                const animationOfElementArray = carImage[i].getAnimations();
                animationOfElementArray.map((animation) => animation.cancel());
                carImage[i].style.transform = `translateX(0px)`;
            }
        }
    }
}

export default CarsBlockGame;

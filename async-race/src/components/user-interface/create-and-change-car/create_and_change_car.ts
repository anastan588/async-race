import './create_and_change_car.scss';

class CreateAndChangeCarField {
    public createAndChangeCarContainer: HTMLDivElement;

    public createBlock: HTMLDivElement;

    public updateBlock: HTMLDivElement;

    public inputCreateName: HTMLInputElement;

    public inputUpdateName: HTMLInputElement;

    public inputCreateColor: HTMLInputElement;

    public inputUpdateColor: HTMLInputElement;

    public createButton: HTMLButtonElement;

    public updateButton: HTMLButtonElement;

    constructor() {
        this.createAndChangeCarContainer = document.createElement('div');
        this.createBlock = document.createElement('div');
        this.updateBlock = document.createElement('div');
        this.inputCreateName = document.createElement('input');
        this.inputUpdateName = document.createElement('input');
        this.inputCreateColor = document.createElement('input');
        this.inputUpdateColor = document.createElement('input');
        this.createButton = document.createElement('button');
        this.updateButton = document.createElement('button');
    }

    public makeCreateAndChangeCarField(): void {
        this.createAndChangeCarContainer.classList.add('create_change_container');
        this.createBlock.classList.add('create_block');
        this.makeCreateBlock();
        this.createAndChangeCarContainer.append(this.createBlock);
        this.updateBlock.classList.add('update_block');
        this.makeUpdateBlock();
        this.createAndChangeCarContainer.append(this.updateBlock);
    }

    public makeCreateBlock(): void {
        this.inputCreateName.classList.add('create_input_name');
        this.inputCreateName.type = 'text';
        this.inputCreateName.placeholder = 'Enter name of new snail';
        this.inputCreateColor.classList.add('create_input_color');
        this.inputCreateColor.type = 'color';
        this.createButton.classList.add('create_button');
        this.createButton.innerHTML = 'Create snail';
        if (this.inputCreateName.value === '' || this.inputCreateName.value === undefined) {
            this.createButton.disabled = true;
        }
        this.createBlock.append(this.inputCreateName);
        this.createBlock.append(this.inputCreateColor);
        this.createBlock.append(this.createButton);
    }

    public makeUpdateBlock(): void {
        this.inputUpdateName.classList.add('update_input_name');
        this.inputUpdateName.type = 'text';
        this.inputUpdateName.placeholder = 'Enter new name of snail';
        this.inputUpdateName.disabled = true;
        this.inputUpdateColor.classList.add('update_input_color');
        this.inputUpdateColor.type = 'color';
        this.updateButton.classList.add('update_button');
        this.updateButton.innerHTML = 'Update snail';
        if (this.inputUpdateName.value === '' || this.inputUpdateName.value === undefined) {
            this.updateButton.disabled = true;
        }
        this.updateBlock.append(this.inputUpdateName);
        this.updateBlock.append(this.inputUpdateColor);
        this.updateBlock.append(this.updateButton);
    }
}

export default CreateAndChangeCarField;

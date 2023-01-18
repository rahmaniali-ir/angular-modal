# Angular Modal

Easily open your own customized modals!  
angular-modal let's you easily open your own components as modals, you can pass inputs and options and get results and customize the look and feel pretty easily!

## Installation
To install from ```npm``` simply run:
```
npm i @rahmaniali.ir/angular-modal
```

## How to use
To open a component, first inject the modal service in you service or component:
```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private modalService: ModalService) {}
}
```

Then, import your component and use the open method on the service and pass the component:
```
import { ExampleModalComponent } from './example-modal/example-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.open(ExampleModalComponent)
  }
}
```

That's it! That's the simplest way you can use angular-modal. If you need to pass options to your component, or get results from it, follow along.

## Options
When you are opening a component, you may need to pass some extra information about the modal.  
These options are: ```input```, ```persistent``` and ```customClass```

### input
Consider you have a component that accepts input. You can pass these inputs when you are opening a modal by passing the options object:
```
this.modalService.open(ExampleModalComponent, {
  input: {
    name: 'Jon',
    age: 23
  }
})
```
Here, we are passing ```name``` and ```age``` as inputs to the ```ExampleModalComponent```.

### persistent
By default, clicking outside the modal, will dismiss it. To prevent this behaviour you can pass ```persistent:true``` as an option when opening a modal:
```
this.modalService.open(ExampleModalComponent, {
  persistent: true
})
```

### customClass
You can assign a class to the modal wrapper in case you want to style it:
```
this.modalService.open(ExampleModalComponent, {
  customClass: 'red-alert'
})
```
This will apply the ```red-alert``` class to the ```modal-wrapper``` which is the wrapper for your component and basically is responsible for the background.  
Now, you can define your custom style like this:
```
modal-wrapper.red-alert {
  background: red;
}
```
> Yeah, I know, pretty hard to look at... but it's just an example; Take it easy!

## Output results
Now let's say you have your modal, and you want to pass some data to the component/service that opened it. You need to import and inject the ```ActiveModal``` service in your component. Take a look:
```
import { ActiveModal } from '@rahmaniali.ir/angular-modal'

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.component.html',
  styleUrls: ['./example-modal.component.sass']
})
export class ExampleModalComponent {
  constructor(activeModal: ActiveModal) {}
}
```

Now you have a reference to the modal inside itself. Cool.  
By having the reference you can ```close``` or ```dismiss``` the modal, or update its options.  
For example, let's say I need my modal to send 'some string' back to the component that opened it:
```
@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.component.html',
  styleUrls: ['./example-modal.component.sass']
})
export class ExampleModalComponent {
  constructor(private activeModal: ActiveModal) {}

  close() {
    this.activeModal.close('some string')
  }
}
```
Now, how to get this 'some string' value in the parent component? For this you'll have to subscribe to the result of the ```open``` method like this:
```
openModal() {
  const modalRef = this.modalService.open(ExampleModalComponent, {
    customClass: 'red-alert',
  });

  modalRef.result.subscribe({
    next: (data) => {
      // data = 'some string'
    },
    error: (data) => {}
  })
}
```

The ```open``` method returns a ```ModalRef``` object. By using it, you can ```close``` or ```dismiss```, subscribe to the result or update the options from the parent as well.  
> No need to say that if you dismiss the modal, tha parent subscriber will run the ```error``` function.

## Support me
This is the earliest version that I'm sharing, more features and fixes are yet to come to make it even easier and more enjoyable to use. Please consider giving [star the repo on Github](https://github.com/rahmaniali-ir/angular-modal) if you liked ```angular-modal``` or if you didn't I'd love to know why? So please [open an issue](https://github.com/rahmaniali-ir/angular-modal/issues/new) to let me know!

Thanks,  
A.

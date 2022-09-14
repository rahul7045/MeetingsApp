
class addMeetingValidation{
    nameEl = document.querySelector('#meeting-name') as HTMLInputElement;
    dateEl = document.querySelector('#date') as HTMLInputElement;
    start_timeEl = document.querySelector('#start-time') as HTMLInputElement;
    end_timeEl = document.querySelector('#end-time') as HTMLInputElement;
    descriptionEl = document.querySelector('#description') as HTMLInputElement;
    attendeesEl = document.querySelector('#attendees') as HTMLInputElement;
    form = document.querySelector('#add-meeting-form');

     ValidateMeetingName =() =>{
        let name = this.nameEl.value.trim();
        const formGroupEl = this.nameEl.closest(".form-group") as HTMLElement;
        const messageEl = formGroupEl.querySelector(".message") as HTMLInputElement;
        let error = "";
        if (name.length <1) {
          error += "Enter the Meeting Name";
        }
        messageEl.textContent = error;
        return error === "";
    }

    ValidateTime =() => {
        let start_time = this.start_timeEl.value;
        let end_time = this.end_timeEl.value;
        const formGroupEl = this.end_timeEl.closest(".form-group") as HTMLElement;
        const messageEl = formGroupEl.querySelector(".message") as HTMLInputElement;
        let error = "";

        let start = start_time[0]+start_time[1];
        let end =  end_time[0] + end_time[1];

        if(end<start){
            error += "end time should not be less than start time"
        }
        messageEl.textContent = error;
        return error === "";

    }

    
    ValidateDescription =() =>{
        let desc = this.descriptionEl.value.trim();
        const formGroupEl = this.descriptionEl.closest(".form-group") as HTMLElement;
        const messageEl = formGroupEl.querySelector(".message") as HTMLInputElement;
        let error = "";
        if (desc.length <1) {
          error += "Enter the Description";
        }
        messageEl.textContent = error;
        return error === "";
    }



    addEventListeners =() =>{
    this.nameEl.addEventListener("blur", this.ValidateMeetingName);
    this.nameEl.addEventListener("input", this.ValidateMeetingName);

    this.end_timeEl.addEventListener("blur", this.ValidateTime);
    this.end_timeEl.addEventListener("input", this.ValidateTime);

    
    this.descriptionEl.addEventListener("blur", this.ValidateDescription);
    this.descriptionEl.addEventListener("input", this.ValidateDescription);


 
    }

    load =() => {
        this.form = document.querySelector("#add-meeting-form") as HTMLFormElement;
        this.addEventListeners();
    }

}
export default addMeetingValidation;